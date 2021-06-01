/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering (Refresh 2021)
by Jesse Gay
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Global variables.??


const itemsPerPage = 9; // we want 9. FIXME: this might be specified elsewhere.
// const list = data; 
/* Is this it? doesn't feel right. Why don't we just refer to data? Should this be global, or inside showPage()? Wait, maybe I don't 
need to even do this. I'll just pass in data when I call the function */
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPaginationButtons = (list) => {
   const buttonsNeeded = Math.ceil(list.length/itemsPerPage);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 0; i < buttonsNeeded; i++) {
      let buttonsList = `<li>
      <button type="button">${i+1}</button>
      </li>`;
      linkList.insertAdjacentHTML("beforeend", buttonsList);
   }
   // add 'active' class to first li item //duh, active class should be added to BUTTONS, not li
   // let selectedLink = document.querySelector('.link-list li');
   // console.log(selectedLink);
   // selectedLink.classList.add('active');
   linkList.getElementsByTagName('button')[0].classList.add('active');
   // add event listener to all li items. I'm trying to use event delegation, rather than doing each one individually.
   linkList.addEventListener("click", event => {
      showPage(list, event.target.textContent);
      // Remove the active class from any other pagination button. Let's try 'for of'
      let paginationButtons = linkList.getElementsByTagName('button');
      //console.log(paginationButtons);
      // for (const paginationButton of paginationButtons) {
      //    paginationButton.classList.remove('active');
      // }
      // Hmmm, not working. Try traditional for loop.
      for (let i = 0; i < paginationButtons.length; i++) {
         paginationButtons[i].classList.remove('active');
         
      }
      // Not working either.
      // Add the active class to the pagination button that was just clicked. :FIXME need to remove active class from others
      event.target.classList.add('active');
   });
}

// Call functions
showPage(data,2);
addPaginationButtons(data);