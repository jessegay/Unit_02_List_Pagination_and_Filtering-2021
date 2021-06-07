/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering (Refresh 2021)
by Jesse Gay
*/

// Global variables
const itemsPerPage = 9; 
/* Number of students displayed per page. I used a const so I can easily change 
this with one edit.*/

/*
`showPage` function
This function will show a page of students selected from the list in the data.js file.
The number of students per page is defined in on line in itemsPerPage.
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
   linkList.getElementsByTagName('button')[0].classList.add('active');
   
   // Add event listener to all pagination buttons. I'm using event delegation, rather than doing each one individually.
   linkList.addEventListener("click", event => {
      showPage(list, event.target.textContent);
      // Remove the active class from other pagination buttons. 
      let paginationButtons = linkList.getElementsByTagName('button');
      for (let i = 0; i < paginationButtons.length; i++) {
         paginationButtons[i].classList.remove('active');
      }
      // Add the active class to the pagination button that was just clicked. 
      event.target.classList.add('active');
   });
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

// Create search function. 
   //create new list based on search matches
   // variables to store search input, button elements, and filtered list (starts empty and add student from data when a match occurs.)
   
   // Global variables. FIXME: Move to beginning?
   // search input (i.e. this is what we're searching for)
   const searchInput = document.querySelector('#search');
   // search button
   const searchButton = document.querySelector('#searchButton');
   // list of students. Starts empty, then matches are added. Should this go INSIDE the searchFunction()?
   // let filteredList;

   // pass in searchInput and data (data is the list of all students from data.js)
   const searchFunction = (searchInput, students) => {
      let filteredList;
         // FIXME: Do I need to clear the list first, e.g. filteredList = [];
         for (let i = 0; i < students.length; i ++) {
            //FIXME: add matches to filteredList
            // create fullName so loop can check for matches against 1 variable rather than checking first and last separately
            let fullName = `${students[i].name.first} ${students[i].name.last}`;
            if (searchInput.value.length != 0 && fullName.toLowerCase().includes(searchInput.value.toLowerCase())) {
               filteredList.push(students[i]);      
            }
         }
         // call showPage after list has been filtered.
         showPage(filteredList, 9)
      }      
   
   
/*
Submit listener
*/  
// searchButton.addEventListener('click', (event) => {
//    event.preventDefault();
//    searchFunction(searchInput, data);
// });




/* 
Display a page of students, starting on the first page.
Pass in the student list which is stored in the variable 'data' from data.js
'1' is the second argument because we want to start on the first page.
*/
showPage(data,1);
/* Add pagination buttons.*/
addPaginationButtons(data);
/* Add search bar */
createSearch();