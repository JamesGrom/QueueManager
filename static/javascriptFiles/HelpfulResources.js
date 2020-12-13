//ez directory line cd '.\TempCoenFolder\C161\C161 Project\GITHUB\QueueManager\'

const ResourceButton = document.getElementById('ResourceButton');

function ErrorText(){ //is only called when the user submits a faulty submit
    if(document.getElementById('ErrorText')) //double checks if there is already an error text on display
        return;

    const TopSection = document.getElementById('TopSection');
    let Error = document.createElement('p');
    Error.setAttribute("id", "ErrorText");
    Error.innerText = 'Both fields must be filled'
    TopSection.appendChild(Error);
    return;
}

function addResourceLink(ResLInk, ResDescrip){ //focuses solely on adding a resource link into the page
    //remove the error text if its there
    if(document.getElementById('ErrorText')){ //if error text is already present, remove it
        document.getElementById('ErrorText').remove();
    }

    const List = document.getElementById('ResourceLinks'); //the unordered list
    let ResourceDescriptionNode = document.createElement('li'); //new list item
    let ResourceLink = document.createElement('a');

    ResourceLink.setAttribute('href', ResLink); //<a href=ResLink> </a>
    ResourceLink.innerText = ResDescrip; //we want the text inside the anchor, <a> innerText </a> 

    ResourceDescriptionNode.appendChild(ResourceLink); //<li> <a ResLink> ResDescrip </a></li>
    
    List.appendChild(ResourceDescriptionNode); // make it part of the unordered list
    
}

function handleResourceButtonClicked(){ //either make a new Resource Link or produces an error text
    const ResDescrip = document.getElementById('ResDescrip').value;
    const ResLink = document.getElementById('ResLink').value;   
    const LabName = document.getElementById('LabName').value;

    if(!ResLink || !ResDescrip || !LabName){ //if either of the textboxes are blank, showcase the error text and do nothing else
        ErrorText();
        return;
    }

   let ResourceObject = { //upload this object into the Resource Link database
        link: ResLink,
        description: ResDescrip,
        labName: LabName, //figure this part out
    }

    fetch("/api/resources", {
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(ResourceObject)
    })
    .then(addResourceLink(ResLink, ResDescrip)); //convert the text into a link 
}

window.onload = () => { //go through any and all resource links already uploaded in the past, display them using addResourceLink
    //have like a table of contents, each header has Lab X, underneath it are links corresponding to that lab
    /*ResourceLinks = document.getElementById("ResourceLinks");
    for(let i=1; i<=10; i++){
        let LabHeader = document.createElement("h2");
        let LabLinks = document.createElement("ul");

        LabHeader.innerText = "Lab " + i; //h2 now has text "Lab 1"
        LabLinks.setAttribute("id", i); //Lab 1 set of ul will have id "1"

        LabHeader.appendChild(LabLinks);
        ResourceLinks.appendChild(LabHeader);
    }*/
   
    let temp = {
        labName: "coen161"
    }
    fetch("http://localhost:3000/api/resources/coen161")
    .then((response) => (response.ok ? response.json() : Promise.reject()))
    .then((data) => { //fill the page with the resource links to the right lab, all resources for lab 1 fall under lab 1 (1==LabNum, id=1)
        console.log(data); //will return an array
    })
};

function main() {
    ResourceButton.addEventListener('click', () => { handleResourceButtonClicked() });
}
main()
