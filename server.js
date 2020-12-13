console.log("server.js started running");

//require the needed express functionality
const express = require('express');
const fs = require('fs/promises');
const path = require('path');
var admin = require("firebase-admin");
var serviceAccount = require('./queuemanager-396ae-firebase-adminsdk-vh8bx-75f0c89244.json');
//const { database } = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  
});

const db = admin.firestore();

const tempdocRef = db.collection('testing');
db.doc('tested/doc').set({here: "8"});
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
        res.sendFile('./static/htmlFiles/login.html',{root: path.join(__dirname,'')});
        console.log("login page queried");
    })

    //serve the register page
    app.get('/register',(req,res)=>{
        res.sendFile('./static/htmlFiles/register.html', {root: path.join(__dirname,'')});
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

    
    //define the endpoints for the resource links
    app.get('/api/resources/:labName',(req,res)=>{
        //handle body being improperly formatted json
        // if(typeof req.body !== 'object' || req.body === null ){
        //     res.status(400).send("improperly formatted body, we require json");
        //     return;
        // }
        // let returnArray = 
        console.log("inside get resources submit");
        //console.log(req.body);
        let labString = Object.values(req.params)[0];
        //precondition queiries all resources for the lab with the given Name
        //let labString = req.body.labName;
        console.log(labString);
        const result = db.collection(`labs/${labString}/resources`)
            .get()
            .then(querySnapshot => {
                const promises = [];
                querySnapshot.forEach(doc => {
                console.log(doc.data());
                promises.push(doc.data());
                });
                return Promise.all(promises);
        }).then(collectedReferences => {
            console.log(collectedReferences + '<-- returning value')
            res.status(200).send(collectedReferences);
        })
        .catch(err => {
            console.log(err);
        });
    })

    db.collection('labs/coen161/resources')
        .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                console.log(doc.data());
            })
    }).catch(err => {
        console.log(err);
    });

    // app.get('/api/resources'){
    // }

    app.listen(port,() => {
        console.log(`queueManager server started on http://localhost: ${port}`);
    });
    

    

}

main();