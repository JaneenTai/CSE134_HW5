// array of images to display -> can always add more
const images = [
    "./media/gallery/furina.jpg",
    "./media/gallery/family.jpg",
    "./media/gallery/sunset.jpg",
]

// to keep track of where in array we are
let curr = 0;

// save the currently displayed img before clicking next/prev
const img = document.getElementById("main-img");

document.getElementById("next").addEventListener("click", () => {
    curr = (curr + 1) % images.length;
    img.src = images[curr]
});

document.getElementById("prev").addEventListener("click", () => {
    curr = (curr - 1 + images.length) % images.length;
    img.src = images[curr]
});