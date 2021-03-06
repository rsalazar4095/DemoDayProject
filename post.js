const usernameElement = document.getElementById("assignment");
const messageElement = document.getElementById("description");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
const database2= firebase.database().ref()
//store global acess for .allMessage div
let allMessages = document.getElementsByClassName("allMessages")[0];
/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username = usernameElement.value;
    const message = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);
    //make my JSON to push
    let messageJSON = {
        ASSIGNMENT: username,
        Description: message
    }
    //Update database here
    database2.push(messageJSON)
}

// Set database "child_added" event listener here
database2.on("child_added", addMessageToBoard);  //child added 
function addMessageToBoard(rowData){
    const data = rowData.val();
    //display in form NAME: MESSAGE;
    const name = data.ASSIGNMENT;
    const message = data.Description;
    let div = document.createElement("div");
    div.classList.add("post");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    h3.innerText = name;
    p.innerText = message //specific to the html
    div.appendChild(h3);
    div.appendChild(p);
    allMessages.appendChild(div)  //display the message
}