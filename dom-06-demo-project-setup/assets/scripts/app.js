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
const listRoot              = document.getElementById("movie-list");

const movies           = [];
const entryTextSection = document.getElementById("entry-text");

const deleteMovie = movieId => {
    
    let movieIndex = 0;
    
    for (const movie of movies){
        
        if (movie.id === movieId)
            break;
        movieIndex++;
    }

    movies.splice(movieIndex, 1);
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);             This too would work but is tedious
};

const deleteMovieHandler = movieId => {

    const deleteMovieModal = document.getElementById("delete-modal");
    deleteMovieModal.className.add("visible");
    toggleBackdrop();
    //deleteMovie();
}; 

const renderNewMovieElement = (id, title, imageUrl, rating) => {

    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 start</p>
        </div>
    `;
    newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
    listRoot.appendChild(newMovieElement);
};

const updateUI = () => {

    if (movies.length === 0){
        
        entryTextSection.style.display = "block";
    }
    else {
        
        entryTextSection.style.display = "none";
    }
};

const clearMovieInput = () => {

    for (const usrInput of userInputs)
        usrInput.value = "";

};

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
    clearMovieInput();
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
            id: Math.random().toString(),
            title: titleValue,
            image: imageUrlValue,
            rating: ratingValue
        };

        movies.push(newMovie);
        console.log(movies);
        toggleMovieModal();
        clearMovieInput();
        renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
        updateUI();
};

startAddMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);