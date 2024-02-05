const maxChances = 10;
        let secretNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        let guessedNumbers = [];

        function checkGuess() {
            const userGuess = parseInt(document.getElementById('userGuess').value);
            if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
                alert("Please enter a valid number between 1 and 100.");
                return;
            }

            if (guessedNumbers.includes(userGuess)) {
                alert("You've already guessed this number. Try a different one.");
                return;
            }

            attempts++;
            guessedNumbers.push(userGuess);

            const resultElement = document.getElementById('result');
            const chancesElement = document.getElementById('chances');
            const guessesElement = document.getElementById('guesses');

            if (userGuess === secretNumber) {
                resultElement.innerHTML = `Congratulations! You guessed the correct number (${secretNumber}) in ${attempts} attempts. 😊`;
                resultElement.style.color = 'green';
                chancesElement.innerHTML = '';
                guessesElement.innerHTML = '';
            } else {
                const remainingChances = maxChances - attempts;
                const hint = userGuess < secretNumber ? 'Too low. ' : 'Too high. ';
                resultElement.innerHTML = `Incorrect guess. ${hint}Try again. 😔`;
                resultElement.style.color = 'darkred';
                chancesElement.innerHTML = `Chances remaining: ${remainingChances}`;
                guessesElement.innerHTML = `Guessed numbers: ${guessedNumbers.join(', ')}`;
                
                if (remainingChances === 0) {
                    resultElement.innerHTML = `Sorry, you've run out of chances. The correct number was ${secretNumber}. 😞`;
                    resultElement.style.color = 'darkred';
                    chancesElement.innerHTML = '';
                    guessesElement.innerHTML = '';
                }
            }
        }

        function resetGame() {
            attempts = 0;
            guessedNumbers = [];
            document.getElementById('userGuess').value = '';
            document.getElementById('result').innerHTML = '';
            document.getElementById('chances').innerHTML = '';
            document.getElementById('guesses').innerHTML = '';
            secretNumber = Math.floor(Math.random() * 100) + 1;
        }