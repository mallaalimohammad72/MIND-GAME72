let score = 0;
let misses = 0;
const gameArea = document.getElementById("gameArea");
const clickSound = document.getElementById("clickSound");
const gameOverSound = document.getElementById("gameOverSound");
const bgMusic = document.getElementById("bgMusic");

// Object sound mapping
const soundMap = {
    "🐱": "catSound",
    "🐶": "dogSound",
    "🐵": "monkeySound",
    "🐸": "frogSound",
    "🍕": "pizzaSound",
    "🚀": "rocketSound"
};

// Function to play text-to-speech voice
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

// Function to play object sound
function playObjectSound(object) {
    let soundId = soundMap[object];
    if (soundId) {
        let sound = document.getElementById(soundId);
        sound.currentTime = 0;
        sound.play();
    }
}

// Function to start the game
function startGame() {
    const selectedObjects = Array.from(document.getElementById("objectChoice").selectedOptions).map(option => option.value);
    if (selectedObjects.length === 0) {
        alert("Please select at least one object to start the game!");
        return;
    }
    
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("gameOverButtons").style.display = "none";
    gameArea.style.display = "block";
    score = 0;
    misses = 0;
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("misses").innerText = "Misses: 0";
    bgMusic.play();
    speak("Game Started. Tap the objects!");
    spawnObjects(selectedObjects);
}

// Function to spawn objects randomly
function spawnObjects(selectedObjects) {
    gameArea.innerHTML = "";
    let gameInterval = setInterval(() => {
        if (misses >= 50) {
            clearInterval(gameInterval);
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("gameOverButtons").style.display = "block";
            gameOverSound.play();
            bgMusic.pause();
            speak("Game Over! You missed too many objects.");
            gameArea.innerHTML = "";
            return;
        }
        
        const obj = document.createElement("div");
        obj.classList.add("gameObject");
        obj.innerText = selectedObjects[Math.floor(Math.random() * selectedObjects.length)];
        obj.style.left = Math.random() * (gameArea.clientWidth - 100) + "px";
        obj.style.top = Math.random() * (gameArea.clientHeight - 100) + "px";
        
        // Click event: Increase score, play sound, and speak object name
        obj.onclick = function () {
            score++;
            clickSound.currentTime = 0;
            clickSound.play();
            playObjectSound(obj.innerText);
            speak(obj.innerText);  // Speak the object name
            document.getElementById("score").innerText = "Score: " + score;
            obj.remove();
        };

        setTimeout(() => {
            if (gameArea.contains(obj)) {
                obj.remove();
                misses++;
                document.getElementById("misses").innerText = "Misses: " + misses;
            }
        }, 2000);

        gameArea.appendChild(obj);
    }, 1000);
}

// Function to reload the page and go home
function goToHome() {
    location.reload();
}
