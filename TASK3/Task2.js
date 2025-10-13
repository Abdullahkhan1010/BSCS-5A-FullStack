let givenPrime = 11; 

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

let nextPrime = givenPrime + 1;
while (true) {
    if (isPrime(nextPrime)) {
        console.log("The prime after " + givenPrime + " is " + nextPrime);
        break;
    }
    nextPrime++;
}
