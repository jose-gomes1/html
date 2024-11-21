const fnaf = [
    "Freddy Fazbear", "Bonnie", "Chica", "Foxy", "Golden Freddy", "Springtrap",
    "Ballora", "Circus Baby", "Ennard", "Molten Freddy", "Scrap Baby", "Scraptrap",
    "Dark Springtrap", "Lefty", "Rockstar Freddy", "Rockstar Bonnie", "Rockstar Chica",
    "Rockstar Foxy", "Carnie", "Happy Frog", "Mr. Hippo", "Orville Elephant",
    "Nedd Bear", "Pigpatch", "Funtime Freddy", "Funtime Foxy", "Funtime Chica", "Nightmare",
    "Nightmare Fredbear", "Nightmare Freddy", "Nightmare Bonnie", "Nightmare Chica",    
    "Nightmare Foxy", "Nightmare Mangle", "Nightmare Balloon Boy", "Phantom Freddy",
    "Phantom Chica", "Phantom Foxy", "Phantom Balloon Boy", "Phantom Puppet",
    "Phantom Mangle", "Shadow Freddy", "RWQFSFASXC", "Helpy",
    "Dee Dee", "XOR", "Old Man Consequences", "Vengeful Spirit",
    "Toy Freddy", "Toy Chica", "Toy Bonnie", "Mangle", "Balloon Boy", "Puppet",
    "JJ", "Withered Freddy", "Withered Bonnie", "Withered Chica", "Withered Foxy",
    "Withered Golden Freddy", "Bidibab", "Electrobab", "Minireena", "Bon Bon",
    "Bonnet", "Yenndo", "Music Man", "Glamrock Freddy", "Glamrock Chica",
    "Montegomery Gator", "Roxanne Wolf", "DJ Music Man", "Wind-Up Music Man",
    "Glitchtrap", "Dreadbear", "Vanny", "Helpi", "Burntrap", "Tangle", "Sun", "Moon",
    "STAFF Bot", "Map Bot", "Mask Bot", "The Mimic", "Shattered Roxy", "Shattered Monty",
    "Shattered Chica", "Glamrock Bonnie", "MXES", "Ruined Chica", "Ruined Roxy", "Ruined Monty",
    "Ruined DJ Music Man", "Ruined Wind-Up Music Man", "Nightmare Staff Bot", 
    "Jack-O-Chica", "Jack-O-Bonnie", "Nightmarionne", "Plushtrap", "Security Puppet", "Captain Foxy",
    "Jack-O-Moon", "Eclipse", "Ruined Freddy", "Springbonnie", "Fredbear", "Mystic Hippo", "Wet Floor Bot",
    "Freddy Frostbear", "8-Bit Baby", "Endo-01", "Endo-02", "Nightmare Endo", "Glamrock Endo", "Freddles",
    "Grimm Foxy", "Lolbit", "Lemonade Clown", "Fruit Punch Clown", "Jackie", "Head Chef Bot", "Hand Unit",
    "Mr Cupcake", "Nightmare Cupcake", "Jack-O-Lantern", "Hand Unit", "Dark Freddy", "Neon Bonnie", "Neon Chica",
    "Burnt Foxy", "Shadow Mangle", "Dark Foxy", "Party Freddy", "Bucket Bob", "Mr Can-Do", "Number 1 Crate", "Pan Stan",
    "Paper Pals", "Candy Cadet", "El Chip", "Tilt", "Phone Guy", "Phone Dude", "Gregory", "Vanessa", "Michael Afton", 
    "Cassie", "Jeremy Fitzgerald", "Elizabeth Afton", "William Afton", "Crying Child"
];

let chosenName, guessedLetters, attempts, display;

function initializeGame() {
    chosenName = fnaf[Math.floor(Math.random() * fnaf.length)].toLowerCase(); // Lowercase for comparison
    guessedLetters = new Set();
    attempts = 7;
    display = chosenName.split("").map(char => (/[a-z]/.test(char) ? "_" : char)); // Keep spaces visible
    updateDisplay();
    document.getElementById("message").textContent = "";
    document.getElementById("restart-button").style.display = "none";
}

function handleGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toLowerCase(); // Convert to lowercase for comparison
    guessInput.value = "";

    if (!guess) {
        document.getElementById("message").textContent = "Please enter a valid guess.";
        return;
    }

    // Full name guess
    if (guess === chosenName) {
        document.getElementById("message").textContent = `Congratulations! You guessed it: ${capitalize(chosenName)}`;
        endGame();
        return;
    }

    // Single letter guess
    if (guess.length === 1 && /[a-z]/.test(guess)) {
        if (guessedLetters.has(guess)) {
            document.getElementById("message").textContent = `You already guessed '${guess.toUpperCase()}'. Try again!`;
        } else if (chosenName.includes(guess)) {
            guessedLetters.add(guess);
            document.getElementById("message").textContent = `Good guess! '${guess.toUpperCase()}' is in the name.`;
            updateDisplayForCorrectGuess(guess);
        } else {
            guessedLetters.add(guess);
            attempts--;
            document.getElementById("message").textContent = `Sorry, '${guess.toUpperCase()}' is not in the name.`;
        }
    } else {
        document.getElementById("message").textContent = "Invalid input. Please guess a single letter or the full name.";
    }

    updateDisplay();

    // Check for win or loss
    if (!display.includes("_")) {
        document.getElementById("message").textContent = `Congratulations! You guessed it: ${capitalize(chosenName)}`;
        endGame();
    } else if (attempts === 0) {
        document.getElementById("message").textContent = `Game over! The character was: ${capitalize(chosenName)}`;
        endGame();
    }
}

function updateDisplay() {
    document.getElementById("display").textContent = display.join(" ");
    document.getElementById("guessed-letters").textContent = Array.from(guessedLetters).join(", ").toUpperCase();
    document.getElementById("attempts").textContent = attempts;
}

function updateDisplayForCorrectGuess(letter) {
    chosenName.split("").forEach((char, index) => {
        if (char === letter) display[index] = letter;
    });
}

function capitalize(name) {
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function endGame() {
    document.getElementById("restart-button").style.display = "inline-block";
}

document.getElementById("guess-button").addEventListener("click", handleGuess);
document.getElementById("restart-button").addEventListener("click", initializeGame);

// Listen for the "Enter" key on the input field
document.getElementById("guess-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});

initializeGame();
