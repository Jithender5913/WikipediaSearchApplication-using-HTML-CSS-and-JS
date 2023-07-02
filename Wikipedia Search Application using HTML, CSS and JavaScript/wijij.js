let userEnteredInputEl = document.getElementById("userInput");

let searchResultsEl = document.getElementById("searchResult");

let spinnerEl = document.getElementById("spinner");



function createAndAppendSearchResult(result) {

    let {link, title, description} = result;


    //Create a div element
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);


    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);


    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);


    let urlBreakEl = document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);

    let descripEl = document.createElement("p");
    descripEl.classList.add("link-description");
    descripEl.textContent = description;
    resultItemEl.appendChild(descripEl);

    searchResultsEl.appendChild(resultItemEl);

}


function displayResults(search_results) {

    spinnerEl.classList.add("d-none");

    for(let result of search_results) {
        createAndAppendSearchResult(result);
    }

}



function searchWikipedia(event) {

    if(event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInputValue = userEnteredInputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;

        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(url, options) 
            .then(function(response){
                return response.json();
            })

            .then(function(jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            });
        
    }

}


userEnteredInputEl.addEventListener("keydown", searchWikipedia);

