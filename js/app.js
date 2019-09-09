window.addEventListener('DOMContentLoaded', () => { //waits for HTML and CSS to load before JavaScript files are executed 

  /* -------------------------------
  ---------- GLOBAL VARIABLES ------
  --------------------------------*/

  const body = document.querySelector('body');
  const gallery = document.querySelector('div#gallery');
  const searchContainer = document.querySelector('.search-container');
  let searchInput;
  let dataObject; //global variable of the data received from the API request
  let modalNumber = 0; //The modal number is an index number of which card the modal represents

  /* -------------------------------
  ---------- FETCH DATA ------------
  --------------------------------*/


  fetch('https://randomuser.me/api/?results=12&nat=gb')
    .then( data => data.json() )
    .then(res => {
      for (let i = 0; i < 12; i += 1) {
        generateGallery(res.results[i]);
      }
      dataObject = res.results;
    })

    /* -------------------------------
    ---------- FUNCTIONS -------------
    --------------------------------*/


  //add every card of users to the page
  function generateGallery(data) {
    const html = `
      <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first}, ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
      </div>
    `
    gallery.innerHTML += html;
  }


  //adds the modal html to the page
  function generateModal(data) {
    const html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first}, ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street}, ${data.location.state}, ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${data.registered.date}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
  `
    if (document.querySelector('div.modal-container')) {
      body.removeChild(document.querySelector('div.modal-container'));
    }
    body.innerHTML += html;
  }


  //adds the search bar to the page
  function generateSearchBar() {
    const html = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>
    `
    searchContainer.innerHTML = html;
  }
  generateSearchBar(); //calls the function above ^^^^


  //checks if click is on the a card and returns the div that was clicked
  function checkClick(e) {
    let divClicked;
    const divClass = e.target.getAttribute("class");

    if (e.target.divClass === 'gallery') {
      return false;
    } else if (e.target.className === 'card') {
      return divClicked = e.target;
    } else if (e.target.tagName === 'BUTTON') {
      return false;
    } else {
      return divClicked = e.target.parentElement.parentElement;
    }
  }

  /* -------------------------------
  ------- CLICK EVENT LISTENER -----
  --------------------------------*/

  body.addEventListener('click', (e) => {


    if (checkClick(e) !== false) {
      const cards = document.querySelectorAll('.card');
      for (let i = 0; i < cards.length; i += 1) {
        if (checkClick(e) === cards[i]) { //displays a modal of the corresponding card that was clicked
          generateModal(dataObject[i]);
          modalNumber = i; //The modal number is an index number of which card the modal represents
        }
      }
    }

  //event listener for the button that closes the modal
    if (e.target.className === '#modal-close-btn' || e.target.tagName === 'STRONG') {
      body.removeChild(document.querySelector('div.modal-container'));
    } else if (e.target.className === "modal-prev btn") { //event listener for the 'previous' button
      if (modalNumber <= 0) {
        return false;
      } else {
        modalNumber -= 1;
        generateModal(dataObject[modalNumber]); //generates modal according to the index number of the card
      }
    } else if (e.target.className === "modal-next btn") { //event listener for the 'next' button
      if (modalNumber >= 11) {
        return false;
      } else {
        modalNumber += 1;
        generateModal(dataObject[modalNumber]); //generates modal according to the index number of the card
      }
    }
  });



  /* -------------------------------
  ----- OTHER EVENT LISTENERS ------
  --------------------------------*/

  body.addEventListener('submit', (e) => { //listens for submit event
    searchInput = document.querySelector('.search-input');
    let value = searchInput.value.toUpperCase();
    let h3 = document.querySelectorAll('.card-name');
    const cards = document.querySelectorAll('.card');

    for (let i = 0; i < cards.length; i += 1) {
      if (h3[i].textContent.toUpperCase().includes(value)) {
        cards[i].style.opacity = 1.0; //sets opacity of 1 to every element that is searched for
      } else {
        cards[i].style.opacity = 0; //hides element that search does not include
      }
    }
  });


  body.addEventListener('keyup', (e) => { //event listener created to automatically update when the search field is blank
    searchInput = document.querySelector('.search-input');
    let h3 = document.querySelectorAll('.card-name');
    const cards = document.querySelectorAll('.card');
    if (searchInput.value === '') {
      for (let i = 0; i < cards.length; i += 1) {
        cards[i].style.opacity = 1.0; // when search field is blank, all users can be seen on the page
      }
    }
  });



}); // End of window.DOMContentLoaded event listener
