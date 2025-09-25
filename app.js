import express from 'express'; 
import path from 'path'

const app = express(); 

app.use(express.static("public"));

app.get("/",(req,res) => {

})

const PORT = 8080; 

app.listen(PORT, () => {
    console.log("app startet on port", PORT)
})