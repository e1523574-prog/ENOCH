/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");


window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");
 
    } else {

        header.classList.remove("scrolled");

    }

});


menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

});


nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});



/* =====================================================
   HERO SLIDESHOW
===================================================== */

const slides = [
    ...document.querySelectorAll(".hero-slide")
];

const currentSlide =
    document.getElementById("currentSlide");

const totalSlides =
    document.getElementById("totalSlides");

const progressBar =
    document.getElementById("progressBar");


let slideIndex = 0;

const slideDuration = 5000;

let slideshowTimer;



totalSlides.textContent =
    String(slides.length).padStart(2, "0");



/* Show slide */

function showSlide(index) {

    slideIndex =
        (index + slides.length) % slides.length;


    slides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === slideIndex
        );

    });


    currentSlide.textContent =
        String(slideIndex + 1).padStart(2, "0");


    /*
       Restart progress animation
    */

    progressBar.style.transition = "none";

    progressBar.style.width =
        `${(slideIndex / slides.length) * 100}%`;


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            progressBar.style.transition =
                `width ${slideDuration}ms linear`;

            progressBar.style.width =
                `${((slideIndex + 1) / slides.length) * 100}%`;

        });

    });

}



/* Next slide */

function nextSlide() {

    showSlide(slideIndex + 1);

}



/* Previous slide */

function previousSlide() {

    showSlide(slideIndex - 1);

}



/* Start slideshow */

function startSlideshow() {

    clearInterval(slideshowTimer);

    slideshowTimer =
        setInterval(
            nextSlide,
            slideDuration
        );

}



/* Restart */

function restartSlideshow() {

    startSlideshow();

}



/* Preload images */

slides.forEach(slide => {

    const image =
        slide.querySelector("img");

    if (image) {

        const preload =
            new Image();

        preload.src =
            image.src;

    }

});



showSlide(0);

startSlideshow();



/* Pause slideshow when tab isn't active */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            clearInterval(
                slideshowTimer
            );

        } else {

            startSlideshow();

        }

    }
);



/* =====================================================
   MOBILE SWIPE CONTROLS
===================================================== */

const hero =
    document.querySelector(".hero");


let touchStartX = 0;

let touchEndX = 0;



hero.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);



hero.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;


        const distance =
            touchEndX - touchStartX;


        if (Math.abs(distance) > 50) {

            if (distance < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

            restartSlideshow();

        }

    },
    { passive: true }
);



/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowRight") {

            nextSlide();

            restartSlideshow();

        }


        if (event.key === "ArrowLeft") {

            previousSlide();

            restartSlideshow();

        }

    }
);



/* =====================================================
   COUNTDOWN
===================================================== */


/*
   CHANGE THIS DATE AND TIME
   WHEN YOU HAVE THE FINAL
   WEDDING DATE.
*/

const weddingDate =
    new Date(
        "2026-09-26T13:00:00+00:00"
    ).getTime();



function updateCountdown() {

    const difference =
        Math.max(
            0,
            weddingDate - Date.now()
        );


    const days =
        Math.floor(
            difference / 86400000
        );


    const hours =
        Math.floor(
            difference / 3600000
        ) % 24;


    const minutes =
        Math.floor(
            difference / 60000
        ) % 60;


    const seconds =
        Math.floor(
            difference / 1000
        ) % 60;



    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


const galleryItems =
    document.querySelectorAll(".gallery-item");



galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            lightboxImage.src =
                item.dataset.image;


            lightbox.classList.add(
                "open"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "no-scroll"
            );

        }
    );

});



function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}



document.getElementById(
    "lightboxClose"
).addEventListener(
    "click",
    closeLightbox
);



lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);



document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);



/* =====================================================
   RSVP → WHATSAPP
===================================================== */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );



rsvpForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "guestName"
            ).value.trim();


        const response =
            document.getElementById(
                "attendance"
            ).value;


        const message =
            document.getElementById(
                "guestMessage"
            ).value.trim()
            || "No message";


        /*
           IMPORTANT:

           Replace this number with
           the couple's WhatsApp number.

           Example:

           233241234567

           Do not use +.
        */

        const number =
            "233XXXXXXXXX";


        const text =
`Wedding RSVP

Name: ${name}

Response: ${response}

Message: ${message}`;


        document.getElementById(
            "formMessage"
        ).textContent =
            "Opening WhatsApp…";


        window.open(
            `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
            "_blank"
        );

    }
);



/* =====================================================
   WHATSAPP SHARE
===================================================== */

const shareText =
    "You are warmly invited to celebrate Emmanuel & Shirley on 26 September 2026. We would love to have you with us.";


document.getElementById(
    "whatsappShare"
).href =
    "https://wa.me/?text=" +
    encodeURIComponent(shareText);
