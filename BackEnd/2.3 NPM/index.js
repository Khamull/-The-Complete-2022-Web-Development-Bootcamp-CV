 var generateName = require("sillyname");
//import generateName from "sillyName";

var sillyName = generateName();

console.log(`My name is ${sillyName}.`);
//superheroes simply does not work
const superheroes = require("superheroes");
//import superheroes from "superheroes";

const name = superheroes.random();
console.log(`I am ${name}!`);
