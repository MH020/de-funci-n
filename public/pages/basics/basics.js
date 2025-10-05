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

page.appendChild(dom.codeRunner("Aquí está la misma función de antes pero como una función de flecha",
    "function ejecutanteDeAcciónGenérico(name, action) {\n return action(name)\n}\nfunction acciónDeCocción(name) {\nreturn `${name} disfruta cocinar.`\n}\nconsole.log(ejecutanteDeAcciónGenérico(Martin,acciónDeCocción))", 
    "martin disfruta cocinar."
));


function genericActionPerformer(name, action) {
    return action(name) 
}

function acciónDeCocción(name) {
    return `${name} disfruta cocinar.`
}

console.log("callback output",genericActionPerformer("martin",acciónDeCocción))

const memes = await dom.getAddsForRightSideBar();

dom.populateRightSideBar(memes);


sidebar.appendChild(dom.createSidebar(page));



