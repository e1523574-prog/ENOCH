/* =========================================================
   WEDDING WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

    document.querySelectorAll(".main-nav a").forEach(link => {

        link.addEventListener("click", () => {
            mainNav.classList.remove("active");
        });

    });

}


/* =========================================================
   HERO SLIDESHOW
========================================================= */

const slides = document.querySelectorAll(".hero-slide");
const slideCurrent = document.getElementById("slideCurrent");
const slideTotal = document.getElementById("slideTotal");
const slideProgress = document.getElementById("slideProgress");

let currentSlide = 0;
let slideTimer;

const slideDuration = 5000;

if (slides.length > 0) {

    slideTotal.textContent = String(slides.length).padStart(2, "0");

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

        if (slideCurrent) {
            slideCurrent.textContent =
                String(index + 1).padStart(2, "0");
        }

        resetProgress();
    }


    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }


    function resetProgress() {

        if (!slideProgress) return;

        slideProgress.style.transition = "none";
        slideProgress.style.width = "0%";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                slideProgress.style.transition =
                    `width ${slideDuration}ms linear`;

                slideProgress.style.width = "100%";

            });

        });

    }


    function startSlideshow() {

        clearInterval(slideTimer);

        slideTimer = setInterval(() => {
            nextSlide();
        }, slideDuration);

    }


    showSlide(0);
    startSlideshow();


    /* Pause when browser tab is hidden */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            clearInterval(slideTimer);

        } else {

            startSlideshow();
        }

    });

}


/* =========================================================
   COUNTDOWN
========================================================= */

/*
   Wedding date:
   21 November 2026
   11:00 AM Ghana time (GMT)
*/

const weddingDate =
    new Date("2026-11-21T11:00:00+00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");


    if (distance <= 0) {

        if (days) days.textContent = "00";
        if (hours) hours.textContent = "00";
        if (minutes) minutes.textContent = "00";
        if (seconds) seconds.textContent = "00";

        return;
    }


    const dayValue =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hourValue =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minuteValue =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const secondValue =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );


    if (days) {
        days.textContent =
            String(dayValue).padStart(2, "0");
    }

    if (hours) {
        hours.textContent =
            String(hourValue).padStart(2, "0");
    }

    if (minutes) {
        minutes.textContent =
            String(minuteValue).padStart(2, "0");
    }

    if (seconds) {
        seconds.textContent =
            String(secondValue).padStart(2, "0");
    }

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

const galleryImages =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

let lightboxIndex = 0;


function openLightbox(index) {

    if (!galleryImages.length) return;

    lightboxIndex = index;

    lightboxImage.src =
        galleryImages[lightboxIndex].src;

    lightboxImage.alt =
        galleryImages[lightboxIndex].alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


function nextLightboxImage() {

    lightboxIndex++;

    if (lightboxIndex >= galleryImages.length) {
        lightboxIndex = 0;
    }

    lightboxImage.src =
        galleryImages[lightboxIndex].src;

    lightboxImage.alt =
        galleryImages[lightboxIndex].alt;
}


function previousLightboxImage() {

    lightboxIndex--;

    if (lightboxIndex < 0) {
        lightboxIndex = galleryImages.length - 1;
    }

    lightboxImage.src =
        galleryImages[lightboxIndex].src;

    lightboxImage.alt =
        galleryImages[lightboxIndex].alt;
}


galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {
        openLightbox(index);
    });

});


if (lightboxClose) {
    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );
}


if (lightboxNext) {
    lightboxNext.addEventListener(
        "click",
        nextLightboxImage
    );
}


if (lightboxPrev) {
    lightboxPrev.addEventListener(
        "click",
        previousLightboxImage
    );
}


if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

}


document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextLightboxImage();
    }

    if (event.key === "ArrowLeft") {
        previousLightboxImage();
    }

});


/* =========================================================
   RSVP
========================================================= */

const rsvpForm =
    document.getElementById("rsvpForm");


if (rsvpForm) {

    rsvpForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const guests =
            document.getElementById("guests").value;

        const attendance =
            document.getElementById("attendance").value;

        const message =
            document.getElementById("message").value.trim();


        /*
           CHANGE THIS NUMBER.

           Ghana format:
           233XXXXXXXXX

           Example:
           233241234567
        */

        const number = "233545958975";


        const whatsappMessage =
            `Hello Enoch & Priscilla,

I would like to RSVP for your wedding.

Name: ${name}
Phone: ${phone}
Number of Guests: ${guests}
Attendance: ${attendance}
Message: ${message || "No additional message."}

Wedding Date: 21 November 2026`;


        const whatsappURL =
            `https://wa.me/${number}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


/* =========================================================
   SHARE INVITATION
========================================================= */

const shareButton =
    document.getElementById("shareButton");


if (shareButton) {

    shareButton.addEventListener("click", async () => {

        const shareData = {

            title: "Enoch & Priscilla",

            text:
                "You are invited to celebrate the wedding of Enoch & Priscilla on 21 November 2026.",

            url: window.location.href

        };


        if (navigator.share) {

            try {

                await navigator.share(shareData);

            } catch (error) {

                console.log("Share cancelled.");

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert(
                    "Invitation link copied! You can now share it with your family and friends."
                );

            } catch (error) {

                alert(
                    "Copy the website link from your browser and share it with your guests."
                );

            }

        }

    });

}


/* =========================================================
   IMAGE PRELOADING
========================================================= */

const heroImages = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg"
];


heroImages.forEach(src => {

    const image = new Image();

    image.src = src;

});


/* =========================================================
   TOUCH SWIPE FOR HERO
========================================================= */

let touchStartX = 0;
let touchEndX = 0;

const hero =
    document.querySelector(".hero");


if (hero && slides.length > 1) {

    hero.addEventListener("touchstart", event => {

        touchStartX =
            event.changedTouches[0].screenX;

    });


    hero.addEventListener("touchend", event => {

        touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchEndX - touchStartX;


        if (Math.abs(difference) < 50) {
            return;
        }


        if (difference < 0) {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

        } else {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

        }


        showSlide(currentSlide);
        startSlideshow();

    });

}
