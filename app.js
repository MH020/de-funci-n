import express from 'express'
import fs from 'fs'
import path from 'path'
import { readPage, buildTextBox,buildTextBoxWithTag } from "./util/templateEngine/templateEngine.js"; 

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.post('/api/getAds', async (req, res) => {
  const { totalAds } = req.body
  const memeApiResponse = await fetch(`https://meme-api.com/gimme/ProgrammerHumor/${totalAds}`)
  const data = await memeApiResponse.json()
  res.send(data)
})

app.post('/postScore', async (req, res) => {
  const { name: name, score: score } = req.body

  const filePath = path.join(process.cwd(), "scores.json")
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

  fs.writeFileSync(filePath, JSON.stringify(scores));

  res.send({score: score, message: "new entry added"})

})

app.get('/', (req, res) => {

  const template = readPage("./util/templates/page.html"); 
  const pageContent = buildTextBox(1) + buildTextBoxWithTag(1);
  const homePage = template.replace("$$PAGE_CONTENT$$", pageContent);



  res.send(homePage)
})

app.get('/basics', (req, res) => {
  res.sendFile(path.resolve('public/pages/basics/basics.html'))
})

app.get('/firstServer', (req, res) => {
  res.sendFile(path.resolve('public/pages/serverBasics/serverBasics.html'))
})

app.get('/snakeGame', (req, res) => {
  res.sendFile(path.resolve('public/pages/snakeGame/snakeGame.html'))
})


const PORT = 8080
app.listen(PORT, () => {
  console.log('app startet on port', PORT)
})
