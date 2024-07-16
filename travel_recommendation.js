document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchbtn");
    const clearButton = document.getElementById("clearbtn");
    const searchInput = document.getElementById("searchinput");
    const resultContainer = document.getElementById("Result");
    console.log("DOM content loaded");
    searchButton.addEventListener("click", function() {
        const query = searchInput.value.toLowerCase();
        fetchData(query);
        console.log("Search button clicked");
    });
    clearButton.addEventListener("click", function() {
        searchInput.value = "";
        resultContainer.innerHTML = "";
        console.log("Clear button clicked");
    });
    function fetchData(query) {
        fetch("travel_recommendation_api.json")
            .then(response => response.json())
            .then(data => {
                displayResults(data, query);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayResults(data, query) {
        resultContainer.innerHTML = "";
        const allData = [...data.countries, ...data.temples, ...data.beaches];
        let found = false;
        allData.forEach(item => {
            if (item.cities) {
                item.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
                        found = true;
                        createResultElement(city);
                    }
                });
            } else {
                if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
                    found = true;
                    createResultElement(item);
                }
            }
        });

        if (!found) {
            resultContainer.innerHTML = "<p>No results found.</p>";
        }
    }

    function createResultElement(item) {
        const resultDiv = document.createElement("div");
        resultDiv.className = "resultvalues";

        const title = document.createElement("p");
        title.className = "resulttitle";
        title.textContent = item.name;

        const image = document.createElement("img");
        image.className = "resultimg";
        image.src = item.imageUrl;
        image.alt = item.name;

        const description = document.createElement("p");
        description.className = "resultdescription";
        description.textContent = item.description;

        resultDiv.appendChild(title);
        resultDiv.appendChild(image);
        resultDiv.appendChild(description);

        resultContainer.appendChild(resultDiv);
    }
});
