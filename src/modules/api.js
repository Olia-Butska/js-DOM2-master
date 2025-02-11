export async function fetchImages() {
  try {
    const response = await fetch("https://picsum.photos/v2/list");
    return await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}