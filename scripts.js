
/* =========================================================
   CAROLINA REIS FOTOGRAFIA
   PROFESSIONAL PHOTOGRAPHY WEBSITE
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   01. CONFIGURAÇÕES DO SITE
   ========================================================= */

const SITE_CONFIG = {

    // WhatsApp: código do país + DDD + número
    whatsapp: "551199628-2258",

    // Instagram sem @
    instagram: "_artesemclick",

    // Mensagem inicial do WhatsApp
    whatsappMessage:
        "Olá, Carolina! Conheci seu site e gostaria de saber mais sobre seus ensaios fotográficos."

};


/* =========================================================
   02. ELEMENTOS DO DOM
   ========================================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menu-toggle");

const navMenu = document.getElementById("nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("back-to-top");

const currentYear = document.getElementById("current-year");


/* =========================================================
   03. MENU MOBILE
   ========================================================= */

function openMenu() {

    if (!menuToggle || !navMenu) return;

    navMenu.classList.add("open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute("aria-label", "Fechar menu");

    document.body.classList.add("no-scroll");

}


function closeMenu() {

    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Abrir menu");

    document.body.classList.remove("no-scroll");

}


function toggleMenu() {

    const isOpen = navMenu.classList.contains("open");

    if (isOpen) {

        closeMenu();

    } else {

        openMenu();

    }

}


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", toggleMenu);


    // Fecha ao clicar em um link

    navLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    // Fecha ao clicar fora do menu

    document.addEventListener("click", event => {

        const clickedInsideMenu = navMenu.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMenu();

        }

    });


    // Fecha com ESC

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("open")
        ) {

            closeMenu();

            menuToggle.focus();

        }

    });


    // Fecha se a tela voltar ao tamanho desktop

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });

}


/* =========================================================
   04. HEADER AO ROLAR A PÁGINA
   ========================================================= */

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});

handleHeaderScroll();


/* =========================================================
   05. BOTÃO VOLTAR AO TOPO
   ========================================================= */

function handleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


window.addEventListener("scroll", handleBackToTop, {
    passive: true
});

handleBackToTop();


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================================
   06. NAVEGAÇÃO ATIVA
   ========================================================= */

const observedSections = document.querySelectorAll(
    "main section[id]"
);


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const currentId = entry.target.id;

                navLinks.forEach(link => {

                    const isActive =
                        link.getAttribute("href") === `#${currentId}`;

                    link.classList.toggle("active", isActive);

                });

            });

        },

        {

            root: null,

            rootMargin: "-35% 0px -55% 0px",

            threshold: 0

        }

    );


    observedSections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   07. SCROLL SUAVE DOS LINKS INTERNOS
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        closeMenu();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


/* =========================================================
   08. LIGHTBOX - GALERIA
   ========================================================= */

const portfolioItems = Array.from(
    document.querySelectorAll(".portfolio-item")
);

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxCaption = document.getElementById("lightbox-caption");

const lightboxClose = document.getElementById("lightbox-close");

const lightboxPrev = document.getElementById("lightbox-prev");

const lightboxNext = document.getElementById("lightbox-next");


let currentImageIndex = 0;

let previousFocusElement = null;


function updateLightboxImage(index) {

    if (!portfolioItems.length) return;

    currentImageIndex =
        (index + portfolioItems.length) % portfolioItems.length;

    const item = portfolioItems[currentImageIndex];

    const imagePath = item.dataset.image;

    const imageTitle = item.dataset.title || "Fotografia";

    const thumbnail = item.querySelector("img");


    if (!imagePath || !lightboxImage) return;


    // Atualiza a fotografia

    lightboxImage.src = imagePath;

    lightboxImage.alt = thumbnail
        ? thumbnail.alt
        : imageTitle;


    // Atualiza legenda

    if (lightboxCaption) {

        lightboxCaption.textContent = imageTitle;

    }


    // Atualiza acessibilidade

    portfolioItems.forEach((portfolioItem, index) => {

        portfolioItem.setAttribute(
            "aria-current",
            index === currentImageIndex ? "true" : "false"
        );

    });

}


