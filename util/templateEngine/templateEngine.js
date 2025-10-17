import fs from 'fs'
import path from "path";

export function readPage(path) {
    return fs.readFileSync(path).toString();
}



const textBoxHTML = readPage("./util/componets/textbox.html")
const textBoxWithTagHTML = readPage("./util/componets/textBoxWithTag.html")
const textBoxWithCoderunnerHTML = readPage("./util/componets/textboxWithCoderunner.html")

const pElementHTML = readPage("./util/componets/pElement.html")
const codeRunnerHTML = readPage("./util/componets/codeRunner.html")


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

export function buildCodeRunner(codeRunner_ID){
  
  let codeRunnerBoxes = [];

  const jsonData = fs.readFileSync(path.resolve("./JsonDatabase/codeRunner.json")).toString(); 

  codeRunnerBoxes = JSON.parse(jsonData);


  const {coderunner_title,coderunner_input,coderunner_output} = codeRunnerBoxes.find(coderunner => coderunner.id === codeRunner_ID);

  const inputLines = textSplitter(coderunner_input)
  console.log(inputLines)
  const inputLinesHTML = inputLines.map(input => pElementHTML.replace("$$STRING_CONTENT$$", input)).join("\n")
  console.log(inputLinesHTML)
  
  return codeRunnerHTML
  .replace("$$CODERUNNER_TITLE$$", coderunner_title)
  .replace("$$CODERUNNER_INPUT$$", inputLinesHTML)
  .replace("$$CODERUNNER_OUTPUT$$", coderunner_output)
  
}



export function buildTextBox(TEXTBOX_ID){
  let textBoxes = [];

  const jsonData = fs.readFileSync(path.resolve("./JsonDatabase/textBoxes.json")).toString(); 

  textBoxes = JSON.parse(jsonData);


  const {textbox_title,textBox_text,textbox_id} = textBoxes.find(textbox => textbox.id === TEXTBOX_ID); 


  return textBoxHTML
  .replace("$$TEXTBOX_TITLE$$", textbox_title)
  .replace("$$TEXTBOX_TEXT$$", textBox_text)
  .replace("$$TEXTBOX_ID$$", textbox_id || " ")
}

export function buildTextBoxWithTag(TEXTBOX_ID){
  let textBoxes = [];

  const jsonData = fs.readFileSync(path.resolve("./JsonDatabase/textBoxesWithTag.json")).toString(); 

  textBoxes = JSON.parse(jsonData);


  const {textbox_title,textBox_text,textbox_link, link_text} = textBoxes.find(textbox => textbox.id === TEXTBOX_ID); 


  return textBoxWithTagHTML
  .replace("$$TEXTBOX_TITLE$$", textbox_title)
  .replace("$$TEXTBOX_TEXT$$", textBox_text)
  .replace("$$TAG$$", textbox_link)
  .replace("$$LINK_TEXT$$", link_text);
}

export function buildTextBoxWithCoderunner(TEXTBOX_ID){
    let textBoxes = [];

  const jsonData = fs.readFileSync(path.resolve("./JsonDatabase/textBoxes.json")).toString(); 

  textBoxes = JSON.parse(jsonData);


 const textbox = textBoxes.find(textbox => textbox.id === TEXTBOX_ID); 
 console.log("Available IDs:", textBoxes.map(tb => tb.id))

  if(!textbox) {
    console.log(`textbox with id: ${TEXTBOX_ID} could not be found for some reason`)
  }

  const {textbox_title,textBox_text, textbox_id, coderunner_id} = textbox

  console.log(textbox_title)



  return textBoxWithCoderunnerHTML
  .replace("$$TEXTBOX_TITLE$$", textbox_title)
  .replace("$$TEXTBOX_TEXT$$", textBox_text)
  .replace("$$TEXTBOX_ID$$", textbox_id || " ")
  .replace("$$CODERUNNER$$", buildCodeRunner(coderunner_id));

}







