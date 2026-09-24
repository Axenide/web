document.addEventListener("DOMContentLoaded", function () {
    const sansundertale = document.getElementById("sansundertale");
    const sans = document.getElementById("sans");
    const squee = new Audio("/home/e.mp3");

    function peekAnim() {
        if (!sansundertale || !sans) return;

        sans.setAttribute("disabled", "true");
        
        // Attempt to play audio, catching errors (e.g., user hasn't interacted with page yet)
        squee.play().catch(e => console.log("Audio play failed:", e));

        sansundertale.classList.add("active");

        sansundertale.addEventListener("animationend", function () {
            sans.removeAttribute("disabled");
            sansundertale.classList.remove("active");
        }, { once: true });
    }

    if (sans) {
        sans.addEventListener("click", peekAnim);
    }
});
