function createPhoneNumber(numbers) {

    if (!Array.isArray(numbers) || numbers.length !== 10) {
        return "Invalid input: Please provide an array of 10 integers.";
    }

    return `(${numbers[0]}${numbers[1]}${numbers[2]}) ${numbers[3]}${numbers[4]}${numbers[5]}-${numbers[6]}${numbers[7]}${numbers[8]}${numbers[9]}`;
}

let arr = [1,2,3,4,5,6,7,8,9,0];
console.log(createPhoneNumber(arr));