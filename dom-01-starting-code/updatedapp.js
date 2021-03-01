const ul = document.body.firstElementChild.nextElementSibling;
const firstLi = ul.firstElementChild;

console.log(firstLi);

const section = document.querySelector("section");
const button = document.querySelector("button");

// section.style.backgroundColor = "blue";          //changes background color to blue
section.className = "";                             //clears class for this section
section.className = "red-bg";                       //gives section a new class

button.addEventListener("click", () => {

    //this is rather tidious. Hence the use of classList below
    /* if (section.className === "red-bg visible"){

        section.className = "red-bg invisible";
    }
    else {

        section.className = "red-bg visible";
    } */
    
    section.classList.toggle("invisible");          //good for css. much easier than code above
});