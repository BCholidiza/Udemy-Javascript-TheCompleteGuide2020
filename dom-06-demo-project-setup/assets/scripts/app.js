/* 
// The below also work to get the modal. However they are not necessarily
// as fast as the one used where we get the element by ID

const addMovieModal = document.querySelector("#add-modal");
const addMovieModal = document.body.children[1]; */

const addMovieModal         = document.getElementById("add-modal");
const startAddMovieButton   = document.querySelector("header > button");
const backdrop              = document.getElementById("backdrop");
const cancelAddMovieButton  = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs            = addMovieModal.querySelectorAll("input");

const movies = [];

const toggleBackdrop = () => {

        backdrop.classList.toggle("visible");
};

const toggleMovieModal = () => {

    addMovieModal.classList.toggle("visible");      //could use class name but would have to specify all classes
    toggleBackdrop();
};

const backdropClickHandler = function (){

    toggleMovieModal();
};

function cancelAddMovieHandler(){

    toggleMovieModal();
}

const addMovieHandler = () => {

    const titleValue    = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue   = userInputs[2].value;

    if (titleValue.trim() === "" || 
        imageUrlValue.trim() === "" || 
        ratingValue.trim() === "" ||
        +ratingValue < 1 ||
        +ratingValue > 5
        ){

            alert("Please enter valid values (rating between 1 and 5).");
            return;
        }

        const newMovie = {
            title: titleValue,
            image: imageUrlValue,
            rating: rating
        };

        movies.push(newMovie);
        console.log(movies);
        toggleMovieModal();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);