async function fetchData() {
    try {
        const category = document.getElementById("searchbar").value.toLowerCase();
        const response = await axios.get(`https://openlibrary.org/subjects/${category}.json?limit=20`);

        if (!response.data) {
            throw new Error("Could not fetch resource");
        }
        
        const data = response.data;

        if (data.works && data.works.length > 0) {
            const categoryImgContainer = document.getElementById("categoryImages");
            categoryImgContainer.innerHTML = "";

            data.works.forEach((work, index) => {
                if (work.cover_edition_key) {
                    const coverEditionUrl = `https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`;
                    const imgElement = document.createElement("img");
                    imgElement.src = coverEditionUrl;
                    imgElement.classList.add("book-cover");
                    categoryImgContainer.appendChild(imgElement);
                }
            });
        } else {
            console.log("No results found for the category.");
        }
    } catch (error) {
        console.error(error);
    }
}
/*reducing searching time*/
document.getElementById("searchbar").addEventListener('keyup', fetchData);
