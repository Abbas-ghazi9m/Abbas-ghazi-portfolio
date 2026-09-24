/* =========================================================
   ABBAS PORTFOLIO — 2026
   Interactive Experience
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    const mobileLinks = document.querySelectorAll(
        ".mobile-menu a"
    );

    const navLinks = document.querySelectorAll(
        ".nav-link"
    );

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const revealElements = document.querySelectorAll(
        ".reveal"
    );


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuButton.classList.toggle(
                "active",
                isOpen
            );

        });


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        document.addEventListener("click", event => {

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                mobileMenu.classList.remove("open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {

                        return;

                    }

                    event.preventDefault();

                    const navbarHeight =
                        document.querySelector(
                            ".navbar"
                        )?.offsetHeight || 70;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight -
                        20;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* =====================================================
       PROJECT CARD TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {

                    return;

                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       STACK CARD INTERACTION
    ===================================================== */

    const stackCards =
        document.querySelectorAll(
            ".stack-card"
        );


    stackCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {

                    return;

                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const moveX =
                    ((x / rect.width) - 0.5) *
                    6;

                const moveY =
                    ((y / rect.height) - 0.5) *
                    6;

                card.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (heroVisual) {

        window.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {

                    return;

                }

                const x =
                    (event.clientX /
                        window.innerWidth) -
                    0.5;

                const y =
                    (event.clientY /
                        window.innerHeight) -
                    0.5;

                const moveX =
                    x * 10;

                const moveY =
                    y * 10;

                heroVisual.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    function updateNavbar() {

        if (!navbar) {

            return;

        }

        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(8, 8, 8, 0.88)";

            navbar.style.borderColor =
                "rgba(255,255,255,0.15)";

        } else {

            navbar.style.background =
                "rgba(10, 10, 10, 0.7)";

            navbar.style.borderColor =
                "rgba(255,255,255,0.11)";

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.querySelector(
            ".footer-year"
        );


    if (yearElement) {

        yearElement.textContent =
            `© ${new Date().getFullYear()}`;

    }


    /* =====================================================
       CONTACT LINK PROTECTION
    ===================================================== */




    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});