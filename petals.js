// Rose petals drifting down behind the page content, like the falling
// petals on a painted invitation. Skipped entirely for reduced motion.
(() => {
  const canvas = document.getElementById("petals");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  // blush, rose, lavender, cream — the colors of the arrangements
  const COLORS = ["#e7aab4", "#f0c6cb", "#d98c9c", "#c7b1dc", "#b59ccf", "#f4e9dd", "#e9b9a4"];

  let w = 0, h = 0, petals = [];
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth;
    h = innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = w < 640 ? 28 : 46;
    while (petals.length < count) petals.push(spawn(true));
    petals.length = count;
  };

  const spawn = (anywhere) => ({
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : -20,
    size: 6 + Math.random() * 7,
    fall: 18 + Math.random() * 26,          // px per second
    sway: 20 + Math.random() * 30,          // px of side-to-side drift
    phase: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 1.6,      // radians per second
    angle: Math.random() * Math.PI * 2,
    color: COLORS[(Math.random() * COLORS.length) | 0],
  });

  const drawPetal = (p, t) => {
    const x = p.x + Math.sin(t * 0.6 + p.phase) * p.sway;
    ctx.save();
    ctx.translate(x, p.y);
    ctx.rotate(p.angle);
    // Tumbling: squash one axis so the petal seems to turn over as it falls.
    ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(t * 0.9 + p.phase)));
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.85;
    // faint edge so cream petals still show against pale clouds
    ctx.strokeStyle = "rgba(150, 110, 120, 0.25)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.7, p.size * 0.7, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.7, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  let last = performance.now();
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = now / 1000;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.fall * dt;
      p.angle += p.spin * dt;
      if (p.y > h + 20) petals[i] = spawn(false);
      drawPetal(p, t);
    }
    requestAnimationFrame(frame);
  };

  addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
