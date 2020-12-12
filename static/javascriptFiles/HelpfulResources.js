//this will contain the code necessary for having the button
//idea is that whent eh button is pressed
//a textbox will open right underneat having
//a description tag and a link tag
//then the code will run and will make an anchor
//with the description as the text, likn as..link


//ez directory line cd '.\TempCoenFolder\C161\C161 Project\GITHUB\QueueManager\'

//<input type='text' value='Enter some text here'>
//https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_input_test
//^ also good
const ResourceButton = document.getElementById('ResourceButton');
console.log(ResourceButton);


function handleResourceButtonClicked(){
    //console.log("Event Handle click thingy");
    const ResDescrip = document.getElementById('ResDescrip').value;
    const ResLink = document.getElementById('ResLink').value;   
    //add an input box
    /*console.log("ResLink below")
    console.log(ResLink);
    console.log("ResDescrip below")
    console.log(ResDescrip);
    */

    let ResourceObject = {
        link: ResLink,
        description: ResDescrip,
        author: UserInfo.name
    }

    fetch("http://..../createLink", {
        method: "POST",
        body: JSON.stringify(temp)
    })
    .then(
        if(!ResLink || !ResDescrip){
            //add a little red text thing below button
            //both fields must be valid
            if(document.getElementById('ErrorText'))
                return;
    
            const TopSection = document.getElementById('TopSection');
            let Error = document.createElement('p');
            Error.setAttribute("id", "ErrorText");
            Error.innerText = 'Both fields must be filled'
            TopSection.appendChild(Error);
            return;
        }
    
        //remove the error text if its there
        if(document.getElementById('ErrorText')){
            document.getElementById('ErrorText').remove();
        }
        //create another bulletpoint in the body
        //the inner text is the descriptoini
        //the anchor is the link
        const List = document.getElementById('ResourceLinks');
        let ResourceDescriptionNode = document.createElement('li');
        let ResourceLink = document.createElement('a');
        
        //ResourceLink.href = ResLink; //CHECK THIS ONE OUT I DONT KNOW
        ResourceLink.setAttribute('href', ResLink);
        ResourceLink.innerText = ResDescrip;
    
        //ResourceDescription.appendChild(ResourceLink); // <li> <a>
    
        ResourceDescriptionNode.appendChild(ResourceLink);
        
        List.appendChild(ResourceDescriptionNode);
        
        
        //console.log(List);
    );
}

function main() {
    ResourceButton.addEventListener('click', () => { handleResourceButtonClicked() }); //we do this syntax because we don't want the stack function to use the event, we want it to take in specific arguments
}
main()

/*
 git status
 git add filename
 git push
*/