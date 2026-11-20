/* Dulce Gloria — catálogo, configurador, encargos WhatsApp */
(function () {
  "use strict";

  var PHOTO = {
    choco: "https://dulcegloria.com/wp-content/uploads/2026/05/fdt5rp880hhny2u56549k5a37xvf-768x1024.jpeg",
    chocoDeco: "https://dulcegloria.com/wp-content/uploads/2026/05/c5pwgpc7pz3rlnillbdap74zmzh9.jpeg",
    redvelvet: "https://dulcegloria.com/wp-content/uploads/2026/05/8oco9d5137g7dz9yjt71lbo22qwe.jpeg",
    cheesecake: "https://dulcegloria.com/wp-content/uploads/2026/05/ppjk7zoay05ofmw2sd4d5wrdqnge.jpeg",
    birthday: "https://dulcegloria.com/wp-content/uploads/2026/05/zxyb3v351aki3dpquua3cl5v14p1.jpeg",
    pasteleria: "https://dulcegloria.com/wp-content/uploads/2026/05/bgwnafllwpyf0mvz0wjsr1z9es09-724x1024.jpeg",
    toast: "https://dulcegloria.com/wp-content/uploads/2026/05/tn3ezo4d8lvlcpg5yalfp9zslgme-767x1024.jpeg",
    coffee: "https://dulcegloria.com/wp-content/uploads/2026/05/ye3q0rielbrzckehtte15wbxc3b2.jpeg",
    cookies: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-10.42.56-763x1024.png",
    cinnamon: "https://dulcegloria.com/wp-content/uploads/2026/05/6mmiapvur81xpysodpm3zfp0kyyo.jpeg",
    chocoFresas: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-10.58.43.png",
    pistachoTarta: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-10.59.24.png",
    brownies: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-11.01.26.png",
    browniesOreo: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-11.03.25.png",
    batido: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-10.59.13.png",
    helado: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-11.01.52.png",
    bowl: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-11.00.57.png",
    chocoNaranja: "https://dulcegloria.com/wp-content/uploads/2026/05/Captura-de-pantalla-2026-05-08-a-las-11.02.53.png"
  };

  var PRODUCT_PHOTOS = {
    1: { src: PHOTO.choco, verified: true },
    20: { src: PHOTO.choco, verified: true },
    2: { src: PHOTO.redvelvet, verified: true },
    103: { src: PHOTO.redvelvet, verified: true },
    21: { src: PHOTO.chocoFresas, verified: true },
    35: { src: PHOTO.cheesecake, verified: true },
    37: { src: PHOTO.cheesecake, verified: true },
    41: { src: PHOTO.cinnamon, verified: true },
    60: { src: PHOTO.toast, verified: true },
    93: { src: PHOTO.coffee, verified: true },
    110: { src: PHOTO.helado, verified: true },
    111: { src: PHOTO.helado, verified: true }
  };

  var products = [
    { id: 40, name: "Lemon Pie", cat: "Dulces Artesanos", desc: "Tarta de limón con merengue.", price: "3,70€", tag: "Popular" },
    { id: 41, name: "Cinnamon Roll", cat: "Dulces Artesanos", desc: "Rollo de canela artesano.", price: "3,80€", tag: "Popular" },
    { id: 42, name: "Croissant", cat: "Dulces Artesanos", desc: "Croissant artesano.", price: "2,70€" },
    { id: 43, name: "Bizcocho del día", cat: "Dulces Artesanos", desc: "Bizcocho del día.", price: "2,80€" },
    { id: 45, name: "Pancakes", cat: "Dulces Artesanos", desc: "Con fruta y chocolate o pistacho.", price: "5,50€" },
    { id: 46, name: "Donut de Chocolate", cat: "Dulces Artesanos", desc: "Donut de chocolate.", price: "1,80€" },
    { id: 1, name: "Matilda", cat: "Cakes", desc: "Chocolate intenso (porción).", price: "4,90€", tag: "Popular", orderable: true },
    { id: 2, name: "Red Velvet", cat: "Cakes", desc: "Clásico red velvet (porción).", price: "4,50€", orderable: true },
    { id: 3, name: "Lotus", cat: "Cakes", desc: "Con galleta Lotus (porción).", price: "4,70€", orderable: true },
    { id: 6, name: "Pistacho y frambuesa", cat: "Cakes", desc: "Pistacho y frambuesa (porción).", price: "4,90€", orderable: true },
    { id: 7, name: "Ferrero", cat: "Cakes", desc: "Avellana y chocolate (porción).", price: "4,90€", orderable: true },
    { id: 8, name: "Selva Negra", cat: "Cakes", desc: "Clásico selva negra (porción).", price: "4,90€", orderable: true },
    { id: 9, name: "Nata y Fresa", cat: "Cakes", desc: "Nata y fresa (porción).", price: "4,50€", orderable: true },
    { id: 10, name: "Chocolate y frutos del bosque", cat: "Cakes", desc: "Chocolate y frutos (porción).", price: "4,90€", orderable: true },
    { id: 20, name: "Matilda", cat: "Tartas", desc: "Tarta entera de chocolate intenso.", price: "28,90€", tag: "Encargo", orderable: true },
    { id: 21, name: "Chocolate & Fresas", cat: "Tartas", desc: "Chocolate y fresas.", price: "29,90€", orderable: true },
    { id: 22, name: "Chocolate & Frutos del Bosque", cat: "Tartas", desc: "Frutos del bosque.", price: "29,90€", orderable: true },
    { id: 23, name: "Chocolate & Caramelo", cat: "Tartas", desc: "Chocolate y caramelo.", price: "28,90€", orderable: true },
    { id: 100, name: "Lotus", cat: "Colección Signature", desc: "Consultar precio en el local.", price: "Consultar", tag: "Signature", orderable: true },
    { id: 101, name: "Oreo", cat: "Colección Signature", desc: "Consultar precio.", price: "Consultar", orderable: true },
    { id: 103, name: "Red Velvet", cat: "Colección Signature", desc: "Consultar precio.", price: "Consultar", orderable: true },
    { id: 107, name: "Selva Negra", cat: "Colección Signature", desc: "Consultar precio.", price: "Consultar", orderable: true },
    { id: 35, name: "Cheesecake (porción)", cat: "Cheesecakes", desc: "Porción de tarta de queso.", price: "3,50€", tag: "Especialidad", orderable: true },
    { id: 37, name: "Cheesecake por encargo", cat: "Cheesecakes", desc: "Tarta de queso completa bajo pedido.", price: "23,90€", tag: "Encargo", orderable: true },
    { id: 110, name: "Glory Coffe Cream", cat: "Helados Gloria", desc: "Helado de café de la casa.", price: "5,80€" },
    { id: 111, name: "Glory Cream", cat: "Helados Gloria", desc: "Helado artesanal Gloria.", price: "4,80€" },
    { id: 60, name: "Bagel Ahumado Deluxe", cat: "Brunch", desc: "Bagel, queso crema, aguacate, atún ahumado.", price: "9,90€", tag: "Brunch" },
    { id: 61, name: "Pancake Salado", cat: "Brunch", desc: "Pulled chicken, huevo y holandesa.", price: "6,50€" },
    { id: 62, name: "Shakshuka", cat: "Brunch", desc: "Huevos sobre salsa de tomate.", price: "6,00€" },
    { id: 63, name: "Arepa Tex-Mex", cat: "Brunch", desc: "Ternera, queso, aguacate.", price: "7,90€" },
    { id: 64, name: "Muhammara", cat: "Brunch", desc: "Pimientos, almendra, sésamo.", price: "5,90€" },
    { id: 93, name: "Flat White", cat: "Cafés", desc: "Café de especialidad.", price: "2,60€" },
    { id: 95, name: "Matcha Latte", cat: "Cafés", desc: "Matcha latte.", price: "4,00€" },
    { id: 120, name: "Pack Cinnamon Roll (4)", cat: "Packs", desc: "Pack de 4 cinnamon rolls.", price: "14,00€", tag: "Pack" }
  ];

  function applyProductPhotos() {
    products.forEach(function (p) {
      var m = PRODUCT_PHOTOS[p.id];
      if (m && m.src && m.verified) p.img = m.src;
    });
  }

  var categories = ["Todos", "Tartas", "Cakes", "Colección Signature", "Cheesecakes", "Dulces Artesanos", "Brunch", "Cafés", "Helados Gloria", "Packs"];
  var FEATURED_IDS = [20, 2, 21, 35, 41, 100, 6, 7];
  var currentFilter = "Todos";
  var orderState = { productId: null, mode: "config" };

  var cakeTypes = [
    { id: "matilda", label: "Matilda", frost: "matilda", photo: PHOTO.choco, priceHint: "Desde 4,90€ / 28,90€", desc: "Chocolate intenso" },
    { id: "redvelvet", label: "Red Velvet", frost: "redvelvet", photo: PHOTO.redvelvet, priceHint: "Desde 4,50€", desc: "Clásico aterciopelado" },
    { id: "lotus", label: "Lotus", frost: "lotus", photo: null, priceHint: "Consultar precio", desc: "Galleta Lotus · Signature" },
    { id: "oreo", label: "Oreo", frost: "oreo", photo: null, priceHint: "Consultar precio", desc: "Signature" },
    { id: "pistacho-frambuesa", label: "Pistacho y frambuesa", frost: "pistacho", photo: null, priceHint: "Desde 4,90€", desc: "Porción o encargo" },
    { id: "ferrero", label: "Ferrero", frost: "ferrero", photo: null, priceHint: "Desde 4,90€", desc: "Avellana y chocolate" },
    { id: "selva", label: "Selva Negra", frost: "selva", photo: null, priceHint: "Consultar precio", desc: "Signature" },
    { id: "nata-fresa", label: "Nata y fresa", frost: "natafresa", photo: null, priceHint: "Desde 4,50€", desc: "Con fresas" },
    { id: "choco-bosque", label: "Chocolate y frutos", frost: "chocolate", photo: PHOTO.chocoFresas, priceHint: "29,90€", desc: "Frutos del bosque / fresas" },
    { id: "cheesecake", label: "Cheesecake", frost: "crema", photo: PHOTO.cheesecake, priceHint: "3,50€ / 23,90€", desc: "Tarta de queso" }
  ];

  var cakeSizes = [
    { id: "s", label: "Pequeña", sub: "4–6 pers.", people: "4–6" },
    { id: "m", label: "Mediana", sub: "8–10 pers.", people: "8–10" },
    { id: "l", label: "Grande", sub: "12–14 pers.", people: "12–14" }
  ];

  var sizesByTipo = {
    matilda: ["s", "m", "l"],
    redvelvet: ["s", "m", "l"],
    lotus: null,
    oreo: null,
    "pistacho-frambuesa": ["s", "m", "l"],
    ferrero: ["s", "m", "l"],
    selva: null,
    "nata-fresa": ["s", "m", "l"],
    "choco-bosque": ["s", "m", "l"],
    cheesecake: ["s", "m", "l"]
  };

  var cakeState = { tipo: "matilda", size: "m", msg: "", date: "", time: "", notes: "", candles: false };

  function renderProducts(list, containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.textContent = "";
    var frag = document.createDocumentFragment();
    list.forEach(function (p) {
      var card = document.createElement("div");
      card.className = "product-card";
      var img = document.createElement("div");
      img.className = "product-img";
      img.onclick = function () { openProduct(p.id); };
      if (p.tag) {
        var b = document.createElement("div");
        b.className = "product-badge";
        b.textContent = p.tag;
        img.appendChild(b);
      }
      if (p.img) {
        var photo = document.createElement("img");
        photo.src = p.img;
        photo.alt = p.name;
        photo.loading = "lazy";
        img.appendChild(photo);
      } else {
        var ph = document.createElement("div");
        ph.className = "no-img";
        ph.textContent = "Fotografía próximamente";
        img.appendChild(ph);
      }
      var body = document.createElement("div");
      body.className = "product-body";
      var displayPrice = p.price === "0,00€" || p.price === "0€" || !p.price ? "Consultar precio" : p.price;
      [["product-cat", p.cat], ["product-name", p.name], ["product-desc", p.desc], ["product-price", displayPrice]].forEach(function (pair) {
        var d = document.createElement("div");
        d.className = pair[0];
        d.textContent = pair[1];
        body.appendChild(d);
      });
      var actions = document.createElement("div");
      actions.className = "product-actions";
      var btnView = document.createElement("button");
      btnView.type = "button";
      btnView.className = "btn-card";
      btnView.textContent = "Ver producto";
      btnView.onclick = function (e) {
        e.stopPropagation();
        openProduct(p.id);
      };
      actions.appendChild(btnView);
      var isCake = !!p.orderable || ["Tartas", "Cakes", "Colección Signature", "Cheesecakes"].indexOf(p.cat) >= 0;
      if (isCake) {
        var btnOrd = document.createElement("button");
        btnOrd.type = "button";
        btnOrd.className = "btn-card primary";
        btnOrd.textContent = "Solicitar encargo";
        btnOrd.onclick = function (e) {
          e.stopPropagation();
          startOrderFromProduct(p);
        };
        actions.appendChild(btnOrd);
      }
      body.appendChild(actions);
      card.appendChild(img);
      card.appendChild(body);
      frag.appendChild(card);
    });
    el.appendChild(frag);
  }

  function renderFilters() {
    var el = document.getElementById("filters");
    if (!el) return;
    el.textContent = "";
    categories.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "filter-btn" + (c === currentFilter ? " active" : "");
      b.textContent = c;
      b.onclick = function () { filterProducts(c); };
      el.appendChild(b);
    });
  }

  function filterProducts(cat) {
    currentFilter = cat;
    renderFilters();
    var q = ((document.getElementById("search-input") || {}).value || "").toLowerCase();
    var list = cat === "Todos" ? products : products.filter(function (p) { return p.cat === cat; });
    if (q) list = list.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) >= 0 || p.desc.toLowerCase().indexOf(q) >= 0;
    });
    renderProducts(list, "all-products");
  }

  function searchProducts() { filterProducts(currentFilter); }

  function openProduct(id) {
    var p = products.find(function (x) { return x.id === id; });
    if (!p) return;
    document.getElementById("modal-cat").textContent = p.cat;
    document.getElementById("modal-name").textContent = p.name;
    document.getElementById("modal-desc").textContent = p.desc;
    var displayPrice = p.price === "0,00€" || p.price === "0€" || !p.price ? "Consultar precio" : p.price;
    document.getElementById("modal-price").textContent = displayPrice;
    var wrap = document.getElementById("modal-img-wrap");
    var noPhoto = document.getElementById("modal-no-photo");
    var existing = wrap.querySelector("img.modal-photo");
    if (existing) existing.remove();
    if (p.img) {
      noPhoto.style.display = "none";
      var img = document.createElement("img");
      img.className = "modal-photo";
      img.src = p.img;
      img.alt = p.name;
      wrap.insertBefore(img, wrap.firstChild);
    } else { noPhoto.style.display = "flex"; }
    var btn3d = document.getElementById("modal-preview-btn");
    var btnOrder = document.getElementById("modal-order-btn");
    var isCake = !!p.orderable || ["Tartas", "Cakes", "Colección Signature", "Cheesecakes"].indexOf(p.cat) >= 0;
    if (btn3d) {
      btn3d.style.display = isCake ? "block" : "none";
      btn3d.onclick = isCake ? function () { open3DViewer(p); } : null;
    }
    if (btnOrder) {
      btnOrder.style.display = isCake ? "block" : "none";
      btnOrder.onclick = function () { closeModal(); startOrderFromProduct(p); };
    }
    document.getElementById("modal").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(e) {
    if (e && e.target !== document.getElementById("modal") && !(e.target.classList && e.target.classList.contains("modal-close")) && e.target.tagName !== "BUTTON") return;
    document.getElementById("modal").classList.remove("open");
    document.body.style.overflow = "";
  }

  function showPage(page) {
    document.querySelectorAll(".page").forEach(function (p) { p.classList.remove("active"); });
    var t = document.getElementById(page);
    if (t) t.classList.add("active");
    document.querySelectorAll(".nav-links button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-page") === page);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "crear") setTimeout(function () { ensureThreeThenInit(); }, 220);
  }

  function initCakeConfig() {
    var tg = document.getElementById("tipo-grid");
    if (!tg) return;
    tg.textContent = "";
    cakeTypes.forEach(function (t) {
      var d = document.createElement("div");
      d.className = "cake-pick" + (cakeState.tipo === t.id ? " selected" : "");
      d.onclick = function () { selectTipo(t.id); };
      if (t.photo) {
        var im = document.createElement("img");
        im.src = t.photo; im.alt = t.label; im.loading = "lazy"; d.appendChild(im);
      } else {
        var ph = document.createElement("div");
        ph.style.cssText = "height:90px;background:linear-gradient(145deg,#EDE6D9,#D9CFC0);display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#6F655A;border-radius:12px 12px 0 0";
        ph.textContent = t.label; d.appendChild(ph);
      }
      var lab = document.createElement("div"); lab.className = "lbl"; lab.textContent = t.label; d.appendChild(lab);
      var sub = document.createElement("div"); sub.className = "sub"; sub.textContent = t.priceHint || ""; d.appendChild(sub);
      tg.appendChild(d);
    });
    var sg = document.getElementById("size-grid");
    if (sg) {
      sg.textContent = "";
      var allowed = sizesByTipo[cakeState.tipo];
      var list = cakeSizes;
      if (allowed && allowed.length) list = cakeSizes.filter(function (s) { return allowed.indexOf(s.id) >= 0; });
      list.forEach(function (s) {
        var d = document.createElement("div");
        d.className = "option-card" + (cakeState.size === s.id ? " selected" : "");
        d.onclick = function () { selectSize(s.id); };
        var lab = document.createElement("div"); lab.className = "opt-label"; lab.textContent = s.label;
        var sub = document.createElement("div"); sub.className = "opt-sub"; sub.textContent = s.sub + (allowed === null ? " · Consultar" : "");
        d.appendChild(lab); d.appendChild(sub); sg.appendChild(d);
      });
      if (allowed === null) {
        var note = document.createElement("p");
        note.style.cssText = "font-size:.75rem;color:#6F655A;margin-top:8px;grid-column:1/-1";
        note.textContent = "Disponibilidad de tamaños pendiente de confirmar con el local.";
        sg.appendChild(note);
      }
    }
    updateCakePreview();
  }

  function selectTipo(id) {
    cakeState.tipo = id;
    var allowed = sizesByTipo[id];
    if (allowed && allowed.length && allowed.indexOf(cakeState.size) < 0) cakeState.size = allowed[0];
    initCakeConfig(); updateCakePreview();
  }
  function selectSize(id) { cakeState.size = id; initCakeConfig(); updateCakePreview(); }

  function updateCakePreview() {
    var tipo = cakeTypes.find(function (t) { return t.id === cakeState.tipo; });
    cakeState.msg = ((document.getElementById("cake-msg") || {}).value || "").trim();
    cakeState.date = (document.getElementById("cake-date") || {}).value || "";
    cakeState.time = ((document.getElementById("cake-time") || {}).value || "").trim();
    cakeState.notes = ((document.getElementById("cake-notes") || {}).value || "").trim();
    cakeState.candles = !!(document.getElementById("cake-candles") || {}).checked;
    function set(id, v) { var e = document.getElementById(id); if (e) e.textContent = v; }
    set("sum-tipo", tipo ? tipo.label : "—");
    set("sum-size", (cakeSizes.find(function (s) { return s.id === cakeState.size; }) || {}).label || "—");
    set("sum-msg", cakeState.msg || "—");
    set("sum-candles", cakeState.candles ? "Sí" : "No");
    set("sum-date", (cakeState.date || "—") + (cakeState.time ? " · " + cakeState.time : ""));
    set("sum-price", tipo && tipo.priceHint ? tipo.priceHint : "Presupuesto pendiente de confirmar");
    var hp = document.getElementById("hybrid-photo");
    if (hp) {
      if (tipo && tipo.photo) { hp.src = tipo.photo; hp.style.display = "block"; hp.alt = tipo.label + " — foto real"; }
      else { hp.src = PHOTO.pasteleria || PHOTO.choco; hp.alt = "Referencia visual orientativa del obrador"; }
    }
    if (window.Cake3D) {
      try {
        window.Cake3D.updateConfig3D({ tipo: cakeState.tipo, size: cakeState.size, frost: tipo ? tipo.frost : null, msg: cakeState.msg, candles: cakeState.candles });
      } catch (e) {}
    }
  }

  function ensureThreeThenInit() {
    if (!window.Cake3D) return;
    var tipo = cakeTypes.find(function (t) { return t.id === cakeState.tipo; });
    window.Cake3D.initConfig3D({ tipo: cakeState.tipo, size: cakeState.size, frost: tipo ? tipo.frost : null, msg: cakeState.msg, candles: cakeState.candles });
  }
  function open3DViewer(product) { closeModal(); if (window.Cake3D) window.Cake3D.openProduct3D(product); }
  function close3DModal(e) {
    if (e && e.target !== document.getElementById("modal-3d-overlay") && e.type === "click") return;
    if (window.Cake3D) window.Cake3D.closeProduct3D();
  }
  function resetCakeConfig() {
    cakeState = { tipo: "matilda", size: "m", msg: "", date: "", time: "", notes: "", candles: false };
    ["cake-msg", "cake-date", "cake-time", "cake-notes"].forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ""; });
    var c = document.getElementById("cake-candles"); if (c) c.checked = false;
    initCakeConfig(); setTimeout(function () { ensureThreeThenInit(); }, 80);
  }
  function clearOrderForm() {
    ["order-name", "order-phone", "order-date", "order-time", "order-notes"].forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ""; });
    var q = document.getElementById("order-qty"); if (q) q.value = "1";
  }
  function startOrderFromProduct(p) {
    orderState = { productId: p.id, mode: "catalog" }; clearOrderForm(); showPage("contacto");
    setTimeout(function () {
      var n = document.getElementById("order-product-name");
      if (n) n.textContent = p.name + " · " + (p.price === "0,00€" || p.price === "0€" || !p.price ? "Consultar precio" : p.price);
      var i = document.getElementById("order-product-img");
      if (i) { if (p.img) { i.src = p.img; i.style.display = "block"; } else i.style.display = "none"; }
      document.getElementById("order-form-block").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
  function startOrderFromConfig() {
    cakeState.msg = ((document.getElementById("cake-msg") || {}).value || "").trim();
    cakeState.date = (document.getElementById("cake-date") || {}).value || "";
    cakeState.time = ((document.getElementById("cake-time") || {}).value || "").trim();
    cakeState.notes = ((document.getElementById("cake-notes") || {}).value || "").trim();
    cakeState.candles = !!(document.getElementById("cake-candles") || {}).checked;
    orderState = { productId: null, mode: "config" }; clearOrderForm();
    var tipo = cakeTypes.find(function (t) { return t.id === cakeState.tipo; });
    var size = cakeSizes.find(function (s) { return s.id === cakeState.size; });
    showPage("contacto");
    setTimeout(function () {
      var n = document.getElementById("order-product-name");
      if (n) n.textContent = (tipo ? tipo.label : "Tarta") + " · " + (size ? size.label : "") + " · " + (tipo && tipo.priceHint ? tipo.priceHint : "Presupuesto pendiente de confirmar");
      var i = document.getElementById("order-product-img");
      if (i) { if (tipo && tipo.photo) { i.src = tipo.photo; i.style.display = "block"; } else { i.src = PHOTO.pasteleria || PHOTO.choco; i.style.display = "block"; } }
      var od = document.getElementById("order-date"); if (od && cakeState.date) od.value = cakeState.date;
      var ot = document.getElementById("order-time"); if (ot && cakeState.time) ot.value = cakeState.time;
      var on = document.getElementById("order-notes"); if (on && cakeState.notes) on.value = cakeState.notes;
      document.getElementById("order-form-block").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
  function buildOrderMessage() {
    var name = ((document.getElementById("order-name") || {}).value || "").trim();
    var phone = ((document.getElementById("order-phone") || {}).value || "").trim();
    var qty = ((document.getElementById("order-qty") || {}).value || "1").trim();
    var date = ((document.getElementById("order-date") || {}).value || "").trim();
    var time = ((document.getElementById("order-time") || {}).value || "").trim();
    var notes = ((document.getElementById("order-notes") || {}).value || "").trim();
    var productLabel = ((document.getElementById("order-product-name") || {}).textContent || "—").trim();
    var lines = ["SOLICITUD DE ENCARGO — DULCE GLORIA", "", "DATOS DEL CLIENTE", "Nombre: " + (name || "—"), "Teléfono: " + (phone || "—"), "", "PRODUCTO", "Detalle: " + productLabel, "Cantidad: " + qty];
    if (orderState.mode === "config") {
      var tipo = cakeTypes.find(function (t) { return t.id === cakeState.tipo; });
      var size = cakeSizes.find(function (s) { return s.id === cakeState.size; });
      lines.push("Tarta: " + (tipo ? tipo.label : "—"));
      lines.push("Tamaño: " + (size ? size.label + " (" + size.people + " pers.)" : "—"));
      lines.push("Mensaje: " + (cakeState.msg || "—"));
      lines.push("Velas: " + (cakeState.candles ? "Sí (a confirmar)" : "No"));
    }
    lines.push("", "RECOGIDA", "Fecha preferida: " + (date || "—"), "Hora preferida: " + (time || "—"), "", "PRECIO", "Pendiente de confirmar por Dulce Gloria.", "");
    if (notes) { lines.push("OBSERVACIONES"); lines.push(notes); lines.push(""); }
    lines.push("IMPORTANTE:", "Esta es una solicitud de encargo. El pedido queda pendiente de confirmación por Dulce Gloria.", "No implica reserva ni pago hasta confirmación.", "", "Tel: +34 652 02 06 42", "Av. de Emilio Lemos, 26 — Sevilla Este");
    var imgEl = document.getElementById("order-product-img");
    if (imgEl && imgEl.src && imgEl.style.display !== "none") { lines.push("", "IMAGEN DE REFERENCIA:", imgEl.src); }
    return lines.join("\n");
  }
  function validateOrder() {
    var name = ((document.getElementById("order-name") || {}).value || "").trim();
    var phone = ((document.getElementById("order-phone") || {}).value || "").replace(/\s/g, "");
    var date = ((document.getElementById("order-date") || {}).value || "").trim();
    var time = ((document.getElementById("order-time") || {}).value || "").trim();
    var qty = parseInt(((document.getElementById("order-qty") || {}).value || "1"), 10);
    if (!name || name.length < 2) { alert("Introduce tu nombre completo."); return false; }
    if (!phone || phone.length < 9 || !/^\+?\d{9,15}$/.test(phone)) { alert("Introduce un teléfono válido (mín. 9 dígitos)."); return false; }
    if (!date) { alert("Selecciona una fecha de recogida."); return false; }
    var now = new Date();
    var today = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
    if (date < today) { alert("La fecha de recogida debe ser hoy o posterior."); return false; }
    if (!time) { alert("Selecciona una hora de recogida."); return false; }
    if (!qty || qty < 1) { alert("La cantidad debe ser al menos 1."); return false; }
    return true;
  }
  function submitOrderWhatsApp() {
    if (!validateOrder()) return;
    var text = buildOrderMessage();
    var box = document.getElementById("order-summary-text");
    if (box) { box.textContent = text; box.style.whiteSpace = "pre-wrap"; }
    var wa = document.getElementById("wa-order-link");
    if (wa) { wa.href = "https://wa.me/34652020642?text=" + encodeURIComponent(text); wa.rel = "noopener noreferrer"; }
    document.getElementById("order-summary-modal").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeOrderSummary(e) {
    if (e && e.target !== document.getElementById("order-summary-modal") && e.type === "click") return;
    document.getElementById("order-summary-modal").classList.remove("open");
    document.body.style.overflow = "";
  }
  function copyOrderSummary() {
    navigator.clipboard.writeText(buildOrderMessage()).then(function () { alert("Copiado al portapapeles"); }).catch(function () { prompt("Copia el texto:", buildOrderMessage()); });
  }
  window.showPage = showPage; window.filterProducts = filterProducts; window.searchProducts = searchProducts;
  window.openProduct = openProduct; window.closeModal = closeModal; window.selectTipo = selectTipo; window.selectSize = selectSize;
  window.updateCakePreview = updateCakePreview; window.resetCakeConfig = resetCakeConfig;
  window.startOrderFromConfig = startOrderFromConfig; window.startOrderFromProduct = startOrderFromProduct;
  window.submitOrderWhatsApp = submitOrderWhatsApp; window.closeOrderSummary = closeOrderSummary; window.copyOrderSummary = copyOrderSummary;
  window.open3DViewer = open3DViewer; window.close3DModal = close3DModal; window.ensureThreeThenInit = ensureThreeThenInit;
  window.Cake3DResetCamera = function () { if (window.Cake3D) window.Cake3D.resetCamera(); };

  function renderFeaturedTartas() {
    var el = document.getElementById("featured-tartas"); if (!el) return; el.textContent = "";
    FEATURED_IDS.forEach(function (id) {
      var p = products.find(function (x) { return x.id === id; }); if (!p) return;
      var card = document.createElement("div"); card.className = "feat-card";
      var wrap = document.createElement("div"); wrap.className = "img-wrap";
      if (p.img) { var im = document.createElement("img"); im.src = p.img; im.alt = p.name; im.loading = "lazy"; wrap.appendChild(im); }
      else { var ph = document.createElement("div"); ph.className = "ph"; ph.textContent = "Fotografía próximamente"; wrap.appendChild(ph); }
      var body = document.createElement("div"); body.className = "body";
      var h = document.createElement("h3"); h.className = "serif"; h.textContent = p.name;
      var price = document.createElement("div"); price.className = "price";
      price.textContent = p.price === "0,00€" || p.price === "0€" || !p.price ? "Consultar precio" : p.price;
      var actions = document.createElement("div"); actions.className = "feat-actions";
      var b1 = document.createElement("button"); b1.type = "button"; b1.className = "btn-card"; b1.textContent = "Ver detalles"; b1.onclick = function () { openProduct(p.id); };
      var b2 = document.createElement("button"); b2.type = "button"; b2.className = "btn-card primary"; b2.textContent = "Solicitar"; b2.onclick = function () { startOrderFromProduct(p); };
      actions.appendChild(b1); actions.appendChild(b2);
      body.appendChild(h); body.appendChild(price); body.appendChild(actions);
      card.appendChild(wrap); card.appendChild(body); el.appendChild(card);
    });
  }
  function renderTartasPage() {
    var list = products.filter(function (p) { return ["Tartas", "Cakes", "Colección Signature", "Cheesecakes"].indexOf(p.cat) >= 0; });
    renderProducts(list, "tartas-products");
    var fil = document.getElementById("tartas-filters"); if (!fil) return; fil.textContent = "";
    ["Todas", "Tartas", "Cakes", "Colección Signature", "Cheesecakes"].forEach(function (c) {
      var b = document.createElement("button"); b.className = "filter-btn" + (c === "Todas" ? " active" : ""); b.textContent = c;
      b.onclick = function () {
        fil.querySelectorAll(".filter-btn").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        var sub = c === "Todas" ? list : list.filter(function (p) { return p.cat === c; });
        renderProducts(sub, "tartas-products");
      };
      fil.appendChild(b);
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    applyProductPhotos(); renderFilters(); renderProducts(products, "all-products");
    renderFeaturedTartas(); renderTartasPage(); initCakeConfig();
    var now = new Date();
    var t = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
    ["order-date", "cake-date"].forEach(function (id) { var el = document.getElementById(id); if (el) el.setAttribute("min", t); });
  });
})();
