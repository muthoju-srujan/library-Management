let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function appendBooks(result) {
    let {
        author,
        imageLink,
        title
    } = result;

    let container = document.createElement("div");
    container.classList.add("m-3");
    searchResults.appendChild(container);
    //imageLink
    let image = document.createElement("img");
    image.src = imageLink;
    image.classList.add("book-pic");
    container.appendChild(image);
    //author name
    let discription = document.createElement("p");
    discription.textContent = author;
    discription.classList.add("author-name");
    container.appendChild(discription);
}



function displayResult(searchResult) {
    let headingEl = document.createElement("h1");
    headingEl.textContent = "Popular Books";
    headingEl.classList.add("popular");
    if (searchResult.length === 0) {
        headingEl.textContent = 'No results found';
    } else {
        headingEl.textContent = 'Popular Books';
        for (let result of searchResult) {
            appendBooks(result);
        }

    }
}


function eventRecieve(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        searchResults.classList.add("d-none");
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value;

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinner.classList.add("d-none");
                searchResults.classList.remove("d-none");
                displayResult(jsonData.search_results);
                console.log(jsonData.search_results);
            });
    }
}


searchInput.addEventListener("keydown", eventRecieve);
