import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { readPage, buildTextBox,buildTextBoxWithTag , buildTextBoxWithCoderunner} from "./util/templateEngine/templateEngine.js"; 

const app = express()
app.use(express.static('public'))
app.use(express.json())


  const template = readPage("./util/templates/page.html"); 
  const navbar = readPage("./util/componets/navbar.html")


app.post('/scores', async (req, res) => {
  const { name, score } = req.body

  const filePath = path.resolve("JsonDatabase/scores.json")
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  const jsonData = fs.readFileSync(filePath, "utf8")


  let scores; 

  if(jsonData){
    scores = JSON.parse(jsonData);
  } else {
    scores = []; 
  }

  const autoIncriment = scores.length + 1; 

  scores.push({id: autoIncriment, name: name, score: score})

  fs.writeFileSync(filePath, JSON.stringify(scores,null,2));

  res.status(200).send({score: score, message: "new entry added"})

})

app.get('/', (req, res) => {
  const pageContent = buildTextBox(1) + buildTextBoxWithTag(1);
  const homePage = template
  .replace("$$navbar$$", navbar)
  .replace("$$PAGE_CONTENT$$", pageContent)
  .replace("$$PAGE_TITLE$$", "Bienvenido a mi documentación sobre Node")
  .replace("$$SCRIPT_PATH$$", "/pages/index/index.js");
  res.send(homePage)
})

app.get('/basics', (req, res) => {

  const pageContent = buildTextBoxWithCoderunner(3) + buildTextBoxWithCoderunner(4) + buildTextBoxWithCoderunner(5) + buildTextBoxWithCoderunner(6)
                    + buildTextBox(7) + buildTextBoxWithCoderunner(8) + buildTextBoxWithCoderunner(9) + buildTextBox(10) + buildTextBoxWithCoderunner(11) 
                    + buildTextBoxWithCoderunner(12)

  const basicsPage = template
  .replace("$$navbar$$", navbar)
  .replace("$$PAGE_CONTENT$$", pageContent)
  .replace("$$PAGE_TITLE$$", "Esta página explicará los conceptos básicos de JavaScript y Node.")
  .replace("$$SCRIPT_PATH$$", "/pages/index/index.js");
  res.send(basicsPage)
})

app.get('/firstServer', (req, res) => {
  const pageContent = buildTextBox(13) + buildTextBoxWithCoderunner(14) + buildTextBoxWithCoderunner(15) + buildTextBoxWithCoderunner(16) + 
                      buildTextBox(17) + buildTextBoxWithCoderunner(18) + buildTextBox(19) + buildTextBoxWithCoderunner(20) +
                      buildTextBox(21) + buildTextBoxWithCoderunner(22) + buildTextBox(23)

  const firstServerPage = template
  .replace("$$navbar$$", navbar)
  .replace("$$PAGE_CONTENT$$", pageContent)
  .replace("$$PAGE_TITLE$$", "Primer servidor y javascript en la parte posterior en forma de nodo")
  .replace("$$SCRIPT_PATH$$", "/pages/index/index.js");
  res.send(firstServerPage)
})

app.get('/restAPI', (req, res) => {
  const pageContent = ""

  const firstServerPage = template
  .replace("$$navbar$$", navbar)
  .replace("$$PAGE_CONTENT$$", pageContent)
  .replace("$$PAGE_TITLE$$", "Conceptos básicos sobre la API de REST")
  .replace("$$SCRIPT_PATH$$", "/pages/index/index.js");
  res.send(firstServerPage)
})

app.get('/snakeGame', (req, res) => {
  res.sendFile(path.resolve('public/pages/snakeGame/snakeGame.html'))
})

app.get('/scores', (req,res) => {

  try {
  const filePath = path.resolve("JsonDatabase/scores.json")
  const jsonData = fs.readFileSync(filePath).toString()

  const scores = JSON.parse(jsonData);

  res.status(200).send(scores);
    
} catch (error){
  console.error("Error loading scores:", error.message);
  res.status(500).send({ error: 500, message: "Could not read or parse scores file." });
}
})

app.get('/api/ads', async (req, res) => {
  const  totalAds = req.query.totalAds
  const memeApiResponse = await fetch(`https://meme-api.com/gimme/ProgrammerHumor/${totalAds}`)
  const data = await memeApiResponse.json()
  res.status(200).send(data)
})


const PORT = 8080
app.listen(PORT, () => {
  console.log('app startet on port', PORT)
})
