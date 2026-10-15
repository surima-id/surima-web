/* ==========================================================================
   SURIMA — Decorasi riichi (injector)
   A restrained decoration layer over the Sura & Baya world. Purely additive
   and non-destructive: it never edits existing copy or markup, only appends
   `aria-hidden` ornament.

   Kept: brass yaku nameplates, wind discs, a single horizontal 1000-point
   tenbou between chapters, drifting tiles on the hero bands, the home
   marquee, dice + dealer badges on CTAs, and quiet browser-surface theming.

   Tile faces are the public-domain FluffyStuff riichi set (CC0), served from
   assets/tiles/. The tenbou follows the real point-stick code: the 1,000 stick
   is a single red dot. Remove this script (and css/decor.css) to revert.
   ========================================================================== */
(function () {
  "use strict";

  if (document.body && document.body.classList.contains("decor-on")) return;

  /* ------------------------------ Tile faces ------------------------------ */

  var FILE = {
    "man-1": "man_1", "man-2": "man_2", "man-3": "man_3", "man-4": "man_4",
    "man-5": "man_5", "man-6": "man_6", "man-7": "man_7", "man-8": "man_8",
    "man-9": "man_9", "man-5-red": "man_5_red",
    "pin-1": "pin_1", "pin-2": "pin_2", "pin-3": "pin_3", "pin-4": "pin_4",
    "pin-5": "pin_5", "pin-6": "pin_6", "pin-7": "pin_7", "pin-8": "pin_8",
    "pin-9": "pin_9", "pin-5-red": "pin_5_red",
    "sou-1": "sou_1", "sou-2": "sou_2", "sou-3": "sou_3", "sou-4": "sou_4",
    "sou-5": "sou_5", "sou-6": "sou_6", "sou-7": "sou_7", "sou-8": "sou_8",
    "sou-9": "sou_9", "sou-5-red": "sou_5_red",
    "wind-e": "honor_E", "wind-s": "honor_S", "wind-w": "honor_W", "wind-n": "honor_N",
    "dragon-chun": "honor_C", "dragon-hatsu": "honor_F", "dragon-haku": "honor_blank",
    "back": "back"
  };
  var BASE = "assets/tiles/";
  var WINDS = { e: "\u6771", s: "\u5357", w: "\u897f", n: "\u5317" }; /* 東南西北 */

  function tileImg(id) {
    return '<img src="' + BASE + (FILE[id] || "back") + '.png" alt="" ' +
      'loading="lazy" decoding="async">';
  }

  function tile(id, width) {
    return '<span class="d-tile"' + (width ? ' style="--d-tw:' + width + 'px"' : "") +
      ">" + tileImg(id) + "</span>";
  }

  /* ------------------------------- Tenbou --------------------------------- */
  /* Real point-stick code, upright by default. k = black, r = red. */

  var TENBOU = {
    "100":   [["k", "k"], ["k", "k"], ["k", "k"], ["k", "k"]],
    "1000":  [["r"]],
    "5000":  [["r", "r"], ["r"], ["r", "r"]],
    "10000": [["k"], ["k"], ["r", "r"], ["r"], ["r", "r"], ["k"], ["k"]]
  };

  function tenbou(kind, flat) {
    var rows = TENBOU[kind] || TENBOU["1000"];
    var body = rows.map(function (row) {
      return '<span class="d-tb-line">' + row.map(function (c) {
        return '<i class="d-tb-dot ' + c + '"></i>';
      }).join("") + "</span>";
    }).join("");
    return '<span class="d-tenbou d-tenbou--' + kind +
      (flat ? " d-tenbou--flat" : "") + '" aria-hidden="true">' +
      '<span class="d-tb-stick">' + body + "</span></span>";
  }

  /* --------------------------- Section dressing --------------------------- */

  var YAKU = [
    ["\u7acb\u76f4", "Riichi"], ["\u65ad\u4e48\u4e5d", "Tanyao"],
    ["\u5f79\u724c", "Yakuhai"], ["\u5e73\u548c", "Pinfu"],
    ["\u9580\u524d\u6e05\u81ea\u6478\u548c", "Menzen Tsumo"], ["\u4e00\u6c17\u901a\u8cab", "Ittsu"],
    ["\u4e09\u8272\u540c\u9806", "Sanshoku"], ["\u5bfe\u3005\u548c", "Toitoi"],
    ["\u6df7\u4e00\u8272", "Honitsu"], ["\u6e05\u4e00\u8272", "Chinitsu"],
    ["\u4e03\u5bfe\u5b50", "Chiitoitsu"], ["\u56fd\u58eb\u7121\u53cc", "Kokushi"]
  ];
  var WIND_KEYS = ["e", "s", "w", "n"];

  function nameplate(i) {
    var y = YAKU[i % YAKU.length];
    return '<span class="d-nameplate"><span class="d-kanji">' + y[0] + "</span>" +
      "<small>" + y[1] + "</small></span>";
  }

  function windDisc(i) {
    var k = WIND_KEYS[i % WIND_KEYS.length];
    return '<span class="d-wind ' + k + ' d-kanji" aria-hidden="true">' +
      WINDS[k] + "</span>";
  }

  function decorateSections() {
    var sections = document.querySelectorAll("body > section");
    var idx = 0;
    sections.forEach(function (sec) {
      sec.classList.add("d-section");
      if (sec.classList.contains("page-hero")) {
        sec.classList.add("d-hero-decor");
      }
      if (sec.classList.contains("hero")) return; /* index hero: no corners */
      var tl = document.createElement("div");
      tl.className = "d-corner d-corner--tl";
      tl.setAttribute("aria-hidden", "true");
      tl.innerHTML = nameplate(idx);
      var tr = document.createElement("div");
      tr.className = "d-corner d-corner--tr";
      tr.setAttribute("aria-hidden", "true");
      tr.innerHTML = windDisc(idx);
      sec.insertBefore(tr, sec.firstChild);
      sec.insertBefore(tl, sec.firstChild);
      idx++;
    });
  }

  /* ------------------------------- Dividers ------------------------------- */
  /* A single 1,000-point stick, laid flat, between chapters. */

  function addDividers() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("body > section"));
    sections.forEach(function (sec, i) {
      if (i === 0) return;
      if (sec.classList.contains("hero")) return;
      var div = document.createElement("div");
      div.className = "d-divider";
      div.setAttribute("aria-hidden", "true");
      div.innerHTML =
        '<span class="d-rule"></span>' +
        tenbou("1000", true) +
        '<span class="d-rule"></span>';
      sec.parentNode.insertBefore(div, sec);
    });
  }

  /* ----------------------------- Floating tiles --------------------------- */

  function addFloats() {
    var spots = [
      { l: "-2%", t: "22%", rot: "-14deg", dx: "12px", dy: "-18px", dur: "11s", w: 40 },
      { l: "8%", t: "74%", rot: "10deg", dx: "-10px", dy: "-14px", dur: "9s", w: 30 },
      { l: "92%", t: "30%", rot: "13deg", dx: "-12px", dy: "-16px", dur: "10s", w: 38 },
      { l: "84%", t: "78%", rot: "-8deg", dx: "10px", dy: "-20px", dur: "12s", w: 28 },
      { l: "48%", t: "-4%", rot: "6deg", dx: "-8px", dy: "-10px", dur: "13s", w: 26 }
    ];
    var faces = ["man-3", "pin-5", "sou-7", "wind-s", "dragon-hatsu", "man-1"];
    ["hero", "page-hero"].forEach(function (cls) {
      document.querySelectorAll("." + cls).forEach(function (host) {
        spots.forEach(function (s, i) {
          var el = document.createElement("span");
          el.className = "d-float";
          el.setAttribute("aria-hidden", "true");
          el.style.cssText = "left:" + s.l + ";top:" + s.t + ";--dx:" + s.dx +
            ";--dy:" + s.dy + ";--dur:" + s.dur + ";--rot:" + s.rot;
          el.innerHTML = tile(faces[(i + 1) % faces.length], s.w);
          host.appendChild(el);
        });
      });
    });
  }

  /* ------------------------------- CTA dressing --------------------------- */

  var PIPS = {
    1: [[12, 12]],
    2: [[7, 7], [17, 17]],
    3: [[7, 7], [12, 12], [17, 17]],
    4: [[7, 7], [17, 7], [7, 17], [17, 17]],
    5: [[7, 7], [17, 7], [12, 12], [7, 17], [17, 17]],
    6: [[7, 6], [17, 6], [7, 12], [17, 12], [7, 18], [17, 18]]
  };
  function die(n) {
    var pips = (PIPS[n] || []).map(function (p) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.1" fill="#22302a"/>';
    }).join("");
    return '<span class="d-die" aria-hidden="true"><svg viewBox="0 0 24 24" ' +
      'aria-hidden="true" focusable="false"><rect x="1.2" y="1.2" width="21.6" ' +
      'height="21.6" rx="3.4" fill="#f4ead6" stroke="#22302a" stroke-width="2.4"/>' +
      pips + "</svg></span>";
  }

  function dressBanners() {
    document.querySelectorAll(".cta-banner").forEach(function (b) {
      if (b.classList.contains("d-cta-deco")) return;
      b.classList.add("d-cta-deco");
      var dice = document.createElement("span");
      dice.className = "d-dice";
      dice.setAttribute("aria-hidden", "true");
      dice.innerHTML = die(5) + die(2);
      b.appendChild(dice);
      var oya = document.createElement("span");
      oya.className = "d-oya";
      oya.setAttribute("aria-hidden", "true");
      oya.innerHTML = '<span class="d-kanji">\u89aa</span> Dealer';
      b.appendChild(oya);
    });
  }

  /* -------------------------------- Marquee ------------------------------- */

  var MARQUEE = [
    ["\u7acb\u76f4", "Riichi"], ["\u65ad\u4e48\u4e5d", "Tanyao"],
    ["\u5f79\u724c", "Yakuhai"], ["\u5e73\u548c", "Pinfu"],
    ["\u4e00\u6c17\u901a\u8cab", "Ittsu"], ["\u4e09\u8272\u540c\u9806", "Sanshoku"],
    ["\u4e03\u5bfe\u5b50", "Chiitoitsu"], ["\u56fd\u58eb\u7121\u53cc", "Kokushi"]
  ];

  function addMarquee() {
    var hero = document.querySelector("section.hero");
    if (!hero || document.querySelector(".d-marquee")) return;
    var hand = ["man-5", "pin-5", "sou-5", "wind-e", "dragon-chun"];
    var chunk = MARQUEE.map(function (y, i) {
      return tile(hand[i % hand.length]) +
        '<span class="d-word"><span class="d-kanji">' + y[0] + "</span>" + y[1] + "</span>" +
        '<span class="d-sep"></span>';
    }).join("");
    var bar = document.createElement("div");
    bar.className = "d-marquee";
    bar.setAttribute("aria-hidden", "true");
    bar.innerHTML = '<div class="d-marquee-track">' + chunk + chunk + "</div>";
    if (hero.nextSibling) hero.parentNode.insertBefore(bar, hero.nextSibling);
    else hero.parentNode.appendChild(bar);
  }

  /* --------------------------------- Init --------------------------------- */

  function init() {
    document.body.classList.add("decor-on");
    decorateSections();
    addDividers();
    addFloats();
    dressBanners();
    addMarquee();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
