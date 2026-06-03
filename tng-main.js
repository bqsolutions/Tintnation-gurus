// ─── EMAILJS CONFIG ─────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

// ─── PAGE NAVIGATION ─────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mobile-menu button').forEach(b => b.classList.remove('active'));

  document.getElementById('page-' + name).classList.add('active');

  const navBtn = document.getElementById('nav-' + name);
  if (navBtn) navBtn.classList.add('active');

  const mobBtn = document.getElementById('mob-' + name);
  if (mobBtn) mobBtn.classList.add('active');

  closeMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── HAMBURGER ───────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ─── FAQ TOGGLE ──────────────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── CONTACT FORM ────────────────────────────────────────────
async function handleContactSubmit(e) {
  e.preventDefault();

  const form       = e.target;
  const submitBtn  = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('contact-success');

  const templateParams = {
    from_name: form.first_name.value + ' ' + form.last_name.value,
    phone:     form.phone.value,
    email:     form.email.value,
    vehicle:   form.vehicle?.value   || 'Not specified',
    service:   form.service?.value   || 'Not specified',
    message:   form.message?.value   || 'None',
  };

  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
    form.reset();
    submitBtn.style.display  = 'none';
    successMsg.style.display = 'block';
  } catch (err) {
    console.error('EmailJS error:', err);
    alert('Something went wrong. Call or text Malik directly at 919-270-0371.');
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Request ✦';
  }
}