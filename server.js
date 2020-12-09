console.log("server.js started running");

//require the needed express functionality
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

//main function
const main = () => {
    const app = express();
    const port = 3000;
    app.use(express.json());
    
    //define the root path
    app.get('/', (req,res) =>{
        res.sendFile('./htmlFiles/index.html',{root: path.join(__dirname,'')})
    });

    app.listen(port,() => {
        console.log(`queueManager server started on http://localhost: ${port}`);
    });

}

main();