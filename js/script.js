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


// ── UNIVERS — ONGLETS INTERACTIFS ─────────────
// Données images par univers

var donneesUnivers = {
  animation: {
    grande: 'images/photo-1.jpg',
    petites: ['images/photo-2.jpg', 'images/photo-3.jpg', 'images/photo-4.jpg', 'images/photo-5.jpg']
  },
  communication: {
    grande: 'images/photo-2.jpg',
    petites: ['images/photo-3.jpg', 'images/photo-4.jpg', 'images/photo-5.jpg', 'images/photo-1.jpg']
  },
  cinema: {
    grande: 'images/photo-3.jpg',
    petites: ['images/photo-4.jpg', 'images/photo-5.jpg', 'images/photo-1.jpg', 'images/photo-2.jpg']
  },
  entrepreneuriat: {
    grande: 'images/photo-4.jpg',
    petites: ['images/photo-5.jpg', 'images/photo-1.jpg', 'images/photo-2.jpg', 'images/photo-3.jpg']
  }
};

var onglets       = document.querySelectorAll('.onglet');
var grandeImage   = document.getElementById('grandeImage');
var petitesImages = document.querySelectorAll('.petite-image img');
var blocsDesc     = document.querySelectorAll('.desc-bloc');

if (onglets.length > 0) {

  onglets.forEach(function (onglet) {
    onglet.addEventListener('click', function () {
      var univers = onglet.getAttribute('data-univers');

      // Mettre à jour onglet actif
      onglets.forEach(function (o) { o.classList.remove('actif'); });
      onglet.classList.add('actif');

      // Mettre à jour description
      blocsDesc.forEach(function (bloc) { bloc.classList.remove('actif'); });
      var descCible = document.querySelector('.desc-bloc[data-desc="' + univers + '"]');
      if (descCible) descCible.classList.add('actif');

      // Transition fluide des images
      var data = donneesUnivers[univers];
      if (!data) return;

      // Grande image — fade out puis swap
      if (grandeImage) {
        grandeImage.classList.add('en-transition');
        setTimeout(function () {
          grandeImage.src = data.grande;
          grandeImage.classList.remove('en-transition');
        }, 400);
      }

      // Petites images — fade out puis swap
      petitesImages.forEach(function (img, i) {
        img.classList.add('en-transition');
        setTimeout(function () {
          img.src = data.petites[i] || data.grande;
          img.classList.remove('en-transition');
        }, 400);
      });

    });
  });

}


// ── PORTFOLIO — FILTRES ────────────────────────

var filtres   = document.querySelectorAll('.filtre');
var zones     = document.querySelectorAll('.zone-filtre');

if (filtres.length > 0) {
  filtres.forEach(function (filtre) {
    filtre.addEventListener('click', function () {
      var cible = filtre.getAttribute('data-filtre');

      // Mettre à jour filtre actif
      filtres.forEach(function (f) { f.classList.remove('actif'); });
      filtre.classList.add('actif');

      // Afficher la bonne zone
      zones.forEach(function (zone) {
        zone.classList.remove('actif');
        if (zone.getAttribute('data-zone') === cible) {
          zone.classList.add('actif');
        }
      });
    });
  });
}


// ── CONTACT — FAQ ACCORDÉON ────────────────────

var faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var estOuvert = item.classList.contains('ouvert');

      // Fermer tous les autres
      faqItems.forEach(function (i) { i.classList.remove('ouvert'); });

      // Ouvrir celui cliqué si ce n'était pas déjà ouvert
      if (!estOuvert) {
        item.classList.add('ouvert');
        question.setAttribute('aria-expanded', 'true');
      } else {
        question.setAttribute('aria-expanded', 'false');
      }
    });
  });
}


// ── CONTACT — VALIDATION FORMULAIRE ───────────

var formulaire = document.getElementById('formulaireContact');

