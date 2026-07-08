function startCountdown(containerId, targetDateString, expiredMessage) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const daysEl = container.querySelector(".countdown-days");
    const hoursEl = container.querySelector(".countdown-hours");
    const minutesEl = container.querySelector(".countdown-minutes");
    const secondsEl = container.querySelector(".countdown-seconds");
    const noteEl = container.querySelector(".countdown-note");

    const targetDate = new Date(targetDateString).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            if (daysEl) daysEl.textContent = "00";
            if (hoursEl) hoursEl.textContent = "00";
            if (minutesEl) minutesEl.textContent = "00";
            if (secondsEl) secondsEl.textContent = "00";
            if (noteEl) noteEl.textContent = expiredMessage;
            container.classList.remove("urgent");
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

        /* urgency for last 7 days */
        if (days <= 7) {
            container.classList.add("urgent");
            if (noteEl) {
                noteEl.textContent = "Deadline approaching — submit your paper soon.";
            }
        } else {
            container.classList.remove("urgent");
            if (noteEl) {
                noteEl.textContent = "";
            }
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    /* Mobile navigation */
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");

            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!expanded));
        });
    }

    /* Contact form success message */
    const form = document.querySelector(".contact-form");
    const successMessage = document.getElementById("form-success");

    if (form && successMessage) {
        form.addEventListener("submit", function () {
            successMessage.classList.remove("show");

            setTimeout(function () {
                form.reset();
                successMessage.classList.add("show");

                setTimeout(function () {
                    successMessage.classList.remove("show");
                }, 4000);
            }, 800);
        });
    }

    /* Particles for home page only */
    if (document.getElementById("particles-js") && typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 110,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.35,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 140,
                    color: "#ffffff",
                    opacity: 0.22,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 120,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    /* Conference countdown on home page */
    startCountdown(
        "conference-countdown",
        "2026-09-24T00:00:00+03:00",
        "The conference has started."
    );

    /* Paper deadline countdown on call-for-papers page */
    startCountdown(
        "papers-countdown",
        "2026-07-17T23:59:00+03:00",
        "The paper submission deadline has passed."
    );
});

function toggleReadMore() {
    const content = document.getElementById("industry-more");
    const btn = document.querySelector(".read-more-btn");

    if (!content || !btn) return;

    if (content.classList.contains("open")) {
        content.style.maxHeight = "0px";
        content.classList.remove("open");
        btn.textContent = "Read more";
    } else {
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
        btn.textContent = "Read less";
    }
}

const promoVideo = document.getElementById("promoVideo");
const videoOverlay = document.getElementById("videoOverlay");

if (promoVideo && videoOverlay) {
    videoOverlay.addEventListener("click", function () {
        promoVideo.play();
    });

    promoVideo.addEventListener("play", function () {
        videoOverlay.classList.add("hidden");
    });

    promoVideo.addEventListener("pause", function () {
        if (!promoVideo.ended) {
            videoOverlay.classList.remove("hidden");
        }
    });

    promoVideo.addEventListener("ended", function () {
        promoVideo.load();
        videoOverlay.classList.remove("hidden");
    });
}