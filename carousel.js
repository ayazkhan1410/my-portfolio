/* Tech Carousel for Projects */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.className = 'tech-carousel';
  container.innerHTML = `
    <div class="carousel-track">
      <div class="carousel-item">Python</div>
      <div class="carousel-item">Django</div>
      <div class="carousel-item">Flask</div>
      <div class="carousel-item">DRF</div>
      <div class="carousel-item">REST API</div>
      <div class="carousel-item">PostgreSQL</div>
      <div class="carousel-item">Docker</div>
      <div class="carousel-item">Git</div>
      <div class="carousel-item">Linux</div>
      <div class="carousel-item">CI/CD</div>
      <!-- duplicate for seamless loop -->
      <div class="carousel-item">Python</div>
      <div class="carousel-item">Django</div>
      <div class="carousel-item">Flask</div>
      <div class="carousel-item">DRF</div>
      <div class="carousel-item">REST API</div>
      <div class="carousel-item">PostgreSQL</div>
      <div class="carousel-item">Docker</div>
      <div class="carousel-item">Git</div>
      <div class="carousel-item">Linux</div>
      <div class="carousel-item">CI/CD</div>
    </div>
  `;
  const projects = document.querySelector('#projects .container');
  if (projects) projects.prepend(container);

  const track = container.querySelector('.carousel-track');
  let pos = 0;
  const speed = 0.6; // slow motion
  function animate() {
    pos -= speed;
    if (Math.abs(pos) >= track.scrollWidth / 2) pos = 0;
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(animate);
  }
  animate();
});