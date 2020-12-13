console.log("server.js started running");

//require the needed express functionality
const express = require('express');
const fs = require('fs/promises');
const path = require('path');
// 
//main function
const main = () => {
    const app = express();
    const port = 3000;

    //define what filetypes our express app will be using
    app.use(express.json());
    //make sure the static css filesheet can be used
    app.use(express.static(path.join(__dirname,'static')));
    app.use('/cssFiles',express.static(__dirname));
    app.use('/javascriptFiles',express.static(__dirname));

    
    //define the root path
    app.get('/', (req,res) =>{
        console.log(__dirname);
        res.sendFile('./static/htmlFiles/index.html',{root: path.join(__dirname,'')})
    });

    //serve the login page
    app.get('/login', (req,res) => {
        res.sendFile('./static/htmlFiles/login.html');
    })

    //serve the register page
    app.get('/register',(req,res)=>{
        res.sendFile('./static/htmlFiles/register.html');
    })
    
    //serve the user home page
    app.get('./home', (req,res)=>{
        res.sendFile('./static/htmlFiles/home.html');
    })
    
    //serve the create lab section page
    app.get('/create', (req,res)=>{
        res.sendFile('./static/htmlFiles/createLab.html');
    })

    //serve the search for  lab section page
    app.get('/search', (req,res)=>{
        res.sendFile('./static/htmlFiles/searchLab.html');
    })

    //serve the join lab page
    app.get('/join', (req,res)=>{
        res.sendFile('./static/htmlFiles/joinLab.html');
    })
    
    //serve the lab page
    app.get('/lab', (req,res)=>{
        res.sendFile('./static/htmlFiles/lab.html');
    })
    
    app.get('/HelpfulResources',(req,res)=>{
        res.sendFile('./static/htmlFiles/HelpfulResources.html',{root: path.join(__dirname,'')})
        ///Users/jamesgrom/Desktop/FinalDebugged/QueueManager/static/htmlFiles/HelpfulResources.html
    })


    app.get('/labq',(req,res)=>{
        res.sendFile('./static/htmlFiles/labq.html',{root: path.join(__dirname,'')})
        ///Users/jamesgrom/Desktop/FinalDebugged/QueueManager/static/htmlFiles/HelpfulResources.html
    })

    app.listen(port,() => {
        console.log(`queueManager server started on http://localhost: ${port}`);
    });
    
 
    //test comment

}

main();