import dom from '../../js/domElements.js'

dom.setupBasicPage();
dom.setupLogo("../../css/javascript-736401_1280.png");

const navbar = document.querySelector(".navbar");
const page = document.querySelector(".page");
const sidebar = document.querySelector(".SideBar");
const rightsideBar = document.querySelector(".rightsideBarDiv");

let lastAppendedID = 0; 

const Title = document.createElement("h1")
Title.textContent = "Esta página explicará los conceptos básicos de JavaScript y Node. " //this page will explain the basics of javascript and node 

navbar.appendChild(dom.navbar());
page.appendChild(Title);

page.appendChild(dom.createSection("functions",lastAppendedID++,"functions"));

const functionsSectionDescription = "En JavaScript y Node utilizamos funciones, que son lo que JavaScript denomina métodos. /n Una función se ve así:"

page.appendChild(dom.textBox("que es una function?",functionsSectionDescription));

page.appendChild(dom.codeRunner("Función básica",
    "function calculadora(){\n  return 5 + 5\n}", 
    "10"
));

page.appendChild(dom.textBox("Funciónes con Parámetros","Las funciones también pueden tener parámetros como este"));


page.appendChild(dom.codeRunner("Parámetros ejemplo",
    "function calculadora(num1,num2){\n  return num1 + num2\n}\n calculadora(10,10);", 
    "el retorno sería: 10"
));

page.appendChild(dom.textBox("Función anónima","Las funciones anónimas son funciones que no tienen un nombre"));

page.appendChild(dom.codeRunner("Función anónima ejemplo",
    "const obtenerFunciónAnónimaAleatoria = function (min, max) {\n return Math.floor(Math.random() * (max + 1 - min) + min)\n}\n getRandomAnonymousFunction(10,10);", 
    "el retorno podría ser ya que usamos random: 14"
));
const getRandomAnonymousFunction = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

console.log("getRandomAnonymousFunction",getRandomAnonymousFunction(1,10))

page.appendChild(dom.createSection("Funciones de flecha",lastAppendedID++,"Funciones de flecha"));


page.appendChild(dom.textBox("Funciones de flecha","Las funciones de flecha son una forma de escribir funciones de una manera más corta. y a menudo los usamos para funciones de devolución de llamada, que veremos más adelante."));


page.appendChild(dom.codeRunner("Aquí está la misma función de antes pero como una función de flecha",
    "const getRandomAnonymousFunction = (min, max) =>\n Math.floor(Math.random() * (max + 1 - min) + min);\n getRandomAnonymousFunction(1,10);", 
    "el retorno podría ser ya que usamos random: 8"
));

page.appendChild(dom.textBox("Las Funciones de flecha no es lamda in el java","Las funciones de flecha pueden parecerse mucho a lamda en java, pero no son lo mismo.")); //Arrow Functions may look a lot like lamda in java but they are not the same 


page.appendChild(dom.createSection("función de devolución de llamada",lastAppendedID++,"función de devolución de llamada"));

page.appendChild(dom.textBox("Una función de devolución de llamada","Una función de devolución de llamada o también llamada función de orden superior es una función que toma otra función como argumento")); //A callback function or also called a higher order function is a function that takes another function as an argument

page.appendChild(dom.codeRunner("Aquí hay un ejemplo de cómo usar una función de devolución de llamada",
    "function ejecutanteDeAcciónGenérico(name, action) {\n return action(name)\n}\nfunction acciónDeCocción(name) {\nreturn `${name} disfruta cocinar.`\n}\nconsole.log(ejecutanteDeAcciónGenérico(Martin,acciónDeCocción))", 
    "martin disfruta cocinar."
));

page.appendChild(dom.createSection("Bucles",lastAppendedID++,"Bucles")); 

page.appendChild(dom.textBox("Bucles in javascript","Los bucles son algo que usamos muy a menudo en javascript, ahora repasaremos los tipos más comunes y cuándo se usan.")); //Loops are something we use very often in javascript, we will now go over the most common types and when they are used 

page.appendChild(dom.codeRunner(".map en bucle",
    "const numbers = [1, 2, 3, 4, 5];\nconst doubledNumbers = numbers.map((number) => number * 2);\nconsole.log(doubledNumbers)", 
    "doubledNumbers = [2, 4, 6, 8, 10]"
));

page.appendChild(dom.textBox(".map Explicación","arriba tenemos el método.map, que no convierte la matriz en un mapa. en su lugar, recorre la matriz y aplica nuestra función de devolución de llamada en cada elemento y devuelve una nueva matriz")); //above we have the .map method, which does not convert the array to a map. it instead loops over the array and apply our call back function on each element and return a new array 

page.appendChild(dom.codeRunner(".forEach en bucle",
    "const numbers = [1, 2, 3, 4, 5];\nconst printStatements = numbers.forEach(number =>{\nconsole.log(number)\n})\n", 
    "1 2 3 4 5"
));

page.appendChild(dom.textBox(".forEach Explicación","con forEach simplemente recorremos cada elemento y hacemos algo para cada elemento, sin embargo, no devolvemos una nueva lista después. Úsalo cuando no te importen los valores después")); //with forEach we just loop over each element and do something for each element, however we do not return a new list after. use it when you don't care about the values afterwards

//need the rest of the loops later but is so boring 

const memes = await dom.getAddsForRightSideBar();

dom.populateRightSideBar(memes);


sidebar.appendChild(dom.createSidebar(page));



