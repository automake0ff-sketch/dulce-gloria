/* Dulce Gloria — Cake3D (procedural, variedad diferenciada) */
(function (global) {
  "use strict";

  var TYPE_PROFILE = {
    matilda: { sponge: 0x4a2c1a, frost: 0x3d2314, drip: 0x2a1810, top: 0x5c3a24 },
    redvelvet: { sponge: 0x8b2e3a, frost: 0xf5e6e0, drip: 0xc45c6a, top: 0xfaf0ec },
    lotus: { sponge: 0xc4a574, frost: 0xf5e6d3, drip: 0x8b6914, top: 0xfff8ee },
    oreo: { sponge: 0x2c2c2c, frost: 0xf5f5f5, drip: 0x1a1a1a, top: 0xffffff },
    "pistacho-frambuesa": { sponge: 0x7a9a5c, frost: 0xe8f0e0, drip: 0xc45c6a, top: 0xf0f8e8 },
    ferrero: { sponge: 0x5c3a24, frost: 0xd4a574, drip: 0x3d2314, top: 0xe8c4a0 },
    selva: { sponge: 0x4a2c1a, frost: 0xf5e6e0, drip: 0x8b2e3a, top: 0xffffff },
    "nata-fresa": { sponge: 0xf5e6e0, frost: 0xffffff, drip: 0xe85a6a, top: 0xfff8f5 },
    "choco-bosque": { sponge: 0x3d2314, frost: 0x5c3a24, drip: 0x6b2e4a, top: 0x4a2c1a },
    cheesecake: { sponge: 0xf0e6d0, frost: 0xfff8ee, drip: 0xc4a574, top: 0xffffff },
    chocolate: { sponge: 0x3d2314, frost: 0x5c3a24, drip: 0x2a1810, top: 0x4a2c1a },
    crema: { sponge: 0xf0e6d0, frost: 0xfff8ee, drip: 0xc4a574, top: 0xffffff }
  };

  var SIZE_SCALE = { s: 0.75, m: 1.0, l: 1.25 };

  function mat(color, rough, metal) {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: rough != null ? rough : 0.55,
      metalness: metal != null ? metal : 0.05
    });
  }

  function disposeObject(obj) {
    if (!obj) return;
    obj.traverse(function (c) {
      if (c.geometry) c.geometry.dispose();
      if (c.material) {
        if (Array.isArray(c.material)) c.material.forEach(function (m) { m.dispose(); });
        else c.material.dispose();
      }
    });
  }

  function buildCake(opts) {
    opts = opts || {};
    var tipo = opts.tipo || "matilda";
    var size = opts.size || "m";
    var frostKey = opts.frost || tipo;
    var profile = TYPE_PROFILE[frostKey] || TYPE_PROFILE[tipo] || TYPE_PROFILE.matilda;
    var scale = SIZE_SCALE[size] || 1;
    var group = new THREE.Group();

    var plate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35 * scale, 1.4 * scale, 0.08, 48),
      mat(0xe8e0d5, 0.7, 0.1)
    );
    plate.position.y = 0;
    plate.receiveShadow = true;
    group.add(plate);

    var layerH = 0.42 * scale;
    var r1 = 1.05 * scale;
    var sponge1 = new THREE.Mesh(new THREE.CylinderGeometry(r1, r1, layerH, 48), mat(profile.sponge, 0.85, 0));
    sponge1.position.y = 0.08 + layerH / 2;
    sponge1.castShadow = true;
    group.add(sponge1);

    var frost1 = new THREE.Mesh(
      new THREE.CylinderGeometry(r1 * 1.02, r1 * 1.02, layerH * 0.18, 48),
      mat(profile.frost, 0.4, 0.02)
    );
    frost1.position.y = sponge1.position.y + layerH * 0.42;
    group.add(frost1);

    var r2 = 0.85 * scale;
    var sponge2 = new THREE.Mesh(new THREE.CylinderGeometry(r2, r2, layerH, 48), mat(profile.sponge, 0.85, 0));
    sponge2.position.y = frost1.position.y + layerH * 0.55;
    sponge2.castShadow = true;
    group.add(sponge2);

    var frost2 = new THREE.Mesh(
      new THREE.CylinderGeometry(r2 * 1.02, r2 * 1.02, layerH * 0.2, 48),
      mat(profile.frost, 0.35, 0.02)
    );
    frost2.position.y = sponge2.position.y + layerH * 0.45;
    group.add(frost2);

    var topY = frost2.position.y + layerH * 0.15;
    var top = new THREE.Mesh(new THREE.CylinderGeometry(r2 * 0.98, r2 * 0.98, 0.06 * scale, 48), mat(profile.top, 0.3, 0.05));
    top.position.y = topY;
    group.add(top);

    // Drips
    var dripMat = mat(profile.drip, 0.35, 0.08);
    for (var i = 0; i < 10; i++) {
      var ang = (i / 10) * Math.PI * 2 + 0.2;
      var drip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04 * scale, 0.025 * scale, 0.28 * scale, 8),
        dripMat
      );
      drip.position.set(Math.cos(ang) * r2 * 0.92, topY - 0.08 * scale, Math.sin(ang) * r2 * 0.92);
      drip.rotation.z = 0.15 * Math.sin(i);
      group.add(drip);
    }

    // Variety toppings
    if (tipo === "oreo" || frostKey === "oreo") {
      for (var o = 0; o < 5; o++) {
        var cookie = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12 * scale, 0.12 * scale, 0.04 * scale, 16),
          mat(0x1a1a1a, 0.9, 0)
        );
        var a = (o / 5) * Math.PI * 2;
        cookie.position.set(Math.cos(a) * 0.35 * scale, topY + 0.06 * scale, Math.sin(a) * 0.35 * scale);
        group.add(cookie);
      }
    }
    if (tipo.indexOf("pistacho") >= 0 || frostKey === "pistacho") {
      for (var p = 0; p < 8; p++) {
        var nut = new THREE.Mesh(new THREE.SphereGeometry(0.05 * scale, 8, 8), mat(0x6b8f4e, 0.6, 0));
        var ap = (p / 8) * Math.PI * 2;
        nut.position.set(Math.cos(ap) * 0.4 * scale, topY + 0.05 * scale, Math.sin(ap) * 0.4 * scale);
        group.add(nut);
      }
    }
    if (tipo.indexOf("fresa") >= 0 || tipo === "selva" || tipo === "nata-fresa") {
      for (var f = 0; f < 6; f++) {
        var berry = new THREE.Mesh(new THREE.SphereGeometry(0.06 * scale, 8, 8), mat(0xc41e3a, 0.5, 0));
        var af = (f / 6) * Math.PI * 2 + 0.3;
        berry.position.set(Math.cos(af) * 0.38 * scale, topY + 0.07 * scale, Math.sin(af) * 0.38 * scale);
        group.add(berry);
      }
    }
    if (opts.candles) {
      for (var c = 0; c < 3; c++) {
        var candle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025 * scale, 0.025 * scale, 0.22 * scale, 8),
          mat(0xf5f0e6, 0.4, 0)
        );
        candle.position.set((c - 1) * 0.2 * scale, topY + 0.14 * scale, 0);
        group.add(candle);
        var flame = new THREE.Mesh(new THREE.SphereGeometry(0.03 * scale, 6, 6), mat(0xffaa33, 0.3, 0.2));
        flame.position.set((c - 1) * 0.2 * scale, topY + 0.28 * scale, 0);
        group.add(flame);
      }
    }

    group.userData = { tipo: tipo, size: size };
    return group;
  }

  function measureContainer(el) {
    if (!el) return { w: 300, h: 260 };
    var w = el.clientWidth || el.offsetWidth;
    var h = el.clientHeight || el.offsetHeight;
    if (w < 10) {
      var parent = el.parentElement;
      if (parent) {
        w = parent.clientWidth || parent.offsetWidth || 300;
        h = parent.clientHeight || parent.offsetHeight || 260;
      }
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
      loading.textContent = "Cargando modelo 3D…";
    }
  }

  var viewers = {};

  function setupViewer(canvasId, containerId, loadingId) {
    if (typeof THREE === "undefined") return null;
    var canvasWrap = document.getElementById(canvasId);
    var container = document.getElementById(containerId) || (canvasWrap && canvasWrap.parentElement);
    if (!canvasWrap || !container) return null;

    var dims = measureContainer(container);
    var scene = new THREE.Scene();
    scene.background = null;

    var camera = new THREE.PerspectiveCamera(42, dims.w / dims.h, 0.1, 100);
    camera.position.set(2.2, 1.8, 2.8);
    camera.lookAt(0, 0.6, 0);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(dims.w, dims.h);
    renderer.shadowMap.enabled = true;
    canvasWrap.innerHTML = "";
    canvasWrap.appendChild(renderer.domElement);

    var ambient = new THREE.AmbientLight(0xfff5eb, 0.65);
    scene.add(ambient);
    var dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(3, 5, 2);
    dir.castShadow = true;
    scene.add(dir);
    var fill = new THREE.DirectionalLight(0xffe8d0, 0.35);
    fill.position.set(-2, 2, -1);
    scene.add(fill);

    var cakeGroup = null;
    var rotY = 0.35, rotX = 0.15;
    var dragging = false, lastX = 0, lastY = 0;
    var pinchDist = 0;
    var zoom = 1;

    function renderCake(opts) {
      if (cakeGroup) {
        scene.remove(cakeGroup);
        disposeObject(cakeGroup);
      }
      cakeGroup = buildCake(opts);
      scene.add(cakeGroup);
      setViewerState(container, "ready");
    }

    function animate() {
      var id = canvasId;
      if (!viewers[id] || viewers[id].dead) return;
      requestAnimationFrame(animate);
      if (cakeGroup) {
        cakeGroup.rotation.y = rotY;
        cakeGroup.rotation.x = rotX;
      }
      camera.position.set(2.2 * zoom, 1.8 * zoom, 2.8 * zoom);
      camera.lookAt(0, 0.55 * (SIZE_SCALE[(opts && opts.size) || "m"] || 1), 0);
      renderer.render(scene, camera);
    }
    var opts = { tipo: "matilda", size: "m" };

    var el = renderer.domElement;
    el.addEventListener("pointerdown", function (e) {
      dragging = true; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      rotY += (e.clientX - lastX) * 0.01;
      rotX = Math.max(-0.4, Math.min(0.6, rotX + (e.clientY - lastY) * 0.008));
      lastX = e.clientX; lastY = e.clientY;
    });
    el.addEventListener("pointerup", function () { dragging = false; });
    el.addEventListener("pointercancel", function () { dragging = false; });
    el.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoom = Math.max(0.6, Math.min(1.8, zoom + e.deltaY * 0.001));
    }, { passive: false });

    el.addEventListener("touchstart", function (e) {
      if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchDist = Math.sqrt(dx * dx + dy * dy);
      }
    }, { passive: true });
    el.addEventListener("touchmove", function (e) {
      if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (pinchDist > 0) zoom = Math.max(0.6, Math.min(1.8, zoom * (pinchDist / d)));
        pinchDist = d;
      }
    }, { passive: true });

    function onResize() {
      var d = measureContainer(container);
      camera.aspect = d.w / d.h;
      camera.updateProjectionMatrix();
      renderer.setSize(d.w, d.h);
    }
    window.addEventListener("resize", onResize);

    var api = {
      update: function (o) { opts = o || opts; renderCake(opts); },
      resetCamera: function () { rotY = 0.35; rotX = 0.15; zoom = 1; },
      dispose: function () {
        api.dead = true;
        window.removeEventListener("resize", onResize);
        if (cakeGroup) disposeObject(cakeGroup);
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      },
      dead: false
    };
    viewers[canvasId] = api;
    renderCake(opts);
    animate();
    return api;
  }

  function waitForThree(cb, tries) {
    tries = tries || 0;
    if (typeof THREE !== "undefined") { cb(); return; }
    if (tries > 40) {
      console.warn("Three.js no cargó");
      return;
    }
    setTimeout(function () { waitForThree(cb, tries + 1); }, 150);
  }

  var configApi = null;
  var productApi = null;

  function initConfig3D(opts) {
    waitForThree(function () {
      var container = document.getElementById("config-3d-viewer");
      setViewerState(container, "loading");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          try {
            if (configApi) { configApi.update(opts); return; }
            configApi = setupViewer("config-3d-canvas", "config-3d-viewer");
            if (configApi && opts) configApi.update(opts);
            else if (!configApi) setViewerState(container, "error");
          } catch (e) {
            console.error(e);
            setViewerState(container, "error");
          }
        });
      });
    });
  }

  function updateConfig3D(opts) {
    if (configApi) configApi.update(opts);
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
          if (productApi) productApi.dispose();
          productApi = setupViewer("product-3d-canvas", "product-3d-viewer");
          if (productApi) productApi.update({ tipo: tipo, size: "m" });
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
    if (productApi) { productApi.dispose(); productApi = null; }
  }

  function resetCamera() {
    if (configApi) configApi.resetCamera();
  }

  global.Cake3D = {
    initConfig3D: initConfig3D,
    updateConfig3D: updateConfig3D,
    openProduct3D: openProduct3D,
    closeProduct3D: closeProduct3D,
    resetCamera: resetCamera,
    buildCake: buildCake
  };
})(typeof window !== "undefined" ? window : this);
