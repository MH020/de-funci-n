import dom from './domElements.js'


const navbar = document.getElementById("navbar");
const page = document.getElementById("page");

navbar.appendChild(dom.navbar())
page.appendChild(dom.textBox("Title text","hola me amigos"))
page.appendChild(dom.textBox("2end title","more text new"))




