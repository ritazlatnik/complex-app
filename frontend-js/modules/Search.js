// import axios from "axios";

// export default class Search {
//     // 1. Select DOM elements, and keep a track of any useful or important data
//     // constructor is a method - called whenever we create an object of "search"
//     constructor() {
//         // alert("Search js is successfully being executed");
//         // first it will select the search icon
//         this.headerSearchIcon = document.querySelector(".header-search-icon");
//         // calling the event
//         this.events();
//         // showing html for search overlay
//         this.injectHTML();
//         // selecting by ID the search input field
//         this.inputField = document.querySelector("#live-search-field");
//         // select search-overlay class
//         this.overlay = document.querySelector(".search-overlay");
//         // when it takes some time to search, a circle loader will show up - class is already added in the html
//         // we also remove the class "live-search-results--visible" from next to "live-search-results" in the html code for div class "search-overlay"
//         this.resultsArea = document.querySelector("live-search-results");
//         this.loaderIcon = document.querySelector(".circle-loader");
//         this.typingWaitTimer; 
//         this.previousValue = "";
//     }

//     // 2. Events - is a method too - when we click on the search icon, do this: 1 - stop default behavior (load the webpage), 2 - open serach overlay (serach bar), 3 - adding overlay to make ti visible (under methods)
//     events(){
//         this.headerSearchIcon.addEventListener("click", (e) => {
//             e.preventDefault();
//             this.openOverlay();
//             // whenever there is a keyup (and not the usual clickon event listener), when sy is typing on the input field, run this function - defined under Methods
//             this.inputField.addEventListener("keyup", () => {
//               this.keyPressHandler();
//             });
//         })
//     }

//     //  3. Methods - we omit the "function" keyword
//     openOverlay(){
//         // alert("Open overlay method just ran!");
//         this.overlay.classList.add("search-overlay--visible");
//         // call function after specific time - 50 miiliseconds
//         // a - function to be executed
//         // b - time after which function executes (call a function after a specific time) - 50 milliseconds - using arrow function (looks better)
//         setTimeout(() => {
//           this.inputField.focus();
//         }, 50);
//     }

//     keyPressHandler() {
//       // define value typed in input field
//       let value = this.inputField.value;
//       this.previousValue = value;

//       // if value is not empty and value is not the previous value, then show loader icon - eg. start typing app and man (apple and mango) are the same values (3 letters)
//       if (value != "" && value != this.previousValue) {
//         // whenever I press a key and then I lift the key, the circle loader will show up - when I press the letter "a" for apple, the "a" will be sent to the database for search, when I lift, the loader should come, and the keyPressHandler will show the loader icen
//         this.showLoaderIcon();
//         // let user type a few more keywords (not only a letter) so that db can find more results to show
//         // a - function - send request to mongodb: search for that character I started typing - sendRequest is defined below
//         // b - milliseconds
//         this.typingWaitTimer = setTimeout(function(){
//           this.sendRequest();
//         }, 750);
//       }
//     }

//     sendRequest() {
//       // axios - used to send data from front end to the back to the server, we need to install axios: npm install axios, then add to top of the code
//       axios.post("/search", { searchTerm : this.inputField.value }).then(function() {
//         // a function
//       }).catch(function(){
//         alert("Hello, the request failed!");
//       });
//       alert("Send request method is called!");
//     }

//     // to remove search-overlay class
//     closeOverlay(){
//       this.overlay.classList.remove("search-overlay--visible");
//     }

//     injectHTML(){
//         document.body.insertAdjacentHTML("beforeend", `<!-- search feature begins -->
//         <div class="search-overlay">
//           <div class="search-overlay-top shadow-sm">
//             <div class="container container--narrow">
//               <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
//               <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
//               <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
//             </div>
//           </div>
      
//           <div class="search-overlay-bottom">
//             <div class="container container--narrow py-3">
//               <div class="circle-loader"></div>
//               <div class="live-search-results">
//                 <div class="list-group shadow-sm">
//                   <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>
      
//                   <a href="#" class="list-group-item list-group-item-action">
//                     <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e5937655bae6574ac0e4c2?s=128"&gt; <strong>Example Post #1</strong>
//                     <span class="text-muted small">by rita on 0/14/2019</span>
//                   </a>
//                   <a href="#" class="list-group-item list-group-item-action">
//                     <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298812b5151200f3449434ef?s=128"&gt; <strong>Example Post #2</strong>
//                     <span class="text-muted small">by sida on 0/12/2019</span>
//                   </a>
//                   <a href="#" class="list-group-item list-group-item-action">
//                     <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3131955bae6574ac0e4c2?s=128"&gt; <strong>Example Post #3</strong>
//                     <span class="text-muted small">by sid on 0/14/2019</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <!-- search feature end -->`)
//     }
// }

// // creating a class = a model for an object, "export defautl" is modern Js so adding it here
// export default class Search {
//   // 1. select the DOM and keep track of any useful data
//   constructor() {
//     this.injectHTML();
//     this.headerSearchIcon = document.querySelector(".header-search-icon");
//     this.events();
//   }

//   // 2. Events
//   events(){
//     this.headerSearchIcon.addEventListener("click", (e) => {
//       e.preventDefault();
//       this.openOverlay();
//     })
//   }

