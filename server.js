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

    // //serve the login page
    // app.get('/login', (req,res) => {
    //     res.sendFile('./static/htmlFiles/login.html',{root: path.join(__dirname,'')});
    //     console.log("login page queried");
    // })

    // //serve the register page
    // app.get('/register',(req,res)=>{
    //     res.sendFile('./static/htmlFiles/register.html', {root: path.join(__dirname,'')});
    // })

    app.post('/register', (req,res)=> {
        console.log('entered attempt to register user ');
        console.log(req.body);
        admin.auth().createUser({
            email: req.email,
            password: req.password
        }).then(userRecord => {
            console.log('successfully created new user', userRecord.uid);
        }).catch(err => {
            console.log('error creating new user ', err);
        })
    })
    
    //serve the user home page
    app.get('/home', (req,res)=>{
        res.sendFile('./static/htmlFiles/home.html',{root: path.join(__dirname,'')});
    })
    
    //serve the create lab section page
    app.get('/create', (req,res)=>{
        res.sendFile('./static/htmlFiles/createLab.html',{root: path.join(__dirname,'')});
    })

    app.post('/create', (req,res) => {
        console.log('inside create lab endpoint');
        //handle body being improperly formatted json
        if(typeof req.body !== 'object' || req.body === null ){
            res.status(400).send("improperly formatted body, we require json");
            return;
        }
        let objToAdd = req.body;
        console.log("adding the following object: " );
        console.log( objToAdd);

        let dbRef = db.doc(`labs/${objToAdd.labName}`).create({
            author: objToAdd.author,
            TAemail: objToAdd.TAemail,
            driveLink: objToAdd.driveLink,
            password: objToAdd.password,
            labName:objToAdd.labName
        }).then(() => {
            //update this user's ownership of the given lab
            db.doc(`users/${objToAdd.TAemail}`).set({
                enrolledLabs: admin.firestore.FieldValue.arrayUnion(`${objToAdd.labName}`)
            },{merge:true}).then(() =>{
                res.status(200).send('resource successfully submitted');
            }).catch(err => {
                res.status(400).send('a lab with that name already exists');
            })
        }).catch(err => {
            res.status(400).send('a lab with that name already exists');
            console.log(err);
        })
    })

   
    // //serve the search for  lab section page
    // app.get('/join', (req,res)=>{
    //     res.sendFile('./static/htmlFiles/joinLab.html',{root: path.join(__dirname,'')});
    // })

    //serve the join lab page
    app.get('/join', (req,res)=>{
        res.sendFile('./static/htmlFiles/joinLab.html',{root: path.join(__dirname,'')});
    })

    app.post('/join', (req,res)=> {
        console.log('inside create lab endpoint');
        //handle body being improperly formatted json
        if(typeof req.body !== 'object' || req.body === null ){
            res.status(400).send("improperly formatted body, we require json");
            return;
        }
        let objToAdd = req.body;
        //first check if the given lab exists
        db.doc(`labs/${objToAdd.labName}`).get().then(
            docSnapshot => {
                if(docSnapshot.exists){
                    //update this user's enrolment into the given lab
                    db.doc(`users/${objToAdd.userEmail}`).set({
                        enrolledLabs: admin.firestore.FieldValue.arrayUnion(`${objToAdd.labName}`)
                    }, { merge: true }).then(() => {
                        res.status(200).send('lab successfully joined');
                    }).catch(err => {
                        res.status(400).send('unable to join lab');
                    })
                }else{
                    res.status(400).send('that lab does not exist yet');
                }
            }
        ).catch(err => {
            res.status(400).send('unable to join lab');
        })

    })
    
    //serve the lab page
    app.get('/lab', (req,res)=>{
        res.sendFile('./static/htmlFiles/lab.html',{root: path.join(__dirname,'')});
    })

    app.get('/HelpfulResources',(req,res)=>{
        res.sendFile('./static/htmlFiles/HelpfulResources.html',{root: path.join(__dirname,'')})
        ///Users/jamesgrom/Desktop/FinalDebugged/QueueManager/static/htmlFiles/HelpfulResources.html
    })


    app.get('/labq',(req,res)=>{
        res.sendFile('./static/htmlFiles/labq.html',{root: path.join(__dirname,'')})
        ///Users/jamesgrom/Desktop/FinalDebugged/QueueManager/static/htmlFiles/HelpfulResources.html
    })

    app.get('/allq', (req,res)=>{
        res.sendFile("./static/htmlFiles/AllQuestions.html",{root: path.join(__dirname,'')})
    })

     //get endpoint for the users' labs
     app.get('/enrolledLabs/:UserEmail',(req,res) => {
        console.log('inside get questions endpoint');
        let nameString = Object.values(req.params)[0];
        console.log(nameString);
        db.doc(`users/${nameString}`).get().then( docSnapshot => {
            return docSnapshot.data().enrolledLabs;
        }).then(arrayOfLabNames => {
            console.log(arrayOfLabNames);
            res.status(200).send(arrayOfLabNames);
        }).catch(err => {
            console.log(err);
        });
        
     })

    //get endpoint for question links
    app.get('/api/questions/:labName',(req,res)=>{
        console.log('inside get questions endpoint');
        let labString = Object.values(req.params)[0];
        console.log(labString);
        db.collection(`labs/${labString}/questions`)
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

    //get endpoint fot the resource links 
    //precondition, labName is the string that defines the name of the lab section
    //postcondition, the http response returns an array of resource objects
    app.get('/api/resources/:labName',(req,res)=>{
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


    //post endpoint for new questions
    app.post('/api/questions/:labName',(req,res)=>{
        console.log('entered question post endpoint ') 
        console.log(req.body);
        //handle body being improperly formatted json
        if(typeof req.body !== 'object' || req.body === null ){
            res.status(400).send("improperly formatted body, we require json");
            return;
        }
        let objToAdd = req.body;
        console.log("adding the following object: " );
        console.log( objToAdd);

        db.collection(`labs/${objToAdd.labName}/questions`).add({
            question: objToAdd.question,
            labName: objToAdd.labName,
            labNum:objToAdd.labNum
        }).then(Resp => {
            console.log(Resp);
        }).catch(err => {
            console.log(err);
        })
    })


    app.post('/api/resources',(req,res)=>{
        console.log('inside post resource link');
        //handle body being improperly formatted json
        if(typeof req.body !== 'object' || req.body === null ){
            res.status(400).send("improperly formatted body, we require json");
            return;
        }
        let objToAdd = req.body;
        console.log("adding the following object: " );
        console.log( objToAdd);

        let dbRef = db.collection(`labs/${objToAdd.labName}/resources`).add({
            link: objToAdd.link,
            description: objToAdd.description,
            labName:objToAdd.labName
        }).then(Resp => {
            console.log(Resp);
            res.status(200).send('resource successfully submitted');
        }).catch(err => {
            console.log(err);
        })

    })


    app.listen(port,() => {
        console.log(`queueManager server started on http://localhost: ${port}`);
    });
    

    

}

main();