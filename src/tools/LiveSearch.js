
class LiveSearch {
    searchItems() {
        let val = document.getElementById("searchBar").value
        val = val.toLowerCase();
        let items = document.getElementsByClassName("itemsForSearch");

        for (let i = 0; i < items.length; i++) {
            if (!items[i].innerHTML.toLowerCase().includes(val)) {
                items[i].style.display = "none";
            } else {
                items[i].style.display = "list-item";
            }
        }
    }
}

export default new LiveSearch();