if (formulaire) {

  // Compteur de caractères du message
  var textarea        = document.getElementById('message');
  var compteur        = document.getElementById('compteurCaracteres');
  var limiteCaracteres = 1000;

  if (textarea && compteur) {
    textarea.addEventListener('input', function () {
      var nb = textarea.value.length;
      compteur.textContent = nb;
      if (nb > limiteCaracteres) {
        textarea.value = textarea.value.slice(0, limiteCaracteres);
        compteur.textContent = limiteCaracteres;
      }
    });
  }

  // Validation en temps réel
  function validerChamp(champ, erreurId, condition, message) {
    var erreur = document.getElementById(erreurId);
    if (!champ || !erreur) return true;
    if (!condition) {
      champ.classList.add('invalide');
      champ.classList.remove('valide');
      erreur.textContent = message;
      return false;
    }
    champ.classList.remove('invalide');
    champ.classList.add('valide');
    erreur.textContent = '';
    return true;
  }

  // Validation à la soumission
  formulaire.addEventListener('submit', function (e) {
    e.preventDefault();

    var nom     = document.getElementById('nom');
    var email   = document.getElementById('email');
    var sujet   = document.getElementById('sujet');
    var message = document.getElementById('message');

    var nomOk     = validerChamp(nom,     'erreur-nom',     nom.value.trim().length >= 2,                          'Veuillez entrer votre nom complet.');
    var emailOk   = validerChamp(email,   'erreur-email',   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Adresse email invalide.');
    var sujetOk   = validerChamp(sujet,   'erreur-sujet',   sujet.value !== '',                                    'Veuillez choisir un sujet.');
    var messageOk = validerChamp(message, 'erreur-message',  message.value.trim().length >= 10,                    'Le message doit contenir au moins 10 caractères.');

    if (nomOk && emailOk && sujetOk && messageOk) {
      // Tout est valide — soumettre le formulaire
      var bouton = document.getElementById('boutonEnvoyer');
      if (bouton) {
        bouton.disabled = true;
        bouton.querySelector('.bouton-texte').textContent = 'Envoi en cours...';
      }
      formulaire.submit();
    }
  });

  // Validation au blur (quand on quitte un champ)
  var champNom     = document.getElementById('nom');
  var champEmail   = document.getElementById('email');
  var champSujet   = document.getElementById('sujet');
  var champMessage = document.getElementById('message');

  if (champNom) {
    champNom.addEventListener('blur', function () {
      validerChamp(champNom, 'erreur-nom', champNom.value.trim().length >= 2, 'Veuillez entrer votre nom complet.');
    });
  }
  if (champEmail) {
    champEmail.addEventListener('blur', function () {
      validerChamp(champEmail, 'erreur-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(champEmail.value.trim()), 'Adresse email invalide.');
    });
  }
  if (champSujet) {
    champSujet.addEventListener('blur', function () {
      validerChamp(champSujet, 'erreur-sujet', champSujet.value !== '', 'Veuillez choisir un sujet.');
    });
  }
  if (champMessage) {
    champMessage.addEventListener('blur', function () {
      validerChamp(champMessage, 'erreur-message', champMessage.value.trim().length >= 10, 'Le message doit contenir au moins 10 caractères.');
    });
  }

}


// ── CONTACT — FAQ ACCORDÉON ────────────────────

var faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var estOuvert = item.classList.contains('ouvert');

      // Fermer tous les autres
      faqItems.forEach(function (el) {
        el.classList.remove('ouvert');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Ouvrir celui cliqué si pas déjà ouvert
      if (!estOuvert) {
        item.classList.add('ouvert');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}


// ── CONTACT — VALIDATION FORMULAIRE ───────────

var formulaire = document.getElementById('formulaireContact');

if (formulaire) {

  // Compteur de caractères message
  var textarea    = document.getElementById('message');
  var compteur    = document.getElementById('compteurCaracteres');
  var maxCaract   = 1000;

  if (textarea && compteur) {
    textarea.addEventListener('input', function () {
      var longueur = textarea.value.length;
      compteur.textContent = longueur;
      if (longueur > maxCaract) {
        textarea.value = textarea.value.substring(0, maxCaract);
        compteur.textContent = maxCaract;
      }
    });
  }

  // Validation champ par champ
  function validerChamp(champ) {
    var erreur = document.getElementById('erreur-' + champ.id);
    var valeur = champ.value.trim();
    var ok = true;
    var message = '';

    if (champ.required && valeur === '') {
      ok = false;
      message = 'Ce champ est obligatoire.';
    } else if (champ.type === 'email' && valeur !== '') {
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(valeur)) { ok = false; message = 'Adresse email invalide.'; }
    } else if (champ.id === 'message' && valeur.length < 10) {
      ok = false; message = 'Votre message est trop court (min. 10 caractères).';
    }

    champ.classList.toggle('invalide', !ok);
    champ.classList.toggle('valide', ok && valeur !== '');
    if (erreur) erreur.textContent = message;
    return ok;
  }

  // Valider au blur
  ['nom', 'email', 'sujet', 'message'].forEach(function (id) {
    var champ = document.getElementById(id);
    if (champ) {
      champ.addEventListener('blur', function () { validerChamp(champ); });
      champ.addEventListener('input', function () {
        if (champ.classList.contains('invalide')) validerChamp(champ);
      });
    }
  });

  // Soumission
  formulaire.addEventListener('submit', function (e) {
    var champIds = ['nom', 'email', 'sujet', 'message'];
    var toutValide = true;

    champIds.forEach(function (id) {
      var champ = document.getElementById(id);
      if (champ && !validerChamp(champ)) toutValide = false;
    });

    if (!toutValide) {
      e.preventDefault();
      // Scroller vers la première erreur
      var premierInvalide = formulaire.querySelector('.invalide');
      if (premierInvalide) {
        premierInvalide.scrollIntoView({ behavior: 'smooth', block: 'center' });
        premierInvalide.focus();
      }
    } else {
      // Désactiver le bouton pendant l'envoi
      var bouton = document.getElementById('boutonEnvoyer');
      if (bouton) {
        bouton.disabled = true;
        bouton.querySelector('.bouton-texte').textContent = 'Envoi en cours...';
      }
    }
  });
}

/* ════════════════════════════════════════════════
   CONTACT — ENVOI EMAILJS
════════════════════════════════════════════════ */

(function() {
  const form = document.getElementById('formulaireContact');
  if (!form) return;

  const SERVICE_ID = 'service_8lceohj';
  const TEMPLATE_ID = 'template_7ozgy7g';

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('nom')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const sujetSelect = document.getElementById('sujet');
    const sujet = sujetSelect?.options[sujetSelect.selectedIndex]?.text || '';
    const message = document.getElementById('message')?.value.trim();

    if (!nom || !email || !sujet || !message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const bouton = document.getElementById('boutonEnvoyer');
    const originalText = bouton?.querySelector('.bouton-texte')?.innerHTML || 'Envoyer';
    if (bouton) {
      bouton.disabled = true;
      const span = bouton.querySelector('.bouton-texte');
      if (span) span.innerHTML = 'Envoi en cours...';
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: nom,
      from_email: email,
      subject: sujet,
      message: message,
      to_name: 'Synnova'
    }).then(() => {
      window.location.href = 'confirmation.html?success=1';
    }).catch((error) => {
      console.error(error);
      if (bouton) {
        bouton.disabled = false;
        const span = bouton.querySelector('.bouton-texte');
        if (span) span.innerHTML = originalText;
      }
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    });
  });
})();