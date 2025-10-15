class FlightManagementSystem {
    constructor() {
        this.flightQueue = [];
        this.aircraftInAir = [];
        this.completedFlights = [];
        this.isOperating = false;
        this.flightCounter = 1;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateStatus();
    }
    
    initializeElements() {
        this.addFlightBtn = document.getElementById('add-flight-btn');
        this.startTakeoffBtn = document.getElementById('start-takeoff-btn');
        this.emergencyLandingBtn = document.getElementById('emergency-landing-btn');
        this.resetBtn = document.getElementById('reset-btn');
        
        this.flightQueueElement = document.getElementById('flight-queue');
        this.aircraftInAirElement = document.getElementById('aircraft-in-air');
        this.aircraftOnGroundElement = document.getElementById('aircraft-on-ground');
        
        this.currentOperationElement = document.getElementById('current-operation');
        this.queueCountElement = document.getElementById('queue-count');
        this.airCountElement = document.getElementById('air-count');
        this.completedCountElement = document.getElementById('completed-count');
    }
    
    attachEventListeners() {
        this.addFlightBtn.addEventListener('click', () => this.addFlightToQueue());
        this.startTakeoffBtn.addEventListener('click', () => this.startTakeoffSequence());
        this.emergencyLandingBtn.addEventListener('click', () => this.emergencyLanding());
        this.resetBtn.addEventListener('click', () => this.resetSystem());
    }
    
    // Callback function to update system status
    updateStatus() {
        this.currentOperationElement.textContent = this.isOperating ? 'Operating' : 'Idle';
        this.queueCountElement.textContent = this.flightQueue.length;
        this.airCountElement.textContent = this.aircraftInAir.length;
        this.completedCountElement.textContent = this.completedFlights.length;
        
        // Update button states
        this.startTakeoffBtn.disabled = this.flightQueue.length === 0 || this.isOperating;
        this.emergencyLandingBtn.disabled = this.aircraftInAir.length === 0 || this.isOperating;
    }
    
    // Callback function to add flight to queue
    addFlightToQueue() {
        const flight = {
            id: `FL${this.flightCounter.toString().padStart(3, '0')}`,
            name: `Flight ${this.flightCounter}`,
            status: 'queued'
        };
        
        this.flightQueue.push(flight);
        this.flightCounter++;
        this.renderFlightQueue();
        this.updateStatus();
        
        console.log(`Added ${flight.id} to queue`);
    }
    
    // Callback function to render flight queue
    renderFlightQueue() {
        this.flightQueueElement.innerHTML = '';
        
        this.flightQueue.forEach((flight, index) => {
            const flightElement = document.createElement('div');
            flightElement.className = `flight-item ${index === 0 ? 'active' : ''}`;
            flightElement.innerHTML = `
                <span>${flight.id}</span>
                <span>${flight.name}</span>
            `;
            this.flightQueueElement.appendChild(flightElement);
        });
    }
    
    // Async function to start takeoff sequence
    async startTakeoffSequence() {
        if (this.flightQueue.length === 0 || this.isOperating) return;
        
        this.isOperating = true;
        this.updateStatus();
        
        // Process flights one by one with async/await
        while (this.flightQueue.length > 0) {
            const flight = this.flightQueue.shift();
            await this.processTakeoff(flight);
            
            // Wait between takeoffs
            await this.delay(2000);
        }
        
        this.isOperating = false;
        this.updateStatus();
        this.renderFlightQueue();
    }
    
    // Async function to process individual takeoff
    async processTakeoff(flight) {
        console.log(`Starting takeoff for ${flight.id}`);
        
        // Create aircraft element
        const aircraft = this.createAircraft(flight);
        this.aircraftOnGroundElement.appendChild(aircraft);
        
        // Wait for aircraft to be positioned
        await this.delay(500);
        
        // Start takeoff animation
        aircraft.classList.add('taking-off');
        
        // Wait for takeoff animation to complete
        await this.delay(3000);
        
        // Move aircraft to air
        this.aircraftOnGroundElement.removeChild(aircraft);
        aircraft.classList.remove('taking-off');
        aircraft.classList.add('flying');
        this.aircraftInAirElement.appendChild(aircraft);
        
        // Add to in-air list
        this.aircraftInAir.push(flight);
        this.updateStatus();
        
        // Start flying animation
        await this.delay(4000);
        
        // Complete flight
        await this.completeFlight(flight, aircraft);
    }
    
    // Async function to complete flight
    async completeFlight(flight, aircraft) {
        console.log(`Completing flight ${flight.id}`);
        
        // Remove from air
        this.aircraftInAirElement.removeChild(aircraft);
        this.aircraftInAir = this.aircraftInAir.filter(f => f.id !== flight.id);
        
        // Add to completed
        this.completedFlights.push(flight);
        this.updateStatus();
    }
    
    // Async function for emergency landing
    async emergencyLanding() {
        if (this.aircraftInAir.length === 0 || this.isOperating) return;
        
        this.isOperating = true;
        this.updateStatus();
        
        console.log('Emergency landing initiated!');
        
        // Land all aircraft in air
        const aircraftToLand = [...this.aircraftInAir];
        
        for (const flight of aircraftToLand) {
            await this.emergencyLandAircraft(flight);
            await this.delay(1000);
        }
        
        this.isOperating = false;
        this.updateStatus();
    }
    
    // Async function to land individual aircraft
    async emergencyLandAircraft(flight) {
        console.log(`Emergency landing for ${flight.id}`);
        
        // Find aircraft element
        const aircraft = this.aircraftInAirElement.querySelector(`[data-flight-id="${flight.id}"]`);
        if (!aircraft) return;
        
        // Remove flying animation and add landing
        aircraft.classList.remove('flying');
        aircraft.classList.add('landing');
        
        // Wait for landing animation
        await this.delay(3000);
        
        // Move to ground
        this.aircraftInAirElement.removeChild(aircraft);
        aircraft.classList.remove('landing');
        this.aircraftOnGroundElement.appendChild(aircraft);
        
        // Update status
        this.aircraftInAir = this.aircraftInAir.filter(f => f.id !== flight.id);
        this.completedFlights.push(flight);
        this.updateStatus();
        
        // Remove aircraft after a delay
        setTimeout(() => {
            if (aircraft.parentNode) {
                aircraft.parentNode.removeChild(aircraft);
            }
        }, 2000);
    }
    
    // Callback function to create aircraft element
    createAircraft(flight) {
        const aircraft = document.createElement('div');
        aircraft.className = 'aircraft';
        aircraft.setAttribute('data-flight-id', flight.id);
        aircraft.style.left = '50px';
        aircraft.style.bottom = '0px';
        aircraft.title = `${flight.id} - ${flight.name}`;
        return aircraft;
    }
    
    // Promise-based delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Callback function to reset system
    resetSystem() {
        console.log('Resetting flight management system');
        
        // Clear all arrays
        this.flightQueue = [];
        this.aircraftInAir = [];
        this.completedFlights = [];
        this.isOperating = false;
        this.flightCounter = 1;
        
        // Clear DOM elements
        this.flightQueueElement.innerHTML = '';
        this.aircraftInAirElement.innerHTML = '';
        this.aircraftOnGroundElement.innerHTML = '';
        
        // Update status
        this.updateStatus();
        
        console.log('System reset complete');
    }
    
    // Callback function for system notifications
    notify(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // You could add a notification system here
        // For now, we'll just log to console
    }
}

// Initialize the flight management system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const flightSystem = new FlightManagementSystem();
    
    // Add some demo flights
    setTimeout(() => {
        flightSystem.addFlightToQueue();
        flightSystem.addFlightToQueue();
        flightSystem.addFlightToQueue();
    }, 1000);
});
