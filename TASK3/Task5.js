function absMe(...args) {
    if (args.length === 0) return 0;
    if (args.length === 1) return Math.abs(args[0]);
    return args.map(num => Math.abs(num));
}

function ceilMe(...args) {
    if (args.length === 0) return 0;
    if (args.length === 1) return Math.ceil(args[0]);
    return args.map(num => Math.ceil(num));
}

function floorMe(...args) {
    if (args.length === 0) return 0;
    if (args.length === 1) return Math.floor(args[0]);
    return args.map(num => Math.floor(num));
}


console.log(absMe());            
console.log(absMe(-5));          
console.log(absMe(-5, 3.2));     

console.log(ceilMe());          
console.log(ceilMe(4.1));      
console.log(ceilMe(4.1, 4.9));   

console.log(floorMe());          
console.log(floorMe(4.9));       
console.log(floorMe(4.9, 4.1));  
