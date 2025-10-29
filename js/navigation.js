// Oldal metadata
const pageMetadata = {
    'home': {
        title: 'Magvető - A Belső Kastély Útja',
        description: 'Spirituális útmutató a belső kastély útján - kvantum-szövetség, átadás, és misztikus hit'
    },
    'mag': {
        title: 'A Mag - Magvető',
        description: 'Nem másokat kell felébresztenem, hanem magamat ébren tartani. A hit nem tudás, hanem mozgás.'
    },
    'surrender': {
        title: 'Az Átadás - Magvető',
        description: 'Nem mi irányítunk - átadjuk magunkat. A szabad akarat igazi jelentése.'
    },
    'quantum-covenant': {
        title: 'Kvantum-Szövetség - Magvető',
        description: 'A tudomány és spiritualitás ugyanazt a valóságot írja le, csak más nyelven'
    },
    'jesus': {
        title: 'Jézus Tanítása - Magvető',
        description: 'Jézus misztikus útmutatása a belső átalakuláshoz'
    },
    'castle': {
        title: 'A Belső Kastély - Magvető',
        description: 'Avilai Szent Teréz belső kastélyának útmutatása - a lélek 7 lakosztálya'
    },
    'cosmic-knots': {
        title: 'Kozmikus Csomók - Magvető',
        description: 'A láthatatlan kapcsolatok a valóság szövetében'
    },
    'desert': {
        title: 'Érzelmi Puszta - Magvető',
        description: 'Ahol a lélek megtisztul és megtalálja belső forrásait'
    },
    'stories': {
        title: 'Történetek - Magvető',
        description: 'Bibliai történetek mélyebb spirituális jelentései'
    },
    'questions': {
        title: 'Kérdések - Magvető',
        description: 'Mély spirituális kérdések és gondolatok'
    },
    'silence': {
        title: 'Csend - Magvető',
        description: 'Ahol a szavak elhallgatnak és a lényeg szól'
    }
};

// URL hash kezelése
function updateURL(pageId) {
    if(history.pushState) {
        history.pushState(null, null, `#${pageId}`);
    } else {
        window.location.hash = `#${pageId}`;
    }
}

// Meta tag frissítése
function updateMetadata(pageId) {
    const meta = pageMetadata[pageId] || pageMetadata['home'];
    
    // Title frissítése
    document.title = meta.title;
    
    // Meta description frissítése
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = meta.description;
}

// Oldal betöltése
async function loadPage(pageId) {
    try {
        const response = await fetch(`pages/${pageId}.html`);
        if (!response.ok) {
            throw new Error('Oldal nem található');
        }
        const content = await response.text();
        return content;
    } catch (error) {
        console.error('Hiba az oldal betöltésekor:', error);
        return '<div class="error"><p>Hiba az oldal betöltésekor. Próbáld újra később.</p></div>';
    }
}

// Fő navigációs függvény
async function showPage(pageId) {
    // Elrejtjük az aktuális tartalmat
    const mainContent = document.getElementById('main-content');
    mainContent.style.opacity = '0';
    
    // Betöltjük az új oldalt
    const content = await loadPage(pageId);
    
    // Frissítjük a tartalmat
    mainContent.innerHTML = content;
    
    // Metaadatok frissítése
    updateMetadata(pageId);
    updateURL(pageId);
    
    // Navigáció frissítése
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    // Animáció
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 50);
    
    // Oldal tetejére görbítés
    window.scrollTo(0, 0);
    
    // Mobil menü bezárása
    document.querySelector('.nav-links').classList.remove('active');
    document.querySelector('.mobile-menu-btn').setAttribute('aria-expanded', 'false');
    document.querySelector('.mobile-menu-btn').textContent = 'Menü ≡';
}

// Hash változás kezelése
window.addEventListener('hashchange', function() {
    const pageId = window.location.hash.substring(1) || 'home';
    showPage(pageId);
});

// Mobil menü kezelése
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
            this.textContent = isExpanded ? 'Menü ≡' : 'Menü ✕';
        });
    }
    
    // Billentyűzet navigáció
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.mobile-menu-btn').setAttribute('aria-expanded', 'false');
            document.querySelector('.mobile-menu-btn').textContent = 'Menü ≡';
        }
    });
    
    // Kezdeti oldal betöltése
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);
});