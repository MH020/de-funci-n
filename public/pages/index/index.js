import dom from '../../js/domElements.js'

dom.setupLogo('../../css/javascript-736401_1280.png')

const page = document.querySelector('.page')
const sidebar = document.querySelector('.SideBar')

const memes = await dom.getAddsForRightSideBar()

dom.populateRightSideBar(memes)

sidebar.appendChild(dom.createSidebar(page))

document.querySelectorAll('.button').forEach(button => {
  const outputSelector = `.outputContainer[data-output="${button.dataset.output}"]`;
  const output = document.querySelector(outputSelector);

  button.addEventListener('click', () => {
    const isVisible = output.style.display === 'block';
    output.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'show solution' : 'hide solution';
  });
});

