const avatar = document.getElementById('avatar');
const photoUpload = document.getElementById('photoUpload');
const openBtn = document.getElementById('openTerms');
const modal = document.getElementById('termsModal');
const closeBtn = document.getElementById('closeModal');
const toast = document.getElementById('toast');

// Load saved photo
if (localStorage.getItem('patriciaFanCardPhoto'))
  avatar.src = localStorage.getItem('patriciaFanCardPhoto');

// Change photo
photoUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = ev => {
      avatar.src = ev.target.result;
      localStorage.setItem('patriciaFanCardPhoto', ev.target.result);

      toast.textContent = "Photo updated!";
      toast.classList.add('show');

      setTimeout(() => toast.classList.remove('show'), 2200);
    };
    reader.readAsDataURL(file);
  }
});

// Open / close modal
openBtn.addEventListener('click', () => modal.classList.add('show'));
closeBtn.addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});

// Confetti effect
avatar.addEventListener('click', () => {
  confetti({
    particleCount: 130,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00f5d4', '#fff', '#0a0a15']
  });
});

// Stats animation
document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const inc = target / 70;

  const timer = setInterval(() => {
    count += inc;

    if (count >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(count).toLocaleString();
    }
  }, 30);
});
