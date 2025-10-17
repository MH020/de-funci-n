function setupBasicPage () {
  const navbarDiv = document.createElement('div')
  navbarDiv.classList.add('navbar')
  const mainContainer = document.createElement('div')
  mainContainer.classList.add('mainContainer')

  const sideBarDiv = document.createElement('div')
  sideBarDiv.classList.add('SideBar')

  const rightsideBarDiv = document.createElement('div')
  rightsideBarDiv.classList.add('rightsideBarDiv')

  const pageDiv = document.createElement('div')
  pageDiv.classList.add('page')

  mainContainer.appendChild(sideBarDiv)
  mainContainer.appendChild(pageDiv)
  mainContainer.appendChild(rightsideBarDiv)

  document.body.appendChild(navbarDiv)
  document.body.appendChild(mainContainer)
}

function setupLogo (href) {
  const favicon = document.createElement('link')
  favicon.rel = 'icon'
  favicon.href = href

  document.head.appendChild(favicon)
}

function navbar () {
  const navbar = document.createElement('nav')
  navbar.classList.add('navbar')

  const links = [
    { text: 'home', href: '/' },
    { text: 'Lo básico', href: '/basics' },
    { text: 'lesson2', href: '/' },
    { text: 'snake Game!', href: '/snakegame'}

  ]

  links.forEach(link => {
    const anchorTag = document.createElement('a')
    anchorTag.textContent = link.text
    anchorTag.href = link.href
    navbar.appendChild(anchorTag)
  })

  return navbar
}

function createSection (title, id, idIdentifier) {
  const newSection = document.createElement('div')
  newSection.id = id
  newSection.dataset.idIdentifier = idIdentifier

  const sectionTitle = document.createElement('h2')
  sectionTitle.textContent = title
  sectionTitle.classList.add('SectionTitle')

  newSection.appendChild(sectionTitle)

  return newSection
}

function textBox (titleText, textinput) {
  const textBoxContainer = document.createElement('div')
  textBoxContainer.classList.add('textbox')

  const title = document.createElement('h3')
  title.classList.add('textboxTitle')
  title.textContent = titleText || 'title not given'
  textBoxContainer.appendChild(title)

  const text = document.createElement('p')
  text.classList.add('Textboxtext')
  text.textContent = textinput || 'text not given'
  textBoxContainer.appendChild(text)

  return textBoxContainer
}

function textSplitter (text) {
  const textArray = []
  let start = 0

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      textArray.push(text.slice(start, i))
      start = i + 1
    }
  }
  if (start < text.length) {
    textArray.push(text.slice(start))
  }
  return textArray
}

function codeRunner (titleText, inputCode, outputCode) {
  const inputTextArray = textSplitter(inputCode)
  const outputTextArray = textSplitter(outputCode)

  const codeContainer = document.createElement('div')
  codeContainer.classList.add('codeContainer')

  const title = document.createElement('h3')
  title.textContent = titleText || 'title not given'
  title.classList.add('codeRunnerTitle')
  codeContainer.appendChild(title)

  const inputContainer = document.createElement('div')
  inputContainer.classList.add('inputContainer')
  codeContainer.appendChild(inputContainer)

  inputTextArray.forEach(element => {
    const inputCodeText = document.createElement('p')
    inputCodeText.textContent = element || 'no output code'
    inputContainer.appendChild(inputCodeText)
  })

  const outputContainer = document.createElement('div')
  outputContainer.classList.add('inputContainer')

  outputTextArray.forEach(element => {
    const outputCodeText = document.createElement('p')
    outputCodeText.textContent = element || 'no output code'
    outputContainer.appendChild(outputCodeText)
  })

  let displayed = false

  const runButton = document.createElement('button')
  runButton.textContent = 'show solution'
  runButton.classList.add('button')
  codeContainer.appendChild(runButton)

  runButton.addEventListener('click', () => {
    if (displayed === false) {
      codeContainer.appendChild(outputContainer)
      displayed = true
    } else {
      outputContainer.remove()
      displayed = false
    }
  })

  return codeContainer
}

function createSidebar (htmlElement) {
  const sidebarContainer = document.createElement('div')
  sidebarContainer.classList.add('sidebarContainer')

  const elementIDs = htmlElement.querySelectorAll('[id]')

  elementIDs.forEach(element => {
    const textboxTitle = element.querySelector('h3');

    const anchorTag = document.createElement('a')
    anchorTag.textContent = textboxTitle.textContent
    anchorTag.href = `#${element.id}`
    anchorTag.classList.add('sidebarLink');

    const anchorHolder = document.createElement('div')
    anchorHolder.appendChild(anchorTag)
    anchorHolder.classList.add('sidebarItem');
    sidebarContainer.appendChild(anchorHolder)

  })

  return sidebarContainer
}

async function getAddsForRightSideBar () {
  const rightSidebar = document.querySelector('.rightsideBarDiv')
  const sideBarHight = rightSidebar.clientHeight

  const adHight = 300

  const totalAds = Math.floor(sideBarHight / adHight)
  console.log(totalAds)

  const response = await fetch(`/api/ads?totalAds=${totalAds}`) //did we post ? why ? 

  const data = await response.json()
  return data.memes || [data]
}

function populateRightSideBar (memes) {
  const rightSidebar = document.querySelector('.rightsideBarDiv')

  memes.forEach(meme => {
    const memeContainer = document.createElement('img')
    memeContainer.classList.add('meme')
    memeContainer.src = meme.url
    memeContainer.alt = 'a very funny meme'
    rightSidebar.appendChild(memeContainer)
  })
}

export default {
  setupBasicPage,
  setupLogo,
  navbar,
  createSection,
  textBox,
  codeRunner,
  createSidebar,
  getAddsForRightSideBar,
  populateRightSideBar
}
