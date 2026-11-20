/* Dulce Gloria — Cake3D viewer (procedural, differentiated by variety)
   Three.js r128 · robust load · hybrid photo+3D · mobile gestures */
window.Cake3D = (function () {
  "use strict";

  var FROST = {
    chocolate: 0x3d2414, blanco: 0xf8f4ec, crema: 0xf5e6d3, frutos: 0xa03d4a,
    pistacho: 0x8fb86a, lotus: 0xd4a574, redvelvet: 0xf5f0eb, oreo: 0x2a2a2a,
    ferrero: 0x6b4423, selva: 0xf5f0eb, natafresa: 0xfff5f7, matilda: 0x2d1810
  };

  var TYPE_PROFILE = {
    matilda: { sponge: 0x4a2c1a, sponge2: 0x3d2414, frost: "matilda", crumbs: 0x2d1810, drip: true, dripColor: 0x2d1810 },
    redvelvet: { sponge: 0x8b2e2e, sponge2: 0xa33a3a, frost: "redvelvet", crumbs: 0xf5f0eb, whiteFrost: true },
    lotus: { sponge: 0xe8d5c4, sponge2: 0xd4b896, frost: "lotus", crumbs: 0xc4a484, drip: true, dripColor: 0xc4a070 },
    oreo: { sponge: 0x3d3d3d, sponge2: 0x2a2a2a, frost: "oreo", crumbs: 0x1a1a1a },
    "pistacho-frambuesa": { sponge: 0xc5d4a0, sponge2: 0xa8c97f, frost: "pistacho", crumbs: 0xe63946 },
    ferrero: { sponge: 0xc4a484, sponge2: 0xa67c52, frost: "ferrero", crumbs: 0x5c3a21, drip: true, dripColor: 0x5c3a21 },
    selva: { sponge: 0x4a2c1a, sponge2: 0x3d2414, frost: "selva", crumbs: 0xc41e3a, whiteFrost: true },
    "nata-fresa": { sponge: 0xf0e0d0, sponge2: 0xe8d5c4, frost: "natafresa", crumbs: 0xe63946 },
    "choco-bosque": { sponge: 0x5c3a21, sponge2: 0x3d2414, frost: "chocolate", crumbs: 0x6b2d5c, drip: true, dripColor: 0x3d2414 },
    cheesecake: { sponge: 0xf5e6d3, sponge2: 0xe8d5c4, frost: "crema", crumbs: 0xd4a574, isCheesecake: true }
  };

  var configViewer = null;
  var productViewer = null;
  var isDragging = false;
  var prevX = 0, prevY = 0;
  var rotY = 0.45, rotX = 0.28, distance = 4.2;
  var animId = null;
  var loadTimeout = null;

  function mat(color, opts) {
    opts = opts || {};
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: opts.rough != null ? opts.rough : 0.55,
      metalness: opts.metal != null ? opts.metal : 0.04
    });
  }

  function disposeObject(obj) {
    if (!obj) return;
    obj.traverse(function (child) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(function (m) {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        } else {
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      }
    });
  }

  function buildCake(opts) {
    opts = opts || {};
    var group = new THREE.Group();
    var scale = opts.size === "s" ? 0.72 : opts.size === "l" ? 1.22 : 1;
    var tipo = opts.tipo || "matilda";
    var profile = TYPE_PROFILE[tipo] || TYPE_PROFILE.matilda;
    var frostKey = opts.frost || profile.frost;
    var frostColor = FROST[frostKey] || FROST.chocolate;
    var isLight = ["blanco", "crema", "natafresa", "redvelvet", "selva", "lotus", "pistacho"].indexOf(frostKey) >= 0;

    var plate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65 * scale, 1.72 * scale, 0.07, 64),
      mat(0xfaf6f1, { rough: 0.35 })
    );
    plate.receiveShadow = true;
    group.add(plate);

    var layers = [
      { y: 0.22 * scale, r: 1.18 * scale, h: 0.38 * scale, col: profile.sponge },
      { y: 0.55 * scale, r: 1.08 * scale, h: 0.34 * scale, col: profile.sponge2 || profile.sponge },
      { y: 0.84 * scale, r: 0.98 * scale, h: 0.3 * scale, col: profile.sponge }
    ];
    if (profile.isCheesecake) {
      layers = [
        { y: 0.18 * scale, r: 1.2 * scale, h: 0.12 * scale, col: 0xc4a484 },
        { y: 0.45 * scale, r: 1.15 * scale, h: 0.55 * scale, col: 0xf5e6d3 }
      ];
    }
    layers.forEach(function (L, i) {
      var mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(L.r * 0.98, L.r, L.h, 64),
        mat(L.col, { rough: 0.85 })
      );
      mesh.position.y = L.y;
      mesh.castShadow = true;
      group.add(mesh);
      if (i < layers.length - 1 && !profile.isCheesecake) {
        var fill = new THREE.Mesh(
          new THREE.CylinderGeometry(L.r * 0.96, L.r * 0.96, 0.05 * scale, 48),
          mat(profile.whiteFrost ? 0xfff8f5 : 0xf5ede4, { rough: 0.45 })
        );
        fill.position.y = L.y + L.h / 2;
        group.add(fill);
      }
    });

    var frostMat = mat(frostColor, { rough: isLight ? 0.42 : 0.38 });
    var topY = profile.isCheesecake ? 0.75 * scale : 1.05 * scale;
    var topR = profile.isCheesecake ? 1.12 * scale : 0.98 * scale;
    var frostTop = new THREE.Mesh(
      new THREE.SphereGeometry(topR, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      frostMat
    );
    frostTop.position.y = topY;
    frostTop.scale.y = 0.35;
    frostTop.castShadow = true;
    group.add(frostTop);

    var sideH = profile.isCheesecake ? 0.5 * scale : 0.9 * scale;
    var side = new THREE.Mesh(
      new THREE.CylinderGeometry(topR * 1.01, topR * 1.02, sideH, 64, 1, true),
      frostMat
    );
    side.position.y = profile.isCheesecake ? 0.48 * scale : 0.55 * scale;
    group.add(side);

    if (profile.drip) {
      var dripCol = profile.dripColor || frostColor;
      var dripMat = mat(dripCol, { rough: 0.3, metal: 0.08 });
      for (var d = 0; d < 10; d++) {
        var ang = (d / 10) * Math.PI * 2 + 0.2;
        var len = 0.18 + Math.random() * 0.22;
        var drip = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035 * scale, 0.02 * scale, len * scale, 8),
          dripMat
        );
        drip.position.set(
          Math.cos(ang) * topR * 0.95,
          topY - len * scale * 0.4,
          Math.sin(ang) * topR * 0.95
        );
        drip.castShadow = true;
        group.add(drip);
      }
    }

    var crumbCol = profile.crumbs || 0x8b5a2b;
    var crumbMat = mat(crumbCol, { rough: 0.7 });
    for (var c = 0; c < 18; c++) {
      var ca = Math.random() * Math.PI * 2;
      var cr = Math.random() * topR * 0.75;
      var crumb = new THREE.Mesh(
        new THREE.SphereGeometry((0.03 + Math.random() * 0.04) * scale, 6, 6),
        crumbMat
      );
      crumb.position.set(Math.cos(ca) * cr, topY + 0.06 * scale, Math.sin(ca) * cr);
      group.add(crumb);
    }

    if (opts.candles) {
      var candleMat = mat(0xfff8e7, { rough: 0.4 });
      var flameMat = mat(0xffaa33, { rough: 0.2, metal: 0.1 });
      for (var v = 0; v < 5; v++) {
        var va = (v / 5) * Math.PI * 2;
        var vr = topR * 0.45;
        var stick = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025 * scale, 0.025 * scale, 0.28 * scale, 8),
          candleMat
        );
        stick.position.set(Math.cos(va) * vr, topY + 0.18 * scale, Math.sin(va) * vr);
        group.add(stick);
        var flame = new THREE.Mesh(new THREE.SphereGeometry(0.04 * scale, 8, 8), flameMat);
        flame.position.set(Math.cos(va) * vr, topY + 0.34 * scale, Math.sin(va) * vr);
        group.add(flame);
      }
    }

    if (opts.msg && opts.msg.length > 0) {
      var canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff8f0";
      ctx.fillRect(0, 0, 256, 64);
      ctx.fillStyle = "#3a2a20";
      ctx.font = "bold 22px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var txt = opts.msg.slice(0, 22);
      ctx.fillText(txt, 128, 32);
      var tex = new THREE.CanvasTexture(canvas);
      var plaque = new THREE.Mesh(
        new THREE.PlaneGeometry(0.9 * scale, 0.22 * scale),
        new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 })
      );
      plaque.position.set(0, topY + 0.02 * scale, topR * 0.92);
      plaque.rotation.x = -0.15;
      group.add(plaque);
    }

    group.scale.setScalar(1);
    return group;
  }

  function createViewer(containerId, opts) {
    opts = opts || {};
    var container = document.getElementById(containerId);
    if (!container) return null;
    if (typeof THREE === "undefined") return null;

    if (opts.isConfig && configViewer) {
      disposeViewer(configViewer);
      configViewer = null;
    }
    if (!opts.isConfig && productViewer) {
      disposeViewer(productViewer);
      productViewer = null;
    }

    var w = Math.max(container.clientWidth, 280);
    var h = Math.max(container.clientHeight, 260);

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbf6f0);

    var camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 1.6, distance);
    camera.lookAt(0, 0.7, 0);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    var amb = new THREE.AmbientLight(0xfff5eb, 0.55);
    scene.add(amb);
    var key = new THREE.DirectionalLight(0xfff8f0, 0.85);
    key.position.set(3, 6, 4);
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    scene.add(key);
    var fill = new THREE.DirectionalLight(0xe8d5c4, 0.35);
    fill.position.set(-3, 2, -2);
    scene.add(fill);
    var rim = new THREE.DirectionalLight(0xffffff, 0.2);
    rim.position.set(0, 3, -4);
    scene.add(rim);

    var cake = buildCake(opts);
    scene.add(cake);

    var state = {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cake: cake,
      container: container,
      opts: opts,
      rotY: rotY,
      rotX: rotX,
      distance: distance
    };

    var canvas = renderer.domElement;
    canvas.style.touchAction = "none";
    canvas.style.cursor = "grab";

    function onDown(e) {
      isDragging = true;
      var p = e.touches ? e.touches[0] : e;
      prevX = p.clientX;
      prevY = p.clientY;
      canvas.style.cursor = "grabbing";
    }
    function onMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      var p = e.touches ? e.touches[0] : e;
      var dx = p.clientX - prevX;
      var dy = p.clientY - prevY;
      state.rotY += dx * 0.008;
      state.rotX = Math.max(-0.4, Math.min(0.9, state.rotX + dy * 0.006));
      prevX = p.clientX;
      prevY = p.clientY;
    }
    function onUp() {
      isDragging = false;
      canvas.style.cursor = "grab";
    }
    function onWheel(e) {
      e.preventDefault();
      state.distance = Math.max(2.8, Math.min(6.5, state.distance + e.deltaY * 0.004));
    }

    var lastPinch = 0;
    function onTouchMove(e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        var d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (lastPinch) {
          state.distance = Math.max(2.8, Math.min(6.5, state.distance + (lastPinch - d) * 0.015));
        }
        lastPinch = d;
      } else {
        onMove(e);
      }
    }
    function onTouchEnd() {
      lastPinch = 0;
      onUp();
    }

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onDown, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    state._cleanup = function () {
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };

    function animate() {
      animId = requestAnimationFrame(animate);
      if (!state.renderer) return;
      state.cake.rotation.y = state.rotY;
      state.cake.rotation.x = state.rotX * 0.3;
      var cam = state.camera;
      cam.position.x = Math.sin(state.rotY * 0.3) * state.distance * 0.15;
      cam.position.z = state.distance;
      cam.position.y = 1.4 + state.rotX * 0.4;
      cam.lookAt(0, 0.65, 0);
      state.renderer.render(state.scene, state.camera);
    }
    animate();

    function onResize() {
      if (!state.container || !state.renderer) return;
      var nw = Math.max(state.container.clientWidth, 200);
      var nh = Math.max(state.container.clientHeight, 200);
      state.camera.aspect = nw / nh;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(nw, nh);
    }
    window.addEventListener("resize", onResize);
    state._onResize = onResize;

    return state;
  }

  function disposeViewer(v) {
    if (!v) return;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    if (v._cleanup) v._cleanup();
    if (v._onResize) window.removeEventListener("resize", v._onResize);
    disposeObject(v.cake);
    if (v.renderer) {
      v.renderer.dispose();
      if (v.renderer.domElement && v.renderer.domElement.parentNode) {
        v.renderer.domElement.parentNode.removeChild(v.renderer.domElement);
      }
    }
    v.renderer = null;
    v.scene = null;
    v.cake = null;
  }

  function setViewerState(id, state, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.className = "viewer-state " + (state || "");
    el.textContent = msg || "";
    el.style.display = state === "ready" ? "none" : "flex";
  }

  function hasWebGL() {
    try {
      var c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch (e) {
      return false;
    }
  }

  function ensureThree(cb) {
    if (typeof THREE !== "undefined") {
      cb(true);
      return;
    }
    if (window.__threeReady) {
      setTimeout(function () {
        cb(typeof THREE !== "undefined");
      }, 50);
      return;
    }
    var tried = 0;
    function tryLoad() {
      tried++;
      var s = document.createElement("script");
      s.src =
        tried === 1
          ? "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          : "https://unpkg.com/three@0.128.0/build/three.min.js";
      s.onload = function () {
        window.__threeReady = true;
        cb(true);
      };
      s.onerror = function () {
        if (tried < 2) tryLoad();
        else cb(false);
      };
      document.head.appendChild(s);
    }
    tryLoad();
    loadTimeout = setTimeout(function () {
      if (typeof THREE === "undefined") cb(false);
    }, 12000);
  }

  function initConfig3D(opts) {
    opts = opts || {};
    opts.isConfig = true;
    setViewerState("config-3d-loading", "loading", "Cargando modelo 3D…");
    if (!hasWebGL()) {
      setViewerState("config-3d-loading", "error", "Tu dispositivo no soporta WebGL. Usa la foto de referencia.");
      return;
    }
    ensureThree(function (ok) {
      if (loadTimeout) clearTimeout(loadTimeout);
      if (!ok || typeof THREE === "undefined") {
        setViewerState("config-3d-loading", "error", "No se pudo cargar Three.js. Continúa con la foto.");
        return;
      }
      try {
        if (configViewer) disposeViewer(configViewer);
        configViewer = createViewer("config-3d-canvas", opts);
        if (configViewer) {
          setViewerState("config-3d-loading", "ready", "");
        } else {
          setViewerState("config-3d-loading", "error", "Error al crear el visor. Usa la foto de referencia.");
        }
      } catch (err) {
        console.error(err);
        setViewerState("config-3d-loading", "error", "Error 3D. Puedes seguir el encargo con la foto.");
      }
    });
  }

  function updateConfig3D(opts) {
    if (!configViewer || !configViewer.scene) {
      initConfig3D(opts);
      return;
    }
    try {
      disposeObject(configViewer.cake);
      configViewer.scene.remove(configViewer.cake);
      var cake = buildCake(opts || {});
      configViewer.scene.add(cake);
      configViewer.cake = cake;
      configViewer.opts = opts;
    } catch (e) {
      console.error(e);
    }
  }

  function resetCamera() {
    if (configViewer) {
      configViewer.rotY = 0.45;
      configViewer.rotX = 0.28;
      configViewer.distance = 4.2;
    }
    if (productViewer) {
      productViewer.rotY = 0.45;
      productViewer.rotX = 0.28;
      productViewer.distance = 4.2;
    }
  }

  function openProduct3D(product) {
    var overlay = document.getElementById("modal-3d-overlay");
    if (!overlay) return;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    var title = document.getElementById("modal-3d-title");
    if (title) title.textContent = (product && product.name) || "Vista 3D orientativa";
    setViewerState("product-3d-loading", "loading", "Cargando…");
    var tipo = "matilda";
    if (product) {
      var n = (product.name || "").toLowerCase();
      if (n.indexOf("red velvet") >= 0) tipo = "redvelvet";
      else if (n.indexOf("lotus") >= 0) tipo = "lotus";
      else if (n.indexOf("oreo") >= 0) tipo = "oreo";
      else if (n.indexOf("pistacho") >= 0) tipo = "pistacho-frambuesa";
      else if (n.indexOf("ferrero") >= 0) tipo = "ferrero";
      else if (n.indexOf("selva") >= 0) tipo = "selva";
      else if (n.indexOf("nata") >= 0 || n.indexOf("fresa") >= 0) tipo = "nata-fresa";
      else if (n.indexOf("frutos") >= 0 || n.indexOf("bosque") >= 0) tipo = "choco-bosque";
      else if (n.indexOf("cheesecake") >= 0 || n.indexOf("queso") >= 0) tipo = "cheesecake";
      else if (n.indexOf("matilda") >= 0 || n.indexOf("chocolate") >= 0) tipo = "matilda";
    }
    ensureThree(function (ok) {
      if (!ok) {
        setViewerState("product-3d-loading", "error", "3D no disponible. Cierra y usa la foto.");
        return;
      }
      try {
        if (productViewer) disposeViewer(productViewer);
        productViewer = createViewer("product-3d-canvas", { tipo: tipo, size: "m", isConfig: false });
        setViewerState("product-3d-loading", "ready", "");
      } catch (e) {
        setViewerState("product-3d-loading", "error", "Error al cargar el modelo.");
      }
    });
  }

  function closeProduct3D() {
    var overlay = document.getElementById("modal-3d-overlay");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (productViewer) {
      disposeViewer(productViewer);
      productViewer = null;
    }
  }

  function destroyConfig() {
    if (configViewer) {
      disposeViewer(configViewer);
      configViewer = null;
    }
  }

  return {
    initConfig3D: initConfig3D,
    updateConfig3D: updateConfig3D,
    resetCamera: resetCamera,
    openProduct3D: openProduct3D,
    closeProduct3D: closeProduct3D,
    destroyConfig: destroyConfig,
    buildCake: buildCake
  };
})();
