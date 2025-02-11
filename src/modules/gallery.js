import { fetchImages } from "./api.js";

const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let startIndex = 0;
const galleryContainer = document.querySelector(".swiper-wrapper");

export async function initializeGallery() {
    const json = await fetchImages();
    renderInitialImages(json);
    setupGalleryControls(json);
}

function renderInitialImages(json) {
    json.slice(0, 4).forEach((photo) => {
        const slide = createSlide(photo);
        galleryContainer.appendChild(slide);
    });
    startIndex = 4;
    swiper.update();
}

function createSlide(photo) {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    const img = document.createElement("img");
    img.src = photo.download_url;
    img.alt = photo.author;
    slide.appendChild(img);
    return slide;
}

function setupGalleryControls(json) {
    document.getElementById("add").addEventListener("click", () => addImages(json));
    document.getElementById("clear").addEventListener("click", clearGallery);
    document.getElementById("delete").addEventListener("click", deleteLastImage);
    document.getElementById("reverse").addEventListener("click", reverseGallery);
}

function addImages(json) {
    const slice = json.slice(startIndex, startIndex + 4);
    slice.forEach((photo) => {
        const slide = createSlide(photo);
        galleryContainer.appendChild(slide);
    });
    startIndex += 4;
    swiper.update();
}

function clearGallery() {
    galleryContainer.innerHTML = "";
    startIndex = 0;
    swiper.update();
}

function deleteLastImage() {
    const slides = document.querySelectorAll(".swiper-slide");
    if (slides.length > 0) {
        slides[slides.length - 1].remove();
        swiper.update();
    }
}

function reverseGallery() {
    const slides = Array.from(document.querySelectorAll(".swiper-slide"));
    galleryContainer.innerHTML = "";
    slides.reverse().forEach(slide => galleryContainer.appendChild(slide));
    swiper.update();
}
