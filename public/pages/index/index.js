import dom from '../../js/domElements.js'

dom.setupLogo('../../css/javascript-736401_1280.png')

const page = document.querySelector('.page')
const sidebar = document.querySelector('.SideBar')

const memes = await dom.getAddsForRightSideBar()

dom.populateRightSideBar(memes)

sidebar.appendChild(dom.createSidebar(page))
