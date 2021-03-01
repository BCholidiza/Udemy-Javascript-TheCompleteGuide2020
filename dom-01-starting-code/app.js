const h1 = document.getElementById("main-title");

h1.textContent = "Some new title!";
h1.style.color = "white";
h1.style.background = "black";

const li = document.querySelector("li:last-of-type");
li.textContent = li.textContent + " (Changed!)";

const body = document.body;

// const listItemElements = document.querySelectorAll("li");
const listItemElements = document.getElementsByTagName("li"); //almost the same as above
for (const listItemEl of listItemElements){
    console.log(listItemEl);
}
