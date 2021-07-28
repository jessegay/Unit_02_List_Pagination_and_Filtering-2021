/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering (Refresh 2021)
by Jesse Gay
I am attempting to get an "Exceeds Expectations" grade.
*/

// Global variables
const itemsPerPage = 9; 
/* Number of students displayed per page. I used a const so I can easily change 
this with one edit.*/

/*
`showPage` function
This function will show a page of students selected from the list in the data.js file.
The number of students per page is defined in itemsPerPage.
*/

const showPage = (list, page) => {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   let studentList = document.querySelector('.student-list'); 
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i ++) {
      if (i >= startIndex && i < endIndex) {
         let studentInfo = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>`;
       studentList.insertAdjacentHTML("beforeend", studentInfo);
      } 
   }
}

/*
showError() for when there are no search matches
*/
const showError = () =>  {
   console.log('no results found, error triggered');
   const noResultsError = `<p class="no-results">No results found</p>`;
   const listArea = document.querySelector(".student-list");
   // clear listArea
   listArea.innerHTML = '';
   // insert error message
   listArea.insertAdjacentHTML('beforeend', noResultsError);
   }

/*
`addPaginationButtons` function
dynamically creates the pagination buttons at 
the bottom of the screen based on the number of students in 'list'.
*/
const addPaginationButtons = (list) => {
   const buttonsNeeded = Math.ceil(list.length/itemsPerPage);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 0; i < buttonsNeeded; i++) {
      let buttonsListItem = `<li>
      <button type="button">${i+1}</button>
      </li>`;
      linkList.insertAdjacentHTML("beforeend", buttonsListItem);
   }
   // Add 'active' class to first button to show it is selected upon inital load. 
   // Wrapped in if statement to prevent Uncaught Type error when there are no search results (since that produces an empty linkList, I think)
   if (linkList.getElementsByTagName('button')[0]) {
   linkList.getElementsByTagName('button')[0].classList.add('active');
   }
   // Add event listener to all pagination buttons. 
   
   let linkChildren = linkList.childNodes;
   for (let i = 0; i < linkChildren.length; i++) {
      let pageLi = linkChildren[i].firstElementChild;
         pageLi.addEventListener("click", event => {
         showPage(list, event.target.textContent);
         // Remove the active class from other pagination buttons. 
         let paginationButtons = linkList.getElementsByTagName('button');
         for (let i = 0; i < paginationButtons.length; i++) {
            paginationButtons[i].classList.remove('active');
         }
         // Add the active class to the pagination button that was just clicked. 
         event.target.classList.add('active');
         //temp log statement to find what was clicked
         console.log(event.target.textContent);
      });
   }
   
   // 93-105 almost works, but applies it to the entire ul as well, so clicking outside the individual buttons triggers odd behavior. FIXME: Delete
   // linkList.addEventListener("click", event => {
   //    showPage(list, event.target.textContent);
   //    // Remove the active class from other pagination buttons. 
   //    let paginationButtons = linkList.getElementsByTagName('button');
   //    for (let i = 0; i < paginationButtons.length; i++) {
   //       paginationButtons[i].classList.remove('active');
   //    }
   //    // Add the active class to the pagination button that was just clicked. 
   //    event.target.classList.add('active');
   //    //temp log statement to find what was clicked
   //    console.log(event.target.textContent);
   // });


}

// Extra credit
//Dynamically create search bar
createSearch = () => {
   const searchBarHTML = `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button id="searchButton" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
   //insert searchBarHTML beforeend of element with the class 'header'.
   let header = document.querySelector('.header');
   header.insertAdjacentHTML('beforeend', searchBarHTML);
}
/* call function to add search bar to page */
createSearch();

// Create search function. 
   // Variables to store search input and button elements:
   // search input (i.e. this is what we're searching for)
   const searchInput = document.querySelector('#search');
   // search button
   const searchButton = document.querySelector('#searchButton');
   console.log(searchButton); 
   
   const searchFunction = (searchInput, students) => {
      let filteredList = [];
         for (let i = 0; i < students.length; i ++) {
            // create fullName so loop can check for matches against 1 variable rather than checking first and last separately
            let fullName = `${students[i].name.first} ${students[i].name.last}`;
            if (searchInput.value.length != 0 && fullName.toLowerCase().includes(searchInput.value.toLowerCase())) {
               //add matches to filteredList. 
               filteredList.push(students[i]);
               console.log(filteredList);     
            } // if searchInput is empty, display entire list
            else if (searchInput.value.length == 0) {
               filteredList = data;
            }
            
         }

         // if filteredList.length > 0, call showPage after list has been filtered. This will display only matching results. Start on the first page.
         if (filteredList.length > 0) {
         showPage(filteredList, 1);
         // add pagination buttons based on this new filtered list
         addPaginationButtons(filteredList);
         }// else show error message
         else {
         showError();
         // clear pagination buttons (by calling addPaginationButtons when filteredList is empty)
         addPaginationButtons(filteredList);
         }
      }      

/* 
Display a page of students, starting on the first page.
Pass in the student list which is stored in the variable 'data' from data.js
'1' is the second argument because we want to start on the first page.
*/
showPage(data,1);
/* Add pagination buttons.*/
addPaginationButtons(data);

/*
Submit listener
*/  
searchButton.addEventListener('click', (event) => {
   event.preventDefault();
   searchFunction(searchInput, data);
});
