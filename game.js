document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");
    const player = document.getElementById("player");
    const scoreValue = document.getElementById("score-value");
    const timerValue = document.getElementById("timer-value");
    const collectSound = document.getElementById("collect-sound");
    const gameOverSound = document.getElementById("game-over-sound");

    let score = 0;
    let time = 60;

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * (gameContainer.clientWidth - 30) + "px";
        gameContainer.appendChild(heart);
    
        heart.addEventListener("click", function() {
            gameContainer.removeChild(heart);
            score++;
            scoreValue.textContent = score;
            collectSound.play();
        });
    
        // Időzített eltávolítás
        setTimeout(() => {
            if (gameContainer.contains(heart)) {
                gameContainer.removeChild(heart);
            }
        }, 5000); // Az időzítés időtartama (itt: 5 másodperc)
    }
    

    function updateTimer() {
        if (time > 0) {
            time--;
            timerValue.textContent = time + "s";
        } else {
            gameOver();
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        gameContainer.innerHTML = "<h1>Lejárt az idő életem. Nagyon szeretlek <3</h1><p>Pontod: " + score + "</p>";
        gameOverSound.play();
    }

    function gameLoop() {
        gameInterval = setInterval(function() {
            createHeart();
            updateTimer();
        }, 1500); // Az időköz (itt: 2 másodperc)
    }

    gameLoop();
});
