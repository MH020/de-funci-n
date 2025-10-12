import fs from 'fs'
import path from "path";

export function readPage(path) {
    return fs.readFileSync(path).toString();
}



const textBoxHTML = readPage("./util/componets/textbox.html")


export function buildTextBox(TEXTBOX_ID){
      let textBoxes = [];

    const jsonData = fs.readFileSync(path.resolve("./JsonDatabase/textBoxes.json")).toString(); 

    textBoxes = JSON.parse(jsonData);


    const {id, textbox_title,textBox_text,english_text} = textBoxes.find(textbox => textbox.id === TEXTBOX_ID); 


    return textBoxHTML
    .replace("$$TEXTBOX_TITLE$$", textbox_title)
    .replace("$$TEXTBOX_TEXT$$", textBox_text)
}







