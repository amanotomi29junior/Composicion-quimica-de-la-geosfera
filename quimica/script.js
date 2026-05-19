// Minimal, dependency-free interactivity
document.addEventListener('DOMContentLoaded',function(){
  // SVG tooltip interactions
  const svg = document.getElementById('svg-earth');
  const tooltip = document.getElementById('tooltip');
  const clickables = svg ? svg.querySelectorAll('.clickable') : [];
  clickables.forEach(el=>{
    el.addEventListener('mouseenter', e=>{
      const name = el.dataset.name || 'Capa';
      const info = el.dataset.info || '';
      tooltip.innerHTML = `<strong>${name}</strong><br>${info}`;
      tooltip.style.opacity = 1;
    });
    el.addEventListener('mousemove', e=>{
      tooltip.style.left = (e.pageX + 14) + 'px';
      tooltip.style.top = (e.pageY - 28) + 'px';
    });
    el.addEventListener('mouseleave', e=>{
      tooltip.style.opacity = 0;
    });
    el.addEventListener('click', e=>{
      const name = el.dataset.name;
      const anchor = { 'Corteza':'#crust','Manto':'#mantle','Núcleo':'#core' }[name];
      if(anchor) document.querySelector(anchor).scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // Crust composition chart using Chart.js if available
  function drawCrustChart(){
    if(typeof Chart === 'undefined') return;
    const ctx = document.getElementById('crustChart').getContext('2d');
    new Chart(ctx,{
      type:'doughnut',
      data:{
        labels:['O','Si','Al','Fe','Ca','Na','K','Mg'],
        datasets:[{
          data:[46.6,27.72,8.13,5.00,3.63,2.83,2.70,2.09],
          backgroundColor:['#2ec4b6','#ffbe0b','#ff6b6b','#4d96ff','#8bd3ff','#d291ff','#ffd6a5','#caffbf'],
          borderWidth:0
        }]
      },
      options:{
        plugins:{legend:{position:'bottom',labels:{color:'#cfeff0'}}},
        maintainAspectRatio:false
      }
    });
  }
  drawCrustChart();

  // Download demo (could be hooked to server-side PDF generation)
  document.getElementById('downloadReport').addEventListener('click',function(e){
    e.preventDefault();
    alert('Generando PDF... (demo). Para versión profesional con diseño editorial, se requiere render server-side o InDesign export.');
  });
});