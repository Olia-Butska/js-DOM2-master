export function initSwiper() {
    return new Swiper(".swiper", {
      loop: true,
      autoplay: true,
      pagination: { el: ".swiper-pagination" },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }
  
  export function populateGallery(images) {
    const galleryItems = document.querySelectorAll(".swiper-slide");
  
    images.slice(0, 4).forEach((photo, index) => {
      if (index < galleryItems.length) {
        const slide = galleryItems[index];
        const img = document.createElement("img");
        img.src = photo.download_url;
        img.alt = photo.author;
        slide.append(img);
      }
    });
  
    return 4; // Початковий startIndex
  }
  
  export function setupControls(images, swiper) {
    let startIndex = 4;
  
    document.getElementById("add").addEventListener("click", () => {
      const galleryContainer = document.querySelector(".swiper-wrapper");
      const slice = images.slice(startIndex, startIndex + 4);
  
      slice.forEach((photo) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        const img = document.createElement("img");
        img.src = photo.download_url;
        img.alt = photo.author;
        slide.appendChild(img);
        galleryContainer.appendChild(slide);
      });
  
      startIndex += 4;
      swiper.update();
    });
  
    document.getElementById("clear").addEventListener("click", () => {
      document.querySelector(".swiper-wrapper").innerHTML = "";
      startIndex = 0;
    });
  
    document.getElementById("delete").addEventListener("click", () => {
      const slides = document.querySelectorAll(".swiper-slide");
      if (slides.length > 0) slides[slides.length - 1].remove();
      swiper.update();
    });
  
    document.getElementById("reverse").addEventListener("click", () => {
      const galleryContainer = document.querySelector(".swiper-wrapper");
      const slides = Array.from(galleryContainer.children);
      galleryContainer.innerHTML = "";
      slides.reverse().forEach((slide) => galleryContainer.appendChild(slide));
    });
  }