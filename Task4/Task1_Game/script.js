// Simple Color Memory Game
var colors = ['red', 'blue', 'green', 'yellow'];
var sequence = [];
var playerSequence = [];
var level = 1;
var score = 0;
var isPlaying = false;

// Get HTML elements
var startBtn = document.getElementById('start-btn');
var resetBtn = document.getElementById('reset-btn');
var showSequenceBtn = document.getElementById('show-sequence-btn');
var levelDisplay = document.getElementById('level');
var scoreDisplay = document.getElementById('score');
var gameStatus = document.getElementById('game-status');
var colorButtons = document.querySelectorAll('.color-btn');

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    showSequenceBtn.addEventListener('click', showSequence);
    
    colorButtons.forEach(function(btn) {
        btn.addEventListener('click', handleColorClick);
    });
});

// Update game status message
function updateGameStatus(message) {
    gameStatus.textContent = message;
}

// Show the sequence to player
function showSequence() {
    showSequenceBtn.disabled = true;
    disableColorButtons();
    updateGameStatus('Watch the sequence carefully...');
    
    var index = 0;
    var timer = setInterval(function() {
        if (index < sequence.length) {
            flashColor(sequence[index]);
            index++;
        } else {
            clearInterval(timer);
            updateGameStatus('Now repeat the sequence!');
            enableColorButtons();
            showSequenceBtn.disabled = false;
        }
    }, 600);
}

// Flash a color
function flashColor(color) {
    var button = document.getElementById(color);
    button.classList.add('active');
    
    setTimeout(function() {
        button.classList.remove('active');
    }, 300);
}

// Handle color button clicks
function handleColorClick(event) {
    if (!isPlaying) return;
    
    var clickedColor = event.target.dataset.color;
    playerSequence.push(clickedColor);
    
    flashColor(clickedColor);
    checkSequence();
}

// Check if player sequence is correct
function checkSequence() {
    var currentIndex = playerSequence.length - 1;
    var expectedColor = sequence[currentIndex];
    var clickedColor = playerSequence[currentIndex];
    
    if (clickedColor !== expectedColor) {
        gameOver();
        return;
    }
    
    // If sequence is complete, move to next level
    if (playerSequence.length === sequence.length) {
        levelComplete();
    }
}

// Complete current level
function levelComplete() {
    score += level * 10;
    updateScore();
    updateGameStatus('Level ' + level + ' Complete! Great job!');
    
    setTimeout(function() {
        level++;
        updateLevel();
        playerSequence = [];
        addToSequence();
        updateGameStatus('Starting Level ' + level + '...');
        
        setTimeout(function() {
            showSequence();
        }, 1000);
    }, 1500);
}

// Game over
function gameOver() {
    isPlaying = false;
    disableColorButtons();
    startBtn.disabled = false;
    resetBtn.disabled = false;
    showSequenceBtn.disabled = true;
    
    updateGameStatus('Game Over! Final Score: ' + score);
    playerSequence = [];
}

// Add new color to sequence
function addToSequence() {
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

// Start the game
function startGame() {
    isPlaying = true;
    sequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    
    updateLevel();
    updateScore();
    updateGameStatus('Game Starting...');
    
    startBtn.disabled = true;
    resetBtn.disabled = false;
    showSequenceBtn.disabled = false;
    
    setTimeout(function() {
        addToSequence();
        showSequence();
    }, 1000);
}

// Reset the game
function resetGame() {
    isPlaying = false;
    sequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    
    updateLevel();
    updateScore();
    updateGameStatus('Game Reset! Click "Start Game" to begin!');
    
    startBtn.disabled = false;
    resetBtn.disabled = true;
    showSequenceBtn.disabled = true;
    
    enableColorButtons();
}

// Update level display
function updateLevel() {
    levelDisplay.textContent = level;
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Disable color buttons
function disableColorButtons() {
    colorButtons.forEach(function(btn) {
        btn.classList.add('disabled');
    });
}

// Enable color buttons
function enableColorButtons() {
    colorButtons.forEach(function(btn) {
        btn.classList.remove('disabled');
    });
}
