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

document.addEventListener('DOMContentLoaded', function () {
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      var estOuvert = item.classList.contains('ouvert');

      // Fermer tous
      faqItems.forEach(function (el) {
        el.classList.remove('ouvert');
        var q = el.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Ouvrir si pas déjà ouvert
      if (!estOuvert) {
        item.classList.add('ouvert');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});


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


// ── CONFIRMATION — Affichage selon ?success= ──

var carteConfirmation = document.getElementById('carteConfirmation');

if (carteConfirmation) {
  var params  = new URLSearchParams(window.location.search);
  var success = params.get('success');

  if (success === '1') {
    carteConfirmation.innerHTML = `
      <div class="confirmation-icone succes"><i class="fa-solid fa-check"></i></div>
      <h1 class="confirmation-titre">Message envoyé !</h1>
      <p class="confirmation-texte">Votre message a bien été reçu.<br />Synnova vous répondra dans les plus brefs délais.</p>
      <div class="confirmation-boutons">
        <a href="index.html" class="bouton-principal-conf"><i class="fa-solid fa-house"></i> Retour à l'accueil</a>
        <a href="https://wa.me/229XXXXXXXX" target="_blank" rel="noopener" class="bouton-whatsapp-conf"><i class="fa-brands fa-whatsapp"></i> Continuer sur WhatsApp</a>
      </div>`;
  } else if (success === '0') {
    carteConfirmation.innerHTML = `
      <div class="confirmation-icone erreur"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <h1 class="confirmation-titre">Une erreur est survenue</h1>
      <p class="confirmation-texte">Votre message n'a pas pu être envoyé.<br />Veuillez réessayer ou me contacter directement.</p>
      <div class="confirmation-boutons">
        <a href="contact.html" class="bouton-principal-conf"><i class="fa-solid fa-arrow-left"></i> Retour au formulaire</a>
        <a href="https://wa.me/229XXXXXXXX" target="_blank" rel="noopener" class="bouton-whatsapp-conf"><i class="fa-brands fa-whatsapp"></i> Me contacter sur WhatsApp</a>
      </div>`;
  } else {
    carteConfirmation.innerHTML = `
      <div class="confirmation-icone succes"><i class="fa-solid fa-envelope"></i></div>
      <h1 class="confirmation-titre">Page de confirmation</h1>
      <p class="confirmation-texte">Cette page s'affiche après l'envoi d'un message.<br />Souhaitez-vous m'envoyer un message ?</p>
      <div class="confirmation-boutons">
        <a href="contact.html" class="bouton-principal-conf"><i class="fa-solid fa-paper-plane"></i> Accéder au formulaire</a>
        <a href="index.html" class="bouton-secondaire-conf"><i class="fa-solid fa-house"></i> Retour à l'accueil</a>
      </div>`;
  }
}


// ── CONFIRMATION — AFFICHAGE SELON URL ────────

document.addEventListener('DOMContentLoaded', function () {
  var carte = document.getElementById('carteConfirmation');
  if (!carte) return;

  var params = new URLSearchParams(window.location.search);
  var success = params.get('success');

  var html = '';

  if (success === '1') {
    html = '<div class="confirmation-icone succes"><i class="fa-solid fa-check"></i></div>'
      + '<h1 class="confirmation-titre">Message envoyé !</h1>'
      + '<p class="confirmation-texte">Votre message a bien été reçu.<br />Synnova vous répondra dans les plus brefs délais.</p>'
      + '<div class="confirmation-boutons">'
      + '<a href="index.html" class="bouton-principal-conf"><i class="fa-solid fa-house"></i> Retour à l\'accueil</a>'
      + '<a href="https://wa.me/229XXXXXXXX" target="_blank" rel="noopener" class="bouton-whatsapp-conf"><i class="fa-brands fa-whatsapp"></i> Continuer sur WhatsApp</a>'
      + '</div>';
  } else if (success === '0') {
    html = '<div class="confirmation-icone erreur"><i class="fa-solid fa-triangle-exclamation"></i></div>'
      + '<h1 class="confirmation-titre">Une erreur est survenue</h1>'
      + '<p class="confirmation-texte">Votre message n\'a pas pu être envoyé.<br />Veuillez réessayer ou me contacter directement.</p>'
      + '<div class="confirmation-boutons">'
      + '<a href="contact.html" class="bouton-principal-conf"><i class="fa-solid fa-arrow-left"></i> Retour au formulaire</a>'
      + '<a href="https://wa.me/229XXXXXXXX" target="_blank" rel="noopener" class="bouton-whatsapp-conf"><i class="fa-brands fa-whatsapp"></i> Me contacter sur WhatsApp</a>'
      + '</div>';
  } else {
    html = '<div class="confirmation-icone succes"><i class="fa-solid fa-envelope"></i></div>'
      + '<h1 class="confirmation-titre">Contactez-moi</h1>'
      + '<p class="confirmation-texte">Souhaitez-vous m\'envoyer un message ?</p>'
      + '<div class="confirmation-boutons">'
      + '<a href="contact.html" class="bouton-principal-conf"><i class="fa-solid fa-paper-plane"></i> Accéder au formulaire</a>'
      + '<a href="index.html" class="bouton-secondaire-conf"><i class="fa-solid fa-house"></i> Retour à l\'accueil</a>'
      + '</div>';
  }

  carte.innerHTML = html;
  carte.classList.add('visible');
});


// ── EMAILJS — FORMULAIRE CONTACT ──────────────

(function () {

  // Initialiser EmailJS avec la Public Key
  if (typeof emailjs !== 'undefined') {
    emailjs.init('F8mtyYpA0xkaX6hnz');
  }

  var formulaire      = document.getElementById('formulaireContact');
  var boutonEnvoyer   = document.getElementById('boutonEnvoyer');
  var formSucces      = document.getElementById('formSucces');
  var formErreur      = document.getElementById('formErreurGlobal');
  var boutonNouveau   = document.getElementById('boutonNouveauMessage');
  var textarea        = document.getElementById('message');
  var compteur        = document.getElementById('compteurCaracteres');

  if (!formulaire) return;

  // Compteur de caractères
  if (textarea && compteur) {
    textarea.addEventListener('input', function () {
      var longueur = textarea.value.length;
      if (longueur > 1000) {
        textarea.value = textarea.value.substring(0, 1000);
        longueur = 1000;
      }
      compteur.textContent = longueur;
    });
  }

  // Validation d'un champ
  function validerChamp(champ) {
    var erreurEl = document.getElementById('erreur-' + champ.id);
    var valeur   = champ.value.trim();
    var ok       = true;
    var msg      = '';

    if (champ.required && valeur === '') {
      ok = false; msg = 'Ce champ est obligatoire.';
    } else if (champ.type === 'email' && valeur !== '') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)) {
        ok = false; msg = 'Adresse email invalide.';
      }
    } else if (champ.id === 'message' && valeur.length < 10) {
      ok = false; msg = 'Message trop court (min. 10 caractères).';
    }

    champ.classList.toggle('invalide', !ok);
    champ.classList.toggle('valide', ok && valeur !== '');
    if (erreurEl) erreurEl.textContent = msg;
    return ok;
  }

  // Validation au blur et à l'input
  ['nom', 'email', 'sujet', 'message'].forEach(function (id) {
    var champ = document.getElementById(id);
    if (!champ) return;
    champ.addEventListener('blur', function () { validerChamp(champ); });
    champ.addEventListener('input', function () {
      if (champ.classList.contains('invalide')) validerChamp(champ);
    });
  });

  // Soumission du formulaire
  formulaire.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot — si rempli c'est un bot
    var honeypot = formulaire.querySelector('[name="site_web"]');
    if (honeypot && honeypot.value !== '') return;

    // Valider tous les champs
    var toutValide = true;
    ['nom', 'email', 'sujet', 'message'].forEach(function (id) {
      var champ = document.getElementById(id);
      if (champ && !validerChamp(champ)) toutValide = false;
    });

    if (!toutValide) {
      var premier = formulaire.querySelector('.invalide');
      if (premier) { premier.scrollIntoView({ behavior: 'smooth', block: 'center' }); premier.focus(); }
      return;
    }

    // Cacher erreur globale
    formErreur.classList.remove('visible');

    // Désactiver bouton + texte chargement
    boutonEnvoyer.disabled = true;
    boutonEnvoyer.querySelector('.bouton-texte').textContent = 'Envoi en cours...';

    // Paramètres à envoyer à EmailJS — doivent correspondre aux variables du template
    var parametres = {
      nom:     document.getElementById('nom').value.trim(),
      email:   document.getElementById('email').value.trim(),
      sujet:   document.getElementById('sujet').value,
      message: document.getElementById('message').value.trim()
    };

    // Envoyer via EmailJS
    emailjs.send('service_8lceohj', 'template_7ozgy7g', parametres)
      .then(function () {
        // Succès — cacher formulaire, afficher message succès
        formulaire.style.display = 'none';
        formSucces.classList.add('visible');
        formulaire.reset();
        if (compteur) compteur.textContent = '0';
        // Réinitialiser les classes valide
        ['nom', 'email', 'sujet', 'message'].forEach(function (id) {
          var c = document.getElementById(id);
          if (c) { c.classList.remove('valide', 'invalide'); }
        });
      })
      .catch(function () {
        // Erreur — afficher message erreur
        formErreur.classList.add('visible');
        boutonEnvoyer.disabled = false;
        boutonEnvoyer.querySelector('.bouton-texte').textContent = 'Envoyer le message';
      });
  });

  // Bouton "Envoyer un autre message"
  if (boutonNouveau) {
    boutonNouveau.addEventListener('click', function () {
      formSucces.classList.remove('visible');
      formulaire.style.display = 'flex';
      boutonEnvoyer.disabled = false;
      boutonEnvoyer.querySelector('.bouton-texte').textContent = 'Envoyer le message';
    });
  }

})();