//   // 3. Methods - all the functions
// injectHTML(){
//   document.body.insertAdjacentHTML("beforeend", `<div class="search-overlay search-overlay--visible">
//   <div class="search-overlay-top shadow-sm">
//     <div class="container container--narrow">
//       <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
//       <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
//       <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
//     </div>
//   </div>

//   <div class="search-overlay-bottom">
//     <div class="container container--narrow py-3">
//       <div class="circle-loader"></div>
//       <div class="live-search-results live-search-results--visible">
//         <div class="list-group shadow-sm">
//           <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>

//           <a href="#" class="list-group-item list-group-item-action">
//             <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e5937655bae6574ac0e4c2?s=128"&gt; <strong>Example Post #1</strong>
//             <span class="text-muted small">by rita on 0/14/2019</span>
//           </a>
//           <a href="#" class="list-group-item list-group-item-action">
//             <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298812b5151200f3449434ef?s=128"&gt; <strong>Example Post #2</strong>
//             <span class="text-muted small">by sida on 0/12/2019</span>
//           </a>
//           <a href="#" class="list-group-item list-group-item-action">
//             <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3131955bae6574ac0e4c2?s=128"&gt; <strong>Example Post #3</strong>
//             <span class="text-muted small">by sid on 0/14/2019</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>`)
// }

//   openOverlay() {
//     alert("Hello World!");
//   }
// }

import axios from "axios";

export default class Search {
  // 1. select the DOM and keep track of any useful data
  constructor() {
    this.typingWaitTimer;
    this.previousValue == "";
    this.injectHTML();
    this.headerSearchIcon = document.querySelector(".header-search-icon");
    this.overlay = document.querySelector(".search-overlay");
    this.closeIcon = document.querySelector(".close-live-search");
    this.inputField = document.querySelector("#live-search-field");
    this.resultArea = document.querySelector(".live-search-results");
    this.loaderIcon = document.querySelector(".circle-loader");
    this.events();
  }

  // 2. Events
  events() {
    this.headerSearchIcon.addEventListener("click", (e) => {
      e.preventDefault();
      this.openOverlay();
    });
    this.closeIcon.addEventListener("click", () => {
      this.closeOverlay();
    });

    this.inputField.addEventListener("keyup", () => {
      this.keyPressHandler();
    });
  }

  // 3. Methods

  keyPressHandler() {
    let value = this.inputField.value;
    if (value == "") {
      clearTimeout(this.typingWaitTimer);
      this.hideLoaderIcon();
      this.hideResultArea();
    }
    if (value != "" && value != this.previousValue) {
      clearTimeout(this.typingWaitTimer);
      this.showLoaderIcon();
      this.hideResultArea();
      this.typingWaitTimer = setTimeout(() => {
        this.sendRequest();
      }, 3000);
    }
    this.previousValue = value;
  }

  showLoaderIcon() {
    this.loaderIcon.classList.add("circle-loader--visible");
  }

  injectHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="search-overlay">
    <div class="search-overlay-top shadow-sm">
      <div class="container container--narrow">
        <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
        <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
        <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
      </div>
    </div>

    <div class="search-overlay-bottom">
      <div class="container container--narrow py-3">
        <div class="circle-loader"></div>
        <div class="live-search-results">
          <div class="list-group shadow-sm">
            <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>

            <a href="#" class="list-group-item list-group-item-action">
              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e5937655bae6574ac0e4c2?s=128"&gt; <strong>Example Post #1</strong>
              <span class="text-muted small">by rita on 0/14/2019</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>`
    );
  }

  openOverlay() {
    this.overlay.classList.add("search-overlay--visible");
    setTimeout(() => {
      this.inputField.focus();
    }, 50);
  }

  closeOverlay(){
    this.overlay.classList.remove("search-overlay--visible");
  }

  sendRequest(){
    // alert("Send request successfully run!");
    axios.post("/search", { searchTerm: this.inputField.value })
    .then((response) => {
      console.log(response.data);
      this.renderResultsHTML(response.data);
    })
    .catch(() => {
      console.log("Hello, the request failed!");
    });
  }

  renderResultsHTML(posts) {
    if (posts.length) {
      this.resultArea.innerHTML = `
      <div class="list-group shadow-sm">
      <div class="list-group-item active"><strong>Search Results</strong> (${posts.length > 1 ? `${posts.length} items found` : '1 item found'})</div>
      ${posts.map(post => {
        let postDate = new Date(post.createdDate)
        return `<a href="/post/${post._id}" class="list-group-item list-group-item-action">
        <img class="avatar-tiny" src="${post.author.avatar}"> <strong>${post.title}</strong>
        <span class="text-muted small">by ${post.author.username} on ${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()}</span>
      </a>
      `
      }).join('')}
    </div>`;
    } else {
      this.resultArea.innerHTML = `
      <p class = "alert-danger text-center shadow-sm">Sorry, we could not find any results for that search.</p>
      `;
    }
    this.hideLoaderIcon();
    this.showResultArea();
  }

  hideLoaderIcon () {
    this.loaderIcon.classList.remove("circle-loader--visible");
  }

  hideResultArea () {
    this.resultArea.classList.remove("live-search-results--visible");
  }

  showResultArea () {
    this.resultArea.classList.add("live-search-results--visible");
  }

}
