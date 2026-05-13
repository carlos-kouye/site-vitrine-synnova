/* ════════════════════════════════════════════════
   SYNNOVA — script.js
   Partagé entre toutes les pages du site.
   1. MENU MOBILE
   2. NAVBAR SCROLL
   3. DARK / LIGHT MODE
   4. MACHINE À ÉCRIRE (accueil uniquement)
   5. REVEALS AU SCROLL
════════════════════════════════════════════════ */


// ── 1. MENU MOBILE ────────────────────────────

var hamburger  = document.getElementById('hamburger');
var menuMobile = document.getElementById('menuMobile');

if (hamburger && menuMobile) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('ouvert');
    menuMobile.classList.toggle('ouvert');
  });

  document.querySelectorAll('.lien-mobile').forEach(function (lien) {
    lien.addEventListener('click', function () {
      hamburger.classList.remove('ouvert');
      menuMobile.classList.remove('ouvert');
    });
  });
}


// ── 2. NAVBAR SCROLL ──────────────────────────

var navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('defilée', window.scrollY > 40);
  });
}


// ── 3. DARK / LIGHT MODE ──────────────────────

var boutonTheme = document.getElementById('boutonTheme');
var iconeTheme  = document.getElementById('iconeTheme');
var html        = document.documentElement;

function mettreAjourIcone(theme) {
  if (!iconeTheme) return;
  if (theme === 'dark') {
    iconeTheme.classList.remove('fa-moon');
    iconeTheme.classList.add('fa-sun');
  } else {
    iconeTheme.classList.remove('fa-sun');
    iconeTheme.classList.add('fa-moon');
  }
}

// Appliquer thème sauvegardé, sinon rester en dark
var themeSave = localStorage.getItem('theme-synnova');
if (themeSave) {
  html.setAttribute('data-theme', themeSave);
  mettreAjourIcone(themeSave);
} else {
  mettreAjourIcone('dark');
}

if (boutonTheme) {
  boutonTheme.addEventListener('click', function () {
    var actuel  = html.getAttribute('data-theme');
    var nouveau = actuel === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', nouveau);
    localStorage.setItem('theme-synnova', nouveau);
    mettreAjourIcone(nouveau);
  });
}


// ── 4. MACHINE À ÉCRIRE (accueil uniquement) ──

var elementNom = document.getElementById('texteMachine');

if (elementNom) {
  var nomComplet   = 'Synnova Belvine Kybarance TOCLOE';
  var indexLettre  = 0;
  var modeEcriture = true;
  var enPause      = false;

  function machineAEcrire() {
    if (enPause) return;

    if (modeEcriture) {
      if (indexLettre < nomComplet.length) {
        elementNom.textContent += nomComplet.charAt(indexLettre);
        indexLettre++;
        setTimeout(machineAEcrire, 65);
      } else {
        enPause = true;
        setTimeout(function () {
          enPause = false;
          modeEcriture = false;
          machineAEcrire();
        }, 2800);
      }
    } else {
      if (elementNom.textContent.length > 0) {
        elementNom.textContent = elementNom.textContent.slice(0, -1);
        setTimeout(machineAEcrire, 38);
      } else {
        indexLettre = 0;
        enPause = true;
        setTimeout(function () {
          enPause = false;
          modeEcriture = true;
          machineAEcrire();
        }, 600);
      }
    }
  }

  setTimeout(machineAEcrire, 400);
}


// ── 5. REVEALS AU SCROLL ──────────────────────
// IntersectionObserver uniquement — fiable sur toutes les pages.
// unobserve après apparition : l'élément ne disparaît plus.

var elementsReveal = document.querySelectorAll('.reveal');

if (elementsReveal.length > 0) {
  var observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.12 });

  elementsReveal.forEach(function (el) {
    observateur.observe(el);
  });
}
