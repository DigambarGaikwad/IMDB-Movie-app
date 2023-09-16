document.addEventListener("DOMContentLoaded", () => {
    const apiKeyInput = document.getElementById("apiKeyInput");
    const movieTitleInput = document.getElementById("movieTitleInput");
    const searchButton = document.getElementById("searchButton");
    const loader = document.querySelector(".loader");
    const errorMessage = document.querySelector(".error-message");
    const movieResults = document.querySelector(".movie-results");
    const hints=document.getElementById("hints")

    searchButton.addEventListener("click", () => {
        const apiKey = apiKeyInput.value.trim();
        const movieTitle = movieTitleInput.value.trim();
        
        hints.style.display="none";

        if (!apiKey || !movieTitle) {
            errorMessage.textContent = "Please enter both API Key and Movie Title.";
            errorMessage.style.display = "block";
            return;
        }

        errorMessage.style.display = "none";
        loader.style.display = "block";
        
       
        // Make the API request to OMDB
        fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                // Handle the API response
                if (data.Response === "True") {
                    
                    // Clear previous results
                    movieResults.innerHTML = ""
                    

                    // Loop through the movies and create cards
                    data.Search.forEach(movie => {
                        const movieCard = document.createElement("div");
                        movieCard.classList.add("movie-card");
                        movieCard.innerHTML = `
                            <img src="${movie.Poster}" class="movie-poster" alt="${movie.Title} Poster">
                            <p>${movie.Title}</p>
                            <p>Year: ${movie.Year}</p>
                            <a href="https://www.imdb.com/title/${movie.imdbID}"
                            " class="know-more"
                            target="_blank">More Details</a>
                        `;
                        movieResults.appendChild(movieCard);
                    });

                    // Hide the loader
                    loader.style.display = "none";
                } else {
                    // Handle API errors
                    errorMessage.textContent = data.Error;
                    errorMessage.style.display = "block";
                    loader.style.display = "none";
                }
            })
            .catch(error => {
                // Handle network errors
                errorMessage.textContent = "An error occurred while fetching data.";
                errorMessage.style.display = "block";
                loader.style.display = "none";
            });
    });
});