function openLightbox(index) {

    if (!lightbox || !portfolioItems.length) return;

    previousFocusElement = document.activeElement;

    updateLightboxImage(index);

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("no-scroll");


    // Foco no botão fechar

    if (lightboxClose) {

        lightboxClose.focus();

    }

}


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");


    // Remove a imagem para liberar memória

    if (lightboxImage) {

        lightboxImage.removeAttribute("src");

    }


    // Devolve o foco ao elemento anterior

    if (
        previousFocusElement &&
        typeof previousFocusElement.focus === "function"
    ) {

        previousFocusElement.focus();

    }

}


function showNextImage() {

    updateLightboxImage(currentImageIndex + 1);

}


function showPreviousImage() {

    updateLightboxImage(currentImageIndex - 1);

}


/* Abre fotografia ao clicar */

portfolioItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* Botão fechar */

if (lightboxClose) {

    lightboxClose.addEventListener("click", closeLightbox);

}


/* Botão próxima fotografia */

if (lightboxNext) {

    lightboxNext.addEventListener("click", showNextImage);

}


/* Botão fotografia anterior */

if (lightboxPrev) {

    lightboxPrev.addEventListener("click", showPreviousImage);

}


/* Fecha ao clicar no fundo */

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


/* =========================================================
   09. CONTROLES DO LIGHTBOX PELO TECLADO
   ========================================================= */

document.addEventListener("keydown", event => {

    if (!lightbox || !lightbox.classList.contains("active")) return;


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowRight") {

        showNextImage();

    }


    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }

});


/* =========================================================
   10. GESTOS DE TOQUE NO LIGHTBOX
   ========================================================= */

let touchStartX = 0;

let touchEndX = 0;


if (lightbox) {

    lightbox.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, {
        passive: true
    });


    lightbox.addEventListener("touchend", event => {

        touchEndX = event.changedTouches[0].screenX;

        handleLightboxSwipe();

    }, {
        passive: true
    });

}


function handleLightboxSwipe() {

    const difference = touchStartX - touchEndX;

    const minimumSwipe = 50;

    if (Math.abs(difference) < minimumSwipe) return;


    if (difference > 0) {

        showNextImage();

    } else {

        showPreviousImage();

    }

}


/* =========================================================
   11. LINKS DO WHATSAPP
   ========================================================= */

function configureWhatsApp() {

    const whatsappLinks = document.querySelectorAll(
        ".whatsapp-link"
    );


    const message = encodeURIComponent(
        SITE_CONFIG.whatsappMessage
    );


    const whatsappURL =
        `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`;


    whatsappLinks.forEach(link => {

        link.href = whatsappURL;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

    });

}


configureWhatsApp();


/* =========================================================
   12. LINKS DO INSTAGRAM
   ========================================================= */

function configureInstagram() {

    const instagramLinks = document.querySelectorAll(
        ".instagram-link"
    );


    const instagramURL =
        `https://www.instagram.com/${SITE_CONFIG.instagram}/`;


    instagramLinks.forEach(link => {

        link.href = instagramURL;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

    });

}


configureInstagram();


/* =========================================================
   13. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================= */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================================
   14. ANIMAÇÕES DE ENTRADA DAS SEÇÕES
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .about-image, " +
    ".portfolio-item, .service-card, .contact-card"
);


if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: 0.12,

            rootMargin: "0px 0px -40px 0px"

        }

    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}


/* =========================================================
   15. PREVENÇÃO DE ERROS DE IMAGEM
   ========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

    });

});


/* =========================================================
   16. PROTEÇÃO DE FOCO NO LIGHTBOX
   ========================================================= */

if (lightbox) {

    lightbox.addEventListener("keydown", event => {

        if (event.key !== "Tab") return;

        const focusableElements = lightbox.querySelectorAll(
            "button:not([disabled])"
        );

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];

        const lastElement =
            focusableElements[focusableElements.length - 1];


        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {

            event.preventDefault();

            lastElement.focus();

        } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {

            event.preventDefault();

            firstElement.focus();

        }

    });

}


/* =========================================================
   17. FINALIZAÇÃO
   ========================================================= */

console.log(
    "Carolina Reis Fotografia | Site carregado com sucesso."
);


/* =========================================================
   FIM DO SCRIPT.JS
   ========================================================= */
