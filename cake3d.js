/* Dulce Gloria — Cake3D
   Vista ORIENTATIVA (procedural). GLB fotorrealista: carpeta assets/models/cakes/ (pendiente de producción).
   Procedural, variedad diferenciada · Three.js r128 · dispose + cancelAnimationFrame */
window.Cake3D = (function () {
  "use strict";

  var MODEL_BASE = "assets/models/cakes/";
  var GLB_ENABLED = true;

  function glbPathForTipo(tipo) {
    return MODEL_BASE + encodeURIComponent(tipo) + ".glb";
  }

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
    "pistacho-frambuesa": { sponge: 0xc5d4a0, sponge2: 0xa8c97f, frost: "pistacho", crumbs: 0xe63946, fruit: "berry" },
    ferrero: { sponge: 0xc4a484, sponge2: 0xa67c52, frost: "ferrero", crumbs: 0x5c3a21, drip: true, dripColor: 0x5c3a21 },
    selva: { sponge: 0x4a2c1a, sponge2: 0x3d2414, frost: "selva", crumbs: 0xc41e3a, whiteFrost: true, fruit: "cherry" },
    "nata-fresa": { sponge: 0xf0e0d0, sponge2: 0xe8d5c4, frost: "natafresa", crumbs: 0xe63946, fruit: "strawberry" },
    "choco-bosque": { sponge: 0x5c3a21, sponge2: 0x3d2414, frost: "chocolate", crumbs: 0x6b2d5c, drip: true, dripColor: 0x3d2414, fruit: "berry" },
    cheesecake: { sponge: 0xf5e6d3, sponge2: 0xe8d5c4, frost: "crema", crumbs: 0xd4a574, isCheesecake: true }
  };

  var configViewer = null;
  var productViewer = null;
  var configAnimId = null;
  var productAnimId = null;

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

    var plate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65 * scale, 1.72 * scale, 0.08, 48),
      mat(0xfaf6f1, { rough: 0.3 })
    );
    plate.receiveShadow = true;
    group.add(plate);

    var layers;
    if (profile.isCheesecake) {
      layers = [
        { y: 0.14 * scale, r: 1.2 * scale, h: 0.1 * scale, col: 0xc4a484 },
        { y: 0.42 * scale, r: 1.15 * scale, h: 0.52 * scale, col: 0xf5e6d3 }
      ];
    } else {
      layers = [
        { y: 0.22 * scale, r: 1.18 * scale, h: 0.36 * scale, col: profile.sponge },
        { y: 0.54 * scale, r: 1.08 * scale, h: 0.32 * scale, col: profile.sponge2 || profile.sponge },
        { y: 0.82 * scale, r: 0.98 * scale, h: 0.28 * scale, col: profile.sponge }
      ];
    }

    layers.forEach(function (L) {
      var mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(L.r * 0.98, L.r, L.h, 48),
        mat(L.col, { rough: 0.88 })
      );
      mesh.position.y = L.y;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      var frost = new THREE.Mesh(
        new THREE.CylinderGeometry(L.r * 1.02, L.r * 1.02, L.h * 0.12, 48),
        mat(frostColor, { rough: 0.4 })
      );
      frost.position.y = L.y + L.h * 0.4;
      group.add(frost);
    });

    var topY = layers[layers.length - 1].y + layers[layers.length - 1].h * 0.5;
    if (profile.drip) {
      var dripMat = mat(profile.dripColor || frostColor, { rough: 0.35 });
      for (var i = 0; i < 10; i++) {
        var ang = (i / 10) * Math.PI * 2;
        var drip = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04 * scale, 0.02 * scale, 0.25 * scale, 8),
          dripMat
        );
        drip.position.set(Math.cos(ang) * 0.9 * scale, topY - 0.05 * scale, Math.sin(ang) * 0.9 * scale);
        group.add(drip);
      }
    }
    if (profile.fruit === "berry" || profile.fruit === "strawberry" || profile.fruit === "cherry") {
      for (var f = 0; f < 6; f++) {
        var berry = new THREE.Mesh(
          new THREE.SphereGeometry(0.06 * scale, 8, 8),
          mat(0xc41e3a, { rough: 0.5 })
        );
        var af = (f / 6) * Math.PI * 2;
        berry.position.set(Math.cos(af) * 0.35 * scale, topY + 0.08 * scale, Math.sin(af) * 0.35 * scale);
        group.add(berry);
      }
    }
    if (opts.candles) {
      for (var c = 0; c < 3; c++) {
        var candle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025 * scale, 0.025 * scale, 0.2 * scale, 8),
          mat(0xf5f0e6, { rough: 0.4 })
        );
        candle.position.set((c - 1) * 0.18 * scale, topY + 0.12 * scale, 0);
        group.add(candle);
      }
    }
    group.userData = { tipo: tipo, size: opts.size || "m", provisional: true };
    return group;
  }

  function measureContainer(el) {
    if (!el) return { w: 300, h: 260 };
    var w = el.clientWidth || el.offsetWidth;
    var h = el.clientHeight || el.offsetHeight;
    if (w < 10 && el.parentElement) {
      w = el.parentElement.clientWidth || 300;
      h = el.parentElement.clientHeight || 260;
    }
    return { w: Math.max(w, 200), h: Math.max(h, 200) };
  }

  function setViewerState(container, state) {
    if (!container) return;
    var loading = container.querySelector(".viewer-state");
    if (!loading) return;
    loading.className = "viewer-state " + state;
    if (state === "ready") loading.style.display = "none";
    else if (state === "error") {
      loading.style.display = "flex";
      loading.textContent = "No se pudo cargar el 3D. La foto real es la referencia.";
    } else {
      loading.style.display = "flex";
      loading.textContent = "Cargando modelo 3D orientativo…";
    }
  }

  function disposeViewer(v, isConfig) {
    if (!v) return;
    if (isConfig && configAnimId) {
      cancelAnimationFrame(configAnimId);
      configAnimId = null;
    }
    if (!isConfig && productAnimId) {
      cancelAnimationFrame(productAnimId);
      productAnimId = null;
    }
    if (v.cake) disposeObject(v.cake);
    if (v.renderer) {
      try { v.renderer.dispose(); } catch (e) {}
      if (v.renderer.domElement && v.renderer.domElement.parentNode) {
        v.renderer.domElement.parentNode.removeChild(v.renderer.domElement);
      }
    }
    v.dead = true;
  }

  function setupViewer(canvasId, containerId, isConfig) {
    if (typeof THREE === "undefined") return null;
    var canvasWrap = document.getElementById(canvasId);
    var container = document.getElementById(containerId) || (canvasWrap && canvasWrap.parentElement);
    if (!canvasWrap || !container) return null;

    var dims = measureContainer(container);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, dims.w / dims.h, 0.1, 100);
    camera.position.set(2.2, 1.8, 2.8);
    camera.lookAt(0, 0.6, 0);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(dims.w, dims.h);
    renderer.shadowMap.enabled = true;
    canvasWrap.innerHTML = "";
    canvasWrap.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfff5eb, 0.65));
    var dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(3, 5, 2);
    dir.castShadow = true;
    scene.add(dir);
    var fill = new THREE.DirectionalLight(0xffe8d0, 0.35);
    fill.position.set(-2, 2, -1);
    scene.add(fill);

    var state = {
      container: container,
      cake: null,
      renderer: renderer,
      camera: camera,
      scene: scene,
      rotY: 0.35,
      rotX: 0.15,
      zoom: 1,
      dragging: false,
      lastX: 0,
      lastY: 0,
      dead: false,
      opts: { tipo: "matilda", size: "m" }
    };

    function renderCake(opts) {
      state.opts = opts || state.opts;
      if (state.cake) {
        scene.remove(state.cake);
        disposeObject(state.cake);
      }
      /* GLB: cuando existan archivos en MODEL_BASE; por ahora solo procedural */
      state.cake = buildCake(state.opts);
      scene.add(state.cake);
      setViewerState(container, "ready");
    }

    function animate() {
      if (state.dead) return;
      var id = requestAnimationFrame(animate);
      if (isConfig) configAnimId = id;
      else productAnimId = id;
      if (state.cake) {
        state.cake.rotation.y = state.rotY;
        state.cake.rotation.x = state.rotX;
      }
      camera.position.set(2.2 * state.zoom, 1.8 * state.zoom, 2.8 * state.zoom);
      camera.lookAt(0, 0.55, 0);
      renderer.render(scene, camera);
    }

    var el = renderer.domElement;
    el.addEventListener("pointerdown", function (e) {
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", function (e) {
      if (!state.dragging) return;
      state.rotY += (e.clientX - state.lastX) * 0.01;
      state.rotX = Math.max(-0.4, Math.min(0.6, state.rotX + (e.clientY - state.lastY) * 0.008));
      state.lastX = e.clientX;
      state.lastY = e.clientY;
    });
    el.addEventListener("pointerup", function () { state.dragging = false; });
    el.addEventListener("wheel", function (e) {
      e.preventDefault();
      state.zoom = Math.max(0.6, Math.min(1.8, state.zoom + e.deltaY * 0.001));
    }, { passive: false });

    function onResize() {
      var d = measureContainer(container);
      camera.aspect = d.w / d.h;
      camera.updateProjectionMatrix();
      renderer.setSize(d.w, d.h);
    }
    window.addEventListener("resize", onResize);
    state._onResize = onResize;

    state.update = function (o) { renderCake(o); };
    state.resetCamera = function () {
      state.rotY = 0.35;
      state.rotX = 0.15;
      state.zoom = 1;
    };
    state.dispose = function () {
      state.dead = true;
      window.removeEventListener("resize", onResize);
      disposeViewer(state, isConfig);
    };

    renderCake(state.opts);
    animate();
    return state;
  }

  function waitForThree(cb, tries) {
    tries = tries || 0;
    if (typeof THREE !== "undefined") {
      cb();
      return;
    }
    if (tries > 40) return;
    setTimeout(function () { waitForThree(cb, tries + 1); }, 150);
  }

  function initConfig3D(opts) {
    waitForThree(function () {
      var container = document.getElementById("config-3d-viewer");
      setViewerState(container, "loading");
      requestAnimationFrame(function () {
        try {
          if (configViewer) {
            configViewer.update(opts);
            return;
          }
          configViewer = setupViewer("config-3d-canvas", "config-3d-viewer", true);
          if (configViewer && opts) configViewer.update(opts);
          else if (!configViewer) setViewerState(container, "error");
        } catch (e) {
          console.error(e);
          setViewerState(container, "error");
        }
      });
    });
  }

  function updateConfig3D(opts) {
    if (configViewer && !configViewer.dead) configViewer.update(opts);
    else initConfig3D(opts);
  }

  function openProduct3D(product) {
    var overlay = document.getElementById("modal-3d-overlay");
    if (!overlay) return;
    var title = document.getElementById("modal-3d-title");
    if (title) title.textContent = (product && product.name) || "Vista 3D orientativa";
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    var tipo = "matilda";
    if (product) {
      var n = (product.name || "").toLowerCase();
      if (n.indexOf("red") >= 0) tipo = "redvelvet";
      else if (n.indexOf("lotus") >= 0) tipo = "lotus";
      else if (n.indexOf("oreo") >= 0) tipo = "oreo";
      else if (n.indexOf("pistacho") >= 0) tipo = "pistacho-frambuesa";
      else if (n.indexOf("ferrero") >= 0) tipo = "ferrero";
      else if (n.indexOf("selva") >= 0) tipo = "selva";
      else if (n.indexOf("cheesecake") >= 0 || n.indexOf("queso") >= 0) tipo = "cheesecake";
      else if (n.indexOf("fresa") >= 0) tipo = "nata-fresa";
      else if (n.indexOf("matilda") >= 0 || n.indexOf("choco") >= 0) tipo = "matilda";
    }
    waitForThree(function () {
      var container = document.getElementById("product-3d-viewer");
      setViewerState(container, "loading");
      requestAnimationFrame(function () {
        try {
          if (productViewer) productViewer.dispose();
          productViewer = setupViewer("product-3d-canvas", "product-3d-viewer", false);
          if (productViewer) productViewer.update({ tipo: tipo, size: "m" });
          else setViewerState(container, "error");
        } catch (e) {
          setViewerState(container, "error");
        }
      });
    });
  }

  function closeProduct3D() {
    var overlay = document.getElementById("modal-3d-overlay");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (productViewer) {
      productViewer.dispose();
      productViewer = null;
    }
  }

  function resetCamera() {
    if (configViewer) configViewer.resetCamera();
  }

  function destroyConfig() {
    if (configViewer) {
      configViewer.dispose();
      configViewer = null;
    }
  }

  return {
    initConfig3D: initConfig3D,
    updateConfig3D: updateConfig3D,
    openProduct3D: openProduct3D,
    closeProduct3D: closeProduct3D,
    resetCamera: resetCamera,
    destroyConfig: destroyConfig,
    buildCake: buildCake,
    glbPathForTipo: glbPathForTipo
  };
})();
