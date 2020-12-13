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
    const LabNum = document.getElementById('LabNum').value;

    if(!ResLink || !ResDescrip || !LabNum){ //if either of the textboxes are blank, showcase the error text and do nothing else
        ErrorText();
        return;
    }

   let ResourceObject = { //upload this object into the Resource Link database
        link: ResLink,
        description: ResDescrip,
        labNum: LabNum, //figure this part out
    }

    fetch("/api/resources", {
        method: "POST",
        body: JSON.stringify(ResourceObject)
    })
    .then(addResourceLink(ResLink, ResDescrip)); //convert the text into a link 
}

window.onload = () => { //go through any and all resource links already uploaded in the past, display them using addResourceLink
    let tempObj={
        labName: "coen161",
        labNum: "4"
    }
    fetch("http://localhost:3000/api/resources",{
        method: "GET",
        body: JSON.stringify(tempObj)
    })
    .then((response) => (response.ok ? response.json() : Promise.reject()))
    .then((data) => {
        console.log(data);
    })
};

function main() {
    ResourceButton.addEventListener('click', () => { handleResourceButtonClicked() });
}
main()
