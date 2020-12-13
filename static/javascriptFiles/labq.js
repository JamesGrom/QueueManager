/*const mainElement = document.getElementsByTagName("main")[0];
const inputElement = document.querySelector("input");

const LOCAL_STORAGE_KEY = "queued_questions";

const failAllGet = (err) => {
  console.log(err);
  const errorElement = document.createElement("section");
  errorElement.classList.add("error");
  errorElement.innerText =
    "Couldn't fetch anything, is the server up and running?";
  mainElement.appendChild(errorElement);
};

const vote = (clone, url) => {
  const votesElement = clone.querySelector("#votes");

  fetch(url, { method: "PUT" })
    .then((response) => (response.ok ? response.json() : Promise.resolve()))
    .then((update) => {
      votesElement.textContent = update.upvotes - update.downvotes;
    });
};


const sendQueuedQueries = () => {
  const previouslyQueuedQuestions = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (previouslyQueuedQuestions) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return Promise.all(
      JSON.parse(previouslyQueuedQuestions).map((q) => {
        sendNewQuestion(q);
      })
    );
  }
};

/*const convertQuestionToElement = (question) => {
  const template = document.getElementById("question-template");
  const clone = template.content.firstElementChild.cloneNode(true);
  const votesElement = clone.querySelector("#votes");

  clone
    .querySelector("#up-arrow-button")
    .addEventListener("click", () => vote(clone, `/api/${question.id}/upvote`));
  clone
    .querySelector("#down-arrow-button")
    .addEventListener("click", () =>
      vote(clone, `/api/${question.id}/downvote`)
    );

  votesElement.innerText =
    parseInt(question.upvotes, 10) - parseInt(question.downvotes, 10);
  clone.querySelector("#question").textContent = question.text;

  return clone;
};


const sendNewQuestion = (text) => {
  let shouldSendQueuedQueries = true;
  const headers = new Headers();
  headers.set("content-type", "application/json");

  fetch("/api/question", {
    headers,
    method: "POST",
    body: JSON.stringify({
      question: text,
      labNumber: text,
    }),
  })
    .catch(() => {
      inputElement.classList.add("error");
      let previouslyQueuedQuestions = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (previouslyQueuedQuestions) {
        const newQuestions = JSON.stringify([
          ...JSON.parse(previouslyQueuedQuestions),
          text,
        ]);
        localStorage.setItem(LOCAL_STORAGE_KEY, newQuestions);
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([text]));
      }

      shouldSendQueuedQueries = false;

      return {
        ok: true,
        json: () => ({
          id: -1,
          upvotes: 0,
          downvotes: 0,
          text,
        }),
      };
    })
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response.status)
    )
    .then((data) => {
      inputElement.classList.remove("error");
      inputElement.value = "";

      const listElement = document.querySelector("ul");
      listElement.append(convertQuestionToElement(data));
    })
    .then(() => {
      if (shouldSendQueuedQueries) {
        sendQueuedQueries();
      }
    })
    .catch((err) => console.error(err));
};

window.onload = () => {
    fetch("http://localhost:3000/api/questions")
    .then((response) => (response.ok ? response.json() : Promise.reject()))
    .then((data) => {
      const listElement = document.querySelector("ul");
      data
        .map(convertQuestionToElement)
        .forEach((element) => listElement.appendChild(element));
    })
    .then(sendQueuedQueries)
    .catch(failAllGet);

  document.querySelector("input").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      sendNewQuestion(event.currentTarget.value);
    }
  });
};

*/
const QuestionButton = document.getElementById('QuestionButton');

//function that puts question into the page
function question(LabNum, LabQ){

  const QuestionsList = document.getElementById('LabQuestions');
  let LabQuestion = document.createElement('listItem');
  let LabNumber = document.createElementt('n');
  
	QuestionsList.appendChild(LabQuestion);
	
}

//button function, checks user's input, adds to database, and adds to page
function handleQuestionButtonClick(){
	const LabNum = document.getElementById('labNum').value;
  const LabQ = document.getElementById('labQs').value;   
  
  let QuestionObject = {
  	question: LabQ,
    labNum: LabNum,
  }
  
  fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify(QuestionObject)
    })
    .then(question(LabNum, LabQ)); 
}

window.onload = () =>{ //this function will display all questions from a particular lab
		fetch("http://localhost:3000/api/questions")
  	.then((response) => (response.ok ? response.json() : Promise.reject()))
    .then((data) => {
        console.log(data);
    })
};  

function main() {//eventhandler for the button
	QuestionButton.addEventListener('click', () => {handleQuestionButtonClick() } );
}
main ()