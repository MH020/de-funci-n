import dom from '../../js/domElements.js'

dom.setupBasicPage();
dom.setupLogo("../../css/javascript-736401_1280.png")

const navbar = document.querySelector(".navbar");
const page = document.querySelector(".page");
const sidebar = document.querySelector(".SideBar");


const welcomeTitle = document.createElement("h1")
welcomeTitle.textContent = "Bienvenido a mi documentación sobre Node"

navbar.appendChild(dom.navbar());
page.appendChild(welcomeTitle);

const welcomeText = "Bienvenidos a mi página de documentación para la primera mitad del semestre de nodos de 2025 en EK" + " " +
    "Esta página tiene como objetivo documentar los temas que hemos tratado en clase hasta ahora. Intentaré ofrecer una descripción detallada de cada elemento utilizado" + " " +
    "con ejemplos de código cuando sea necesario. Esta página también muestra información relevante sobre los comandos de terminal que hemos aprendido hasta ahora," + " " +
    "asi como las tecnologías utilizadas"; 

    const githubInfo = "todo este código estará en mi GitHub, donde también tengo muchas otras cosas."

page.appendChild(dom.textBox("el propósito",welcomeText,1,"welcomeText"))

const githubTextbox = dom.textBox("Información de GitHub",githubInfo,2,"githubInfo")
page.appendChild(githubTextbox)

const githubLink = document.createElement("a")
githubLink.textContent = "https://github.com/MH020"
githubLink.href = "https://github.com/MH020"
githubTextbox.appendChild(githubLink)

const memes = await dom.getAddsForRightSideBar();

dom.populateRightSideBar(memes);

sidebar.appendChild(dom.createSidebar(page));





