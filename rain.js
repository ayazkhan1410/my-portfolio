/* Neon Rain slow-motion background */
const canvas = document.createElement('canvas');
canvas.id = 'rainCanvas';
canvas.style.position = 'fixed';
canvas.style.inset = '0';
canvas.style.zIndex = '-1';
canvas.style.background = 'transparent';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

addEventListener('resize', () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});

const drops = [];
const cols = 100; // More drops
const speed = 2.5; // Slightly faster for better visibility

for (let i = 0; i < cols; i++) {
  drops.push({
    x: Math.random() * w,
    y: Math.random() * h - h,
    len: Math.random() * 20 + 10,
    opacity: Math.random() * 0.6 + 0.4,
    speed: Math.random() * speed + speed * 0.5,
    color: Math.random() > 0.5 ? '#00ff9d' : '#00e5ff'
  });
}

function draw() {
  ctx.fillStyle = 'rgba(3,3,7,0.08)';
  ctx.fillRect(0, 0, w, h);
  drops.forEach(d => {
    const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.len);
    grad.addColorStop(0, d.color + '00');
    grad.addColorStop(1, d.color + Math.floor(d.opacity * 255).toString(16).padStart(2, '0'));
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x, d.y + d.len);
    ctx.stroke();

    d.y += d.speed;
    if (d.y > h) {
      d.y = -d.len;
      d.x = Math.random() * w;
    }
  });
  requestAnimationFrame(draw);
}
draw();