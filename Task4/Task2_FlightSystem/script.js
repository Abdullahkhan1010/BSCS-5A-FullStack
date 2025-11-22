// Very Simple Flight System
var flightQueue = [];
var flightCounter = 1;
var isProcessing = false;

// Get buttons and display elements
var addFlightBtn = document.getElementById('add-flight-btn');
var startTakeoffBtn = document.getElementById('start-takeoff-btn');
var resetBtn = document.getElementById('reset-btn');
var flightQueueElement = document.getElementById('flight-queue');
var aircraftOnGroundElement = document.getElementById('aircraft-on-ground');

// Setup when page loads
document.addEventListener('DOMContentLoaded', function() {
    addFlightBtn.addEventListener('click', addFlight);
    startTakeoffBtn.addEventListener('click', startTakeoffs);
    resetBtn.addEventListener('click', resetSystem);
});

// Add a new flight to queue
function addFlight() {
    var flight = {
        id: 'Flight-' + flightCounter,
        name: 'Flight ' + flightCounter
    };
    
    flightQueue.push(flight);
    flightCounter++;
    
    showQueue();
    console.log('Added: ' + flight.id);
}

// Show the flight queue
function showQueue() {
    flightQueueElement.innerHTML = '';
    
    for (var i = 0; i < flightQueue.length; i++) {
        var flight = flightQueue[i];
        var div = document.createElement('div');
        div.className = 'flight-item';
        div.textContent = flight.id;
        flightQueueElement.appendChild(div);
    }
}

// Start processing takeoffs one by one
function startTakeoffs() {
    if (flightQueue.length === 0 || isProcessing) {
        console.log('No flights or already processing');
        return;
    }
    
    isProcessing = true;
    startTakeoffBtn.disabled = true;
    
    // Process flights one by one using callback
    processNextFlight();
}

// Process next flight using callback
function processNextFlight() {
    if (flightQueue.length === 0) {
        isProcessing = false;
        startTakeoffBtn.disabled = false;
        console.log('All flights completed');
        return;
    }
    
    var flight = flightQueue.shift(); // Remove first flight
    showQueue(); // Update display
    
    console.log('Taking off: ' + flight.id);
    
    // Create airplane and start takeoff
    takeoffFlight(flight, function() {
        // Callback: After this flight completes, process next one
        setTimeout(function() {
            processNextFlight();
        }, 1000); // Wait 1 second between flights
    });
}

// Takeoff a single flight using async/await
async function takeoffFlight(flight, callback) {
    // Create airplane
    var airplane = document.createElement('div');
    airplane.className = 'airplane';
    airplane.textContent = flight.id;
    airplane.style.left = '50px';
    airplane.style.bottom = '50px';
    
    aircraftOnGroundElement.appendChild(airplane);
    
    // Wait a moment for airplane to appear
    await delay(500);
    
    // Start diagonal takeoff animation
    airplane.classList.add('taking-off');
    
    // Wait for takeoff to complete
    await delay(3000);
    
    // Remove airplane
    aircraftOnGroundElement.removeChild(airplane);
    
    console.log('Completed: ' + flight.id);
    
    // Call callback to continue with next flight
    callback();
}

// Simple delay function using Promise
function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

// Reset everything
function resetSystem() {
    flightQueue = [];
    flightCounter = 1;
    isProcessing = false;
    
    flightQueueElement.innerHTML = '';
    aircraftOnGroundElement.innerHTML = '';
    startTakeoffBtn.disabled = false;
    
    console.log('System reset');
}
