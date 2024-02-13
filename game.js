document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById("game-container");
    const player = document.getElementById("player");
    const scoreValue = document.getElementById("score-value");
    const timerValue = document.getElementById("timer-value");

    let score = 0;
    let time = 60;

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
    
        // Véletlenszerű pozíció generálása az egész képernyőn
        const x = Math.random() * (window.innerWidth - 30); // 30 a szív szélessége
        const y = Math.random() * (window.innerHeight - 30); // 30 a szív magassága
    
        heart.style.left = x + "px";
        heart.style.top = y + "px";
    
        gameContainer.appendChild(heart);
    
        heart.addEventListener("click", function(event) {
            // Szívre való kattintás eseménykezelő
            gameContainer.removeChild(heart);
            score++;
            scoreValue.textContent = score;
    
            // Lehulló rózsaszirom létrehozása
            createRosePetal(event.clientX, event.clientY);
        });
    
        // Időzített eltávolítás
        setTimeout(() => {
            if (gameContainer.contains(heart)) {
                gameContainer.removeChild(heart);
            }
        }, 5000); // Az időzítés időtartama (itt: 5 másodperc)
    }

    function createRosePetal(x, y) {
        // Lehulló rózsaszirom létrehozása
        const rosePetal = document.createElement('div');
        rosePetal.classList.add('rose-petal');
        rosePetal.style.width = '20px';  // Állítsd be a kívánt szélességet
        rosePetal.style.height = '20px'; // Állítsd be a kívánt magasságot
        rosePetal.style.left = x - 10 + 'px'; // Az érték beállítása a szív közepére (szélesség felének)
        rosePetal.style.top = y - 10 + 'px';  // Az érték beállítása a szív közepére (magasság felének)
        gameContainer.appendChild(rosePetal);
    
        // Háttérkép beállítása
        rosePetal.style.backgroundImage = "url('rose-petal.png')";
    
        // Animáció hozzáadása a lehulló rózsaszirmokhoz
        rosePetal.animate(
            [
                { top: y + 'px', opacity: 1 },
                { top: y + 200 + 'px', opacity: 0 }
            ],
            {
                duration: 2000,
                easing: 'ease-in-out',
                fill: 'forwards'
            }
        );
    
        // Rose petal eltávolítása az animáció befejezése után
        setTimeout(function () {
            rosePetal.remove();
        }, 2000);
    }
    
    
    function updateTimer() {
        if (time > 0) {
            time--;
            timerValue.textContent = time;
        } else {
            gameOver();
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        gameContainer.innerHTML = "<h1>Lejárt az idő életem. Nagyon szeretlek <3</h1><p>Pontod: " + score + "</p>";
    }

    function gameLoop() {
        gameInterval = setInterval(function() {
            createHeart();
            updateTimer();
        }, 1500); // Az időköz (itt: 2 másodperc)
    }

    gameLoop();
});
