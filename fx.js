/* Neem Karoli Trip: light effects (WebGL). Loaded only when app.js decides the phone can handle it.
   - Night-sky glow behind the hero headline: slow aurora ribbons, liquid warping, a soft iridescent tint, and a light that follows the finger.
   - River light on the hero's river: flowing streaks and sparkles.
   - Soft pointer light on cards.
   Everything draws at low resolution, at 30 frames a second, and only while visible and not scrolling.
   If the phone cannot keep up, the effect removes itself and the page looks exactly as it did before.
   Switch off for yourself: localStorage "nkt-fx" = "off" (or open /?fx=off). */
(function () {
  "use strict";
  if (window.__nktFx) return;
  window.__nktFx = true;

  var root = document.documentElement;
  var hero = document.getElementById("hero");
  var scene = hero && hero.querySelector(".scene");
  var front = scene && scene.querySelector(".layer.front");
  var riverPath = front && front.querySelector("path.river");
  if (!hero) return;

  var forced = false;
  try { forced = localStorage.getItem("nkt-fx") === "force"; } catch (e) {}

  /* ---------- tiny WebGL helper ---------- */
  var VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  var HEAD = "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n" +
    "uniform vec2 uRes;uniform float uT;\n" +
    "float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\n" +
    "float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);" +
    "return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}\n" +
    "float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}\n";

  /* Sky: aurora ribbons, liquid warp, iridescent tint, pointer light. Output is premultiplied and mostly transparent. */
  var SKY = HEAD +
    "uniform vec2 uPtr;uniform float uPA;uniform vec3 uA;uniform vec3 uB;uniform vec3 uC;uniform float uK;uniform float uFade;\n" +
    "void main(){\n" +
    " vec2 uv=gl_FragCoord.xy/uRes;uv.y=1.-uv.y;\n" +
    " float asp=uRes.x/uRes.y;vec2 p=vec2(uv.x*asp,uv.y);float t=uT;\n" +
    " vec2 q=vec2(fbm(p*1.6+vec2(0.,t*.05)),fbm(p*1.6+vec2(5.2,1.3)-t*.04));\n" +
    " vec2 w=p+.55*(q-.5);\n" +
    " float rib=0.;\n" +
    " for(int i=0;i<3;i++){float fi=float(i);\n" +
    "  float y=.2+.13*fi+.07*sin(w.x*2.6+t*.18+fi*2.1)+.1*(q.x-.5);\n" +
    "  float d=w.y-y;\n" +
    "  rib+=exp(-d*d*(70.-fi*16.))*(.55+.45*sin(w.x*4.-t*.22+fi*1.7+q.y*5.));}\n" +
    " rib*=smoothstep(uFade+.02,uFade-.25,uv.y);\n" +
    " float ph=q.x*1.6+w.x*.5+t*.03;\n" +
    " vec3 irid=.5+.5*cos(6.2831*(vec3(0.,.33,.67)+ph));\n" +
    " vec3 base=mix(mix(uA,uB,smoothstep(0.,.6,fract(ph*.7))),uC,smoothstep(.55,1.,q.y));\n" +
    " vec3 col=mix(base,base*irid*1.3,.3);\n" +
    " float pl=.5+.5*sin(w.x*5.+t*.35+sin(w.y*6.-t*.3)*1.4)*sin(w.y*4.-t*.25);\n" +
    " float glow=rib*(.6+.4*pl);\n" +
    " vec2 pp=uPtr/uRes;float dp=length((uv-pp)*vec2(asp,1.));\n" +
    " float lt=exp(-dp*dp*16.)*uPA;\n" +
    " col=mix(col,vec3(1.,.84,.5),clamp(lt*1.2,0.,1.));glow+=lt*.55;\n" +
    " float a=clamp(glow*uK,0.,.45);\n" +
    " gl_FragColor=vec4(col*a,a);\n" +
    "}";

  /* River: bright streaks flowing along a curve we sample from the SVG river, plus sparkles. */
  var RIV = HEAD +
    "uniform float uRiv[16];uniform float uRvH;uniform vec3 uRC;uniform float uK;\n" +
    "float riverY(float x){float fx=clamp(x,0.,1.)*15.;float y=0.;\n" +
    " for(int i=0;i<16;i++){y+=uRiv[i]*max(0.,1.-abs(fx-float(i)));}return y;}\n" +
    "void main(){\n" +
    " vec2 uv=gl_FragCoord.xy/uRes;uv.y=1.-uv.y;float t=uT;\n" +
    " float ry=riverY(uv.x);\n" +
    " float dy=(uv.y-ry)*uRes.y;float hh=uRvH*uRes.y;\n" +
    " float band=exp(-(dy*dy)/(hh*hh*1.6));\n" +
    " float fl=noise(vec2(uv.x*uRes.x*.018-t*.9,dy*.12+3.))*.65+.35*noise(vec2(uv.x*uRes.x*.04-t*1.5,dy*.2));\n" +
    " float st=smoothstep(.4,.85,fl);\n" +
    " float sp=pow(noise(vec2(uv.x*uRes.x*.07-t*1.8,dy*.45)),9.)*1.6;\n" +
    " vec3 irid=.5+.5*cos(6.2831*(vec3(0.,.33,.67)+uv.x*1.3+t*.04));\n" +
    " vec3 c=mix(uRC,irid,.22);\n" +
    " float a=clamp(band*(.12+.7*st+sp)*uK,0.,.55);\n" +
    " gl_FragColor=vec4(c*a,a);\n" +
    "}";

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { if (window.console) console.warn("nkt fx shader", gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  function make(canvas, frag) {
    var gl = null;
    try {
      gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false,
        powerPreference: "low-power", failIfMajorPerformanceCaveat: !forced, preserveDrawingBuffer: false });
    } catch (e) {}
    if (!gl) return null;
    var vs = compile(gl, gl.VERTEX_SHADER, VERT), fs = compile(gl, gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return null;
    var pr = gl.createProgram();
    gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.DEPTH_TEST); gl.disable(gl.BLEND);
    var cache = {};
    return {
      gl: gl, canvas: canvas,
      u: function (n) { return cache[n] !== undefined ? cache[n] : (cache[n] = gl.getUniformLocation(pr, n)); },
      draw: function () { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3); }
    };
  }

  /* ---------- sky palettes: deep tones, so white headline text stays easy to read ---------- */
  var PAL = {
    night: { a: [.08, .5, .46], b: [.2, .3, .72], c: [.5, .26, .62], k: 1.0, r: [.78, .9, 1.0], rk: 1.0 },
    dusk:  { a: [.9, .5, .16], b: [.78, .26, .3], c: [.5, .26, .5], k: .7, r: [1.0, .78, .45], rk: 1.0 },
    dawn:  { a: [.9, .52, .5], b: [.6, .46, .74], c: [.88, .68, .46], k: .65, r: [1.0, .8, .7], rk: .9 },
    day:   { a: [.2, .5, .42], b: [.62, .58, .28], c: [.3, .52, .66], k: .5, r: [1.0, .96, .78], rk: .75 }
  };
  var cur = JSON.parse(JSON.stringify(PAL.night));
  function lerp(a, b, f) { return a + (b - a) * f; }
  function tweenPalette() {
    var tgt = PAL[hero.getAttribute("data-sky")] || PAL.dusk;
    ["a", "b", "c", "r"].forEach(function (k) { for (var i = 0; i < 3; i++) cur[k][i] = lerp(cur[k][i], tgt[k][i], .04); });
    cur.k = lerp(cur.k, tgt.k, .04); cur.rk = lerp(cur.rk, tgt.rk, .04);
  }

  /* ---------- canvases ---------- */
  var small = window.innerWidth < 600;
  var SC = small ? .5 : .6;
  var sky = document.createElement("canvas"); sky.className = "sky-gl"; sky.setAttribute("aria-hidden", "true");
  hero.insertBefore(sky, hero.firstChild);
  var S = make(sky, SKY);
  var river = null, R = null;
  if (S && scene && riverPath) {
    river = document.createElement("canvas"); river.className = "river-gl"; river.setAttribute("aria-hidden", "true");
    front.parentNode.insertBefore(river, front.nextSibling);
    R = make(river, RIV);
  }
  if (!S) { sky.remove(); if (river) river.remove(); return; }
  if (river && !R) { river.remove(); river = null; }

  function sizeOf(c, el, sc) {
    sc = sc || SC;
    var w = Math.max(1, Math.min(900, Math.round(el.clientWidth * sc))), h = Math.max(1, Math.round(el.clientHeight * sc));
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  }

  /* river curve: sample the real SVG river and convert to the canvas's own coordinates (0..1 from the top) */
  var riv = new Float32Array(16), rvH = .03;
  function sampleRiver() {
    if (!R) return;
    /* the SVG sits at the bottom-left of the scene; its layout size comes from CSS (the scene may be scaled while scrolling) */
    var W = scene.clientWidth, H = scene.clientHeight, cs = getComputedStyle(front);
    var sw = parseFloat(cs.width) || W, sh = parseFloat(cs.height) || H, sx = 0, sy = H - sh;
    if (!sw || !sh || !W || !H) return;
    var sc = Math.max(sw / 800, sh / 260), offX = sx + (sw - 800 * sc) / 2, offY = sy + sh - 260 * sc;
    var len = riverPath.getTotalLength(), pts = [], i;
    for (i = 0; i <= 60; i++) { var p = riverPath.getPointAtLength(len * i / 60); pts.push([offX + p.x * sc, offY + p.y * sc]); }
    for (i = 0; i < 16; i++) {
      var x = W * i / 15, y = pts[pts.length - 1][1], j;
      for (j = 1; j < pts.length; j++) {
        if (pts[j][0] >= x) { var a = pts[j - 1], b = pts[j], f = (x - a[0]) / Math.max(1e-6, b[0] - a[0]); y = a[1] + (b[1] - a[1]) * Math.min(1, Math.max(0, f)); break; }
      }
      riv[i] = y / H;
    }
    rvH = Math.max(.012, (7 * sc) / H);   /* a glow about as wide as the river stroke, a little softer */
  }

  /* the glow fades out where the hills (the scene) begin, so there is no hard edge */
  var fadeY = .6;
  function resize() { fadeY = scene ? Math.max(.25, Math.min(.95, scene.offsetTop / Math.max(1, hero.clientHeight))) : .6; sizeOf(sky, hero); S.gl.viewport(0, 0, sky.width, sky.height); if (R) { sizeOf(river, scene, Math.min(1, SC * (small ? 1.7 : 1.17))); R.gl.viewport(0, 0, river.width, river.height); sampleRiver(); } }
  resize();
  if (window.ResizeObserver) { var ro = new ResizeObserver(resize); ro.observe(hero); if (scene) ro.observe(scene); }
  else window.addEventListener("resize", resize);

  /* ---------- pointer light ---------- */
  var ptr = { x: -999, y: -999, a: 0, ta: 0 };
  function setPtr(e) { var r = hero.getBoundingClientRect(); ptr.x = (e.clientX - r.left) * SC; ptr.y = (e.clientY - r.top) * SC; ptr.ta = 1; }
  hero.addEventListener("pointermove", setPtr, { passive: true });
  hero.addEventListener("pointerdown", setPtr, { passive: true });
  hero.addEventListener("pointerleave", function () { ptr.ta = 0; });
  hero.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") setTimeout(function () { ptr.ta = 0; }, 900); });

  /* ---------- visibility, scrolling, the loop ---------- */
  var heroVis = true, sceneVis = true, scrolling = false, sTimer = 0;
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (es) { heroVis = es[es.length - 1].isIntersecting; }).observe(hero);
    if (scene) new IntersectionObserver(function (es) { sceneVis = es[es.length - 1].isIntersecting; }).observe(scene);
  }
  window.addEventListener("scroll", function () {
    scrolling = true; clearTimeout(sTimer); sTimer = setTimeout(function () { scrolling = false; }, 140);
  }, { passive: true });

  var dead = false, raf = 0, last = 0, t0 = 0, shown = false;
  var STEP = 1000 / 30, frames = 0, slow = 0, warm = 0, lastT = 0, probeDts = [];

  function kill() {
    if (dead) return; dead = true; cancelAnimationFrame(raf);
    root.classList.remove("fx-gl");
    [S, R].forEach(function (g) { if (g) { var x = g.gl.getExtension("WEBGL_lose_context"); if (x) x.loseContext(); g.canvas.remove(); } });
  }
  sky.addEventListener("webglcontextlost", function (e) { e.preventDefault(); kill(); });

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (dead || document.hidden) { lastT = 0; return; }
    if (now - last < STEP - 2) return;

    /* speed check, in small windows: if a window of frames is too slow, first lower the drawing resolution;
       after two slow windows in a row, remove the effect so the page is exactly as before. */
    if (lastT) {
      var dt = now - lastT;
      if (!forced && !scrolling && heroVis) {
        if (++warm > 4) probeDts.push(dt);
        if (probeDts.length >= 8) {
          probeDts.sort(function (a, b) { return a - b; });
          var med = probeDts[4];
          probeDts.length = 0;
          if (med > 52) {
            if (++slow >= 2) { kill(); return; }
            SC = Math.max(.3, SC * .7); resize();
          } else slow = 0;
        }
      }
    }
    lastT = now;
    if (scrolling || (!heroVis && !sceneVis)) return;
    last = now;

    if (!t0) t0 = now;
    var t = ((now - t0) / 1000) % 900;
    tweenPalette();
    ptr.a += (ptr.ta - ptr.a) * .12;

    if (heroVis) {
      var g = S.gl;
      g.uniform2f(S.u("uRes"), sky.width, sky.height); g.uniform1f(S.u("uT"), t);
      g.uniform2f(S.u("uPtr"), ptr.x, ptr.y); g.uniform1f(S.u("uPA"), ptr.a);
      g.uniform3fv(S.u("uA"), cur.a); g.uniform3fv(S.u("uB"), cur.b); g.uniform3fv(S.u("uC"), cur.c); g.uniform1f(S.u("uK"), cur.k); g.uniform1f(S.u("uFade"), fadeY);
      S.draw();
    }
    if (R && sceneVis) {
      var h = R.gl;
      h.uniform2f(R.u("uRes"), river.width, river.height); h.uniform1f(R.u("uT"), t);
      h.uniform1fv(R.u("uRiv"), riv); h.uniform1f(R.u("uRvH"), rvH);
      h.uniform3fv(R.u("uRC"), cur.r); h.uniform1f(R.u("uK"), cur.rk);
      R.draw();
    }
    if (!shown && ++frames >= 3) { shown = true; sky.classList.add("on"); if (river) river.classList.add("on"); }
  }
  raf = requestAnimationFrame(frame);
  root.classList.add("fx-gl");   /* switches on the CSS parts: card light, button and logo shine */

  /* ---------- soft pointer light on cards (CSS does the drawing) ---------- */
  var lit = [].slice.call(document.querySelectorAll(".stat, .route, .stay, .status"));
  lit.forEach(function (el) { el.classList.add("lit"); });
  var litRaf = 0, litEl = null, lx = 0, ly = 0;
  function paintLit() {
    litRaf = 0;
    if (!litEl) return;
    var r = litEl.getBoundingClientRect();
    litEl.style.setProperty("--lx", (lx - r.left).toFixed(0) + "px");
    litEl.style.setProperty("--ly", (ly - r.top).toFixed(0) + "px");
  }
  function clearLit() { if (litEl) { litEl.style.setProperty("--la", "0"); litEl = null; } }
  document.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest(".lit");
    if (!el) { clearLit(); return; }
    if (el !== litEl) { clearLit(); litEl = el; el.style.setProperty("--la", "1"); }
    lx = e.clientX; ly = e.clientY;
    if (!litRaf) litRaf = requestAnimationFrame(paintLit);
  }, { passive: true });
  document.addEventListener("pointerdown", function (e) {
    var el = e.target.closest && e.target.closest(".lit");
    if (!el) return;
    clearLit(); litEl = el; el.style.setProperty("--la", "1"); lx = e.clientX; ly = e.clientY; paintLit();
  }, { passive: true });
  document.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") setTimeout(clearLit, 700); }, { passive: true });
  document.addEventListener("pointerleave", clearLit);
  window.addEventListener("scroll", clearLit, { passive: true });
})();
