import Search from "./modules/Search";
import Chat from "./modules/Chat";

// // search will be visible only when logged in - if we can see the search icon
// if(document.querySelector("header-search-icon")) {
//     // creating an object using this new search class
//     new Search();
// };

if(document.querySelector("#chat-wrapper")) {
    new Chat();
}

if(document.querySelector(".header-search-icon")){
    new Search();
}
