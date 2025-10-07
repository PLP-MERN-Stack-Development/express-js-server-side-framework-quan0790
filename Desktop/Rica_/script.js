/* script.js - mobile nav, modal, scroll reveal, whatsapp integration */
document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const mobileMenu = document.querySelector('.mobile-menu');
  if(burger){
    burger.addEventListener('click', ()=>{
      mobileMenu.classList.toggle('hidden');
      burger.classList.toggle('open');
    });
  }
  // Modal reservation (contact page)
  const reserveModal = document.getElementById('reserveModal');
  const openReserveBtns = document.querySelectorAll('.open-reserve');
  const closeReserve = document.getElementById('closeReserve');
  if(openReserveBtns.length){
    openReserveBtns.forEach(b => b.addEventListener('click', ()=> reserveModal.classList.add('show')));
  }
  if(closeReserve) closeReserve.addEventListener('click', ()=> reserveModal.classList.remove('show'));
  if(reserveModal) reserveModal.addEventListener('click',(e)=>{ if(e.target === reserveModal) reserveModal.classList.remove('show'); });
  // Form handlers - demo only
  document.querySelectorAll('form.reservation-form').forEach(form=>{
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const msgEl = form.querySelector('.msg');
      msgEl.textContent = 'Reservation received — we will contact you shortly.';
      msgEl.style.display = 'block';
      setTimeout(()=>{ msgEl.style.display='none'; form.reset(); }, 2500);
      if(reserveModal) reserveModal.classList.remove('show');
    });
  });
  // WhatsApp quick link
  const waButtons = document.querySelectorAll('.wa-link');
  const PHONE = '254700000000';
  waButtons.forEach(b => b.addEventListener('click', (e)=>{
    e.preventDefault();
    const msg = b.dataset.msg || 'Hi! I would like to enquire about a reservation.';
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  }));
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold:0.15});
  reveals.forEach(r=>obs.observe(r));
});
// script.js
document.addEventListener("DOMContentLoaded", () => {
  const reserveModal = document.getElementById("reserveModal");
  const openReserveBtns = document.querySelectorAll(".open-reserve");

  openReserveBtns.forEach(btn =>
    btn.addEventListener("click", () => {
      reserveModal.style.display = "flex"; // show modal
    })
  );

  // close modal when clicking outside or on close button
  reserveModal.addEventListener("click", e => {
    if (e.target === reserveModal) reserveModal.style.display = "none";
  });
});

  const reserveBtn = document.querySelector('.open-reserve');
  const modal = document.getElementById('reserveModal');
  const closeBtn = document.querySelector('.modal .close');

  // Open modal
  reserveBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close if clicked outside the modal content
  window.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Optional: handle form submission
  document.getElementById('reserveForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Reservation submitted!'); // Replace with real submission logic
    modal.style.display = 'none';
    e.target.reset();
  });
