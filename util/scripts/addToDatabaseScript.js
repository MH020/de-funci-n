import fs from 'node:fs'
import path from 'node:path';
import readline from 'node:readline'


const textboxJsonPath = path.resolve("../../JsonDatabase/textBoxes.json")
const coderunnerJsonPath = path.resolve("../../JsonDatabase/codeRunner.json")

const textBoxesDatabase = fs.readFileSync(textboxJsonPath).toString(); 
const codeRunnerDatabase = fs.readFileSync(coderunnerJsonPath).toString(); 

const textboxJson = JSON.parse(textBoxesDatabase)
const coderunnerJson = JSON.parse(codeRunnerDatabase)

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function lineReaderQuestion(questionText, value){
    return new Promise((resolve)=> {
        lineReader.question(questionText, (answer) =>{
            resolve(answer.trim());
        })
    })
}; 

async function databaseScript(){
    const answer = await lineReaderQuestion("Press 1 to make a textbox with an associated coderunner.\nPress 2 to just make a textbox.\nPress 3 to close.\n");
    if (answer === '1') {
        console.log("You chose to make a textbox with a coderunner.");


        const textbox_title = await lineReaderQuestion("Enter textbox_title:")

        const textBox_text = await lineReaderQuestion("Enter textBox_text:")

        const english_text = await lineReaderQuestion("Enter english_text:")

        const idQuestion = await lineReaderQuestion("should this textbox have a id to be shown in the sidebar? press 1 for yes, anything else for no")

        const id = textboxJson.length + 1; 
        let textbox_id

        if(idQuestion == 1){
             textbox_id = id;
        } else {
            textbox_id = null
        }

        const coderunner_id = coderunnerJson.length + 1; 


        const textbox = {id,textbox_title,textBox_text,english_text,textbox_id, coderunner_id}
        console.log("the textbox will look like this", textbox)
        console.log("build the coderunner for this textbox")

        const coderunner_title = await lineReaderQuestion("Enter coderunner_title:")

        const coderunner_input = await lineReaderQuestion("Enter coderunner_input:")
        
        const coderunner_output = await lineReaderQuestion("Enter coderunner_output:")


        const coderunner = {id:coderunner_id,coderunner_title,coderunner_input,coderunner_output}

        textboxJson.push(textbox)
        coderunnerJson.push(coderunner)

        fs.writeFileSync(textboxJsonPath, JSON.stringify(textboxJson,null,2));
        fs.writeFileSync(coderunnerJsonPath, JSON.stringify(coderunnerJson,null,2));
        console.log("Textbox and coderunner saved.");
        lineReader.close();
      
    } else if (answer === '2') {
        console.log("you chose to just make a textbox.");

        const textbox_title = await lineReaderQuestion("Enter textbox_title:")

        const textBox_text = await lineReaderQuestion("Enter textBox_text:")

        const english_text = await lineReaderQuestion("Enter english_text:")

        const idQuestion = await lineReaderQuestion("should this textbox have a id to be shown in the sidebar? press 1 for yes, anything else for no")

        const id = textboxJson.length + 1; 
        let textbox_id

        if(idQuestion == 1){
             textbox_id = id;
        } else {
            textbox_id = null
        }

        const coderunner_id = null 


        const textbox = {id,textbox_title,textBox_text,english_text,textbox_id, coderunner_id}

        textboxJson.push(textbox)
        coderunnerJson.push(coderunner)

        fs.writeFileSync(textboxJsonPath, JSON.stringify(textboxJson),null,2);
        fs.writeFileSync(coderunnerJsonPath, JSON.stringify(coderunnerJson,null,2));
        lineReader.close();

        

        console.log("Textbox saved.");
        lineReader.close();

    } else if (answer === '3') {
      console.log("closing...");
      lineReader.close();

    } else {
      console.log("Invalid input. Please press 1, 2, or 3.");
      lineReader.close();
    }

}

databaseScript();

