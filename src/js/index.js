async function fetchData() {
    try {
        const category = document.getElementById("searchbar").value.toLowerCase();
        const response = await axios.get(`https://openlibrary.org/subjects/${category}.json?limit=20`);

        if (!response.data) {
            throw new Error("Could not fetch resource");
        }

        const data = response.data;
        const categoryImgContainer = document.getElementById("categoryImages");
        categoryImgContainer.innerHTML = ""; // Clear previous content

        if (data.works && data.works.length > 0) {
            /*alphabetic order for title and description*/
            const sortedWorks = _.sortBy(data.works, 'title');
            sortedWorks.forEach((work, index) => {
                if (work.cover_edition_key) {
                    const coverEditionUrl = `https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`;

                    const bookElement = document.createElement("div");
                    bookElement.classList.add("book");

                    /*img element*/
                    const imgElement = document.createElement("img");
                    imgElement.src = coverEditionUrl;
                    imgElement.classList.add("book-cover");
                    bookElement.appendChild(imgElement);

                    /*title element*/
                    const titleElement = document.createElement("p");
                    titleElement.textContent = work.title;
                    bookElement.appendChild(titleElement);

                    /*description element*/
                    const descriptionElement = document.createElement("p");
                    descriptionElement.textContent = work.description ? work.description.value : "No description available";
                    bookElement.appendChild(descriptionElement);

                    categoryImgContainer.appendChild(bookElement);
                }
            });
        } else {
            categoryImgContainer.textContent = "No results found for the category.";
        }
    } catch (error) {
        console.error(error);
    }
}
document.querySelector("button").addEventListener('click', fetchData);
