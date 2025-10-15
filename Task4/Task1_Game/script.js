class ColorMemoryGame {
    constructor() {
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        this.isPlaying = false;
        this.isShowingSequence = false;
        
        this.initializeElements();
        this.attachEventListeners();
    }
    
    initializeElements() {
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.showSequenceBtn = document.getElementById('show-sequence-btn');
        this.levelDisplay = document.getElementById('level');
        this.scoreDisplay = document.getElementById('score');
        this.gameStatus = document.getElementById('game-status');
        this.colorButtons = document.querySelectorAll('.color-btn');
    }
    
    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.showSequenceBtn.addEventListener('click', () => this.showSequence());
        
        this.colorButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleColorClick(e));
        });
    }
    
    // Callback function for updating game status
    updateGameStatus(message, type = 'info') {
        this.gameStatus.textContent = message;
        this.gameStatus.className = `alert alert-${type} game-status-${type}`;
    }
    
    // Async function to show sequence with delays
    async showSequence() {
        if (this.isShowingSequence) return;
        
        this.isShowingSequence = true;
        this.showSequenceBtn.disabled = true;
        this.disableColorButtons();
        
        this.updateGameStatus('Watch the sequence carefully...', 'info');
        
        // Use async/await with setTimeout wrapped in Promise
        for (let i = 0; i < this.sequence.length; i++) {
            const color = this.sequence[i];
            await this.flashColor(color);
            await this.delay(300); // Wait between flashes
        }
        
        this.updateGameStatus('Now repeat the sequence!', 'success');
        this.enableColorButtons();
        this.isShowingSequence = false;
        this.showSequenceBtn.disabled = false;
    }
    
    // Promise-based delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Async function to flash a color
    async flashColor(color) {
        return new Promise((resolve) => {
            const button = document.getElementById(color);
            button.classList.add('active', 'flash');
            
            // Callback function to remove flash effect
            setTimeout(() => {
                button.classList.remove('active', 'flash');
                resolve();
            }, 200);
        });
    }
    
    // Callback function for handling color clicks
    handleColorClick(event) {
        if (!this.isPlaying || this.isShowingSequence) return;
        
        const clickedColor = event.target.dataset.color;
        this.playerSequence.push(clickedColor);
        
        // Flash the clicked color
        this.flashColor(clickedColor);
        
        // Check if the sequence is correct
        this.checkSequence();
    }
    
    // Callback function to check if player sequence matches
    checkSequence() {
        const currentIndex = this.playerSequence.length - 1;
        const expectedColor = this.sequence[currentIndex];
        const clickedColor = this.playerSequence[currentIndex];
        
        if (clickedColor !== expectedColor) {
            this.gameOver();
            return;
        }
        
        // If sequence is complete, move to next level
        if (this.playerSequence.length === this.sequence.length) {
            this.levelComplete();
        }
    }
    
    // Async function for level completion
    async levelComplete() {
        this.score += this.level * 10;
        this.updateScore();
        
        this.updateGameStatus(`Level ${this.level} Complete! Great job!`, 'success');
        
        // Wait a bit before starting next level
        await this.delay(1500);
        
        this.level++;
        this.updateLevel();
        this.playerSequence = [];
        this.addToSequence();
        
        this.updateGameStatus(`Starting Level ${this.level}...`, 'info');
        await this.delay(1000);
        
        this.showSequence();
    }
    
    // Callback function for game over
    gameOver() {
        this.isPlaying = false;
        this.disableColorButtons();
        this.startBtn.disabled = false;
        this.resetBtn.disabled = false;
        this.showSequenceBtn.disabled = true;
        
        this.updateGameStatus(`Game Over! Final Score: ${this.score}`, 'error');
        
        // Reset player sequence
        this.playerSequence = [];
    }
    
    // Callback function to add new color to sequence
    addToSequence() {
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.sequence.push(randomColor);
    }
    
    // Async function to start the game
    async startGame() {
        this.isPlaying = true;
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        
        this.updateLevel();
        this.updateScore();
        this.updateGameStatus('Game Starting...', 'info');
        
        this.startBtn.disabled = true;
        this.resetBtn.disabled = false;
        this.showSequenceBtn.disabled = false;
        
        // Wait a moment before starting
        await this.delay(1000);
        
        this.addToSequence();
        this.showSequence();
    }
    
    // Callback function to reset the game
    resetGame() {
        this.isPlaying = false;
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        
        this.updateLevel();
        this.updateScore();
        this.updateGameStatus('Game Reset! Click "Start Game" to begin!', 'info');
        
        this.startBtn.disabled = false;
        this.resetBtn.disabled = true;
        this.showSequenceBtn.disabled = true;
        
        this.enableColorButtons();
    }
    
    // Callback functions for UI updates
    updateLevel() {
        this.levelDisplay.textContent = this.level;
    }
    
    updateScore() {
        this.scoreDisplay.textContent = this.score;
    }
    
    disableColorButtons() {
        this.colorButtons.forEach(btn => {
            btn.classList.add('disabled');
        });
    }
    
    enableColorButtons() {
        this.colorButtons.forEach(btn => {
            btn.classList.remove('disabled');
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ColorMemoryGame();
});
