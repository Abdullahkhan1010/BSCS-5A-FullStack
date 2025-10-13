console.log("Task 1");
var name = "Abdullah";
var age = 20;
var country = "Pakistan";

function fullDetails() {
  return `My name is ${name}, I'm ${age} years old and I live in ${country}.`;
}

console.log(fullDetails());

var biographyObject = {
    name: name,
    age: age,
    country: country,
    city: "Islamabad",
    address: {
        city: "Islamabad",
        country: country,
        area: "E-9"
    },
    degreeProgram: {
        university: "Air University",
        degree: "Computer Science",
        semester: 5
    }
};

console.log("\nBiography Object:");
console.log("Name: " + biographyObject.name);
console.log("Age: " + biographyObject.age);
console.log("Country: " + biographyObject.country);
console.log("City: " + biographyObject.address.city);
console.log("University: " + biographyObject.degreeProgram.university);
console.log("Degree: " + biographyObject.degreeProgram.degree);