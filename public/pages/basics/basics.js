import dom from '../../js/domElements.js'

dom.setupBasicPage();
dom.setupLogo("../../css/javascript-736401_1280.png");

const navbar = document.querySelector(".navbar");
const page = document.querySelector(".page");
const sidebar = document.querySelector(".SideBar");
const rightsideBar = document.querySelector(".rightsideBarDiv");

const Title = document.createElement("h1")
Title.textContent = "Esta página explicará los conceptos básicos de JavaScript y Node. " //this page will explain the basics of javascript and node 

navbar.appendChild(dom.navbar());
page.appendChild(Title);

page.appendChild(dom.createSection("functions",1,"functions"));

const functionsSectionDescription = "En JavaScript y Node utilizamos funciones, que son lo que JavaScript denomina métodos. /n Una función se ve así:"

page.appendChild(dom.textBox("que es una function?",functionsSectionDescription));

const basicFunctionExample = dom.codeRunner("Función básica",
    "function calculadora(){\n  return 5 + 5\n}", 
    "10"
);
page.appendChild(basicFunctionExample)

page.appendChild(dom.textBox("Funciónes con Parámetros","Las funciones también pueden tener parámetros como este"))

sidebar.appendChild(dom.createSidebar(page));



