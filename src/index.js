import { fetchImages } from "./modules/api.js"; 
import { initSwiper, populateGallery, setupControls } from "./modules/gallery.js"; 
 
async function initGallery() { 
  const images = await fetchImages(); 
  const swiper = initSwiper(); 
  populateGallery(images); 
  setupControls(images, swiper); 
} 
 
initGallery();
