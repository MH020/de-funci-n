import dom from './domElements.js'


const navbar = document.getElementById("navbar");
const page = document.getElementById("page");


const welcomeTitle = document.createElement("h1")
welcomeTitle.textContent = "Bienvenido a mi documentación sobre Node"

navbar.appendChild(dom.navbar());
page.appendChild(welcomeTitle);
page.appendChild(dom.textBox("Title text","hola me amigos"))
page.appendChild(dom.textBox("2end title","more text new"))




