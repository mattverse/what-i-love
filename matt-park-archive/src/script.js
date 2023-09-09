
const customCursor = document.getElementById("custom-cursor");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const delay = 0.1; // Adjust this value to change the delay (0.1 = 10% delay)

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * delay;
    cursorY += (mouseY - cursorY) * delay;

    customCursor.style.left = cursorX + "px";
    customCursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();
