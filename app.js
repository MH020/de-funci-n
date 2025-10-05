import express from 'express'; 
import path from 'path'

const app = express(); 

app.use(express.static("public"));
app.use(express.json());

app.get("/",(req,res) => {
res.sendFile(path.resolve("public/pages/index/index.html"));
})

app.get("/basics",(req,res) => {
res.sendFile(path.resolve("public/pages/basics/basics.html"));
})

app.post("/getAds", async (req,res) => {
    const {totalAds} = req.body; 
    const memeApiResponse = await fetch (`https://meme-api.com/gimme/ProgrammerHumor/${totalAds}`);
    const data = await memeApiResponse.json();
    res.send(data);
});

const PORT = 8080; 
app.listen(PORT, () => {
    console.log("app startet on port", PORT)
})