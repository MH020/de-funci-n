import fs from 'fs'
import path from "path";

export function readPage(path) {
    return fs.readFileSync(path).toString();
}



const textBoxHTML = readPage("./util/componets/textbox.html")
const textBoxWithTagHTML = readPage("./util/componets/textBoxWithTag.html")

export function buildTextBox(TEXTBOX_ID){
  let textBoxes = [];

  const jsonData = fs.readFileSync(path.resolve("./JsonDatabase/textBoxes.json")).toString(); 

  textBoxes = JSON.parse(jsonData);


  const {id, textbox_title,textBox_text,english_text, textbox_id} = textBoxes.find(textbox => textbox.id === TEXTBOX_ID); 


  return textBoxHTML
  .replace("$$TEXTBOX_TITLE$$", textbox_title)
  .replace("$$TEXTBOX_TEXT$$", textBox_text)
  .replace("$$TEXTBOX_ID$$", textbox_id || " ")
}

export function buildTextBoxWithTag(TEXTBOX_ID){
  let textBoxes = [];

  const jsonData = fs.readFileSync(path.resolve("./JsonDatabase/textBoxesWithTag.json")).toString(); 

  textBoxes = JSON.parse(jsonData);


  const {id,textbox_title,textBox_text,english_text,textbox_link, link_text} = textBoxes.find(textbox => textbox.id === TEXTBOX_ID); 


  return textBoxWithTagHTML
  .replace("$$TEXTBOX_TITLE$$", textbox_title)
  .replace("$$TEXTBOX_TEXT$$", textBox_text)
  .replace("$$TAG$$", textbox_link)
  .replace("$$LINK_TEXT$$", link_text);
}







