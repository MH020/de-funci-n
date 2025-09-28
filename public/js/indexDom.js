import { start } from "repl";

export function textBox(titleText,textinput){
    const textBoxContainer = document.createElement("div"); 
    textBoxContainer.classList.add("textBox"); 

    const title = document.createElement("h3");
    title.textContent = titleText || "title not given";
    textBoxContainer.appendChild(title); 

    const text = document.createElement("p");
    text.classList.add("text");
    text.textContent = textinput  || "text not given";
    textBoxContainer.appendChild(text); 
    

    return textBoxContainer; 
}


function textSplitter(text){
    const textArray = []; 
    let start = 0; 
    
    for (let i =0; i < text.length; i++){
        if(text[i] == "/n"){
            textArray.push(text.slice(start, i + 1));
            start = i + 1; 
        }
    }
    if(start < text.length){
        textArray.push(text.slice(start))
    }
    return textArray
}

export function codeRunner(titleText,inputCode,outputCode){

    const inputTextArray = textSplitter(inputCode);
    const outputTextArray = textSplitter(outputCode);

    const codeContainer = document.createElement("div");
    codeContainer.classList.add("codeContainer");

    const title = document.createElement("h3");
    title.textContent = titleText || "title not given";
    codeContainer.appendChild(title); 


    const inputContainer = document.createElement("div");
    codeContainer.appendChild(inputContainer);

    inputTextArray.forEach(element => {
        const inputputCodeText = document.createElement("p");
        inputputCodeText.textContent = element || "no output code"; 
        inputContainer.appendChild(inputputCodeText);
    });

    const outputContainer = document.createElement("div");

    outputTextArray.forEach(element => {
        const outputCodeText = document.createElement("p");
        outputCodeText.textContent = element || "no output code"; 
        outputContainer.appendChild(outputCodeText);
    });

    let displayed = false; 

    const runButton = document.createElement("button");
    runButton.textContent = "show solution"; 
    runButton.classList.add("button");
    codeContainer.appendChild(runButton);

    runButton.addEventListener("click", () => {
        if(displayed === false){
            codeContainer.appendChild(outputContainer); 
            displayed = true; 
        } else {
            outputContainer.remove();
            displayed = false
        }
    });

    return codeContainer
}