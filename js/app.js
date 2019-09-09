window.addEventListener('DOMContentLoaded', () => {

/* -------------------------------
---------- GLOBAL VARIABLES ------
--------------------------------*/

const body = document.querySelector('body');
const gallery = document.querySelector('div#gallery');
const searchContainer = document.querySelector('.search-container');
let searchInput;
let dataObject;
let modalNumber = 0;

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

function generateSearchBar() {
  const html = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
  </form>
  `
  searchContainer.innerHTML = html;
}

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
--------- EVENT LISTENERS --------
--------------------------------*/

body.addEventListener('click', (e) => {
  if (checkClick(e) !== false) {
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i += 1) {
      if (checkClick(e) === cards[i]) {
        generateModal(dataObject[i]);
        modalNumber = i;
      }
    }
  }

  if (e.target.className === '#modal-close-btn' || e.target.tagName === 'STRONG') {
    body.removeChild(document.querySelector('div.modal-container'));
  } else if (e.target.className === "modal-prev btn") {
    if (modalNumber <= 0) {
      return false;
    } else {
      modalNumber -= 1;
      generateModal(dataObject[modalNumber]);
    }
  } else if (e.target.className === "modal-next btn") {
    if (modalNumber >= 11) {
      return false;
    } else {
      modalNumber += 1;
      generateModal(dataObject[modalNumber]);
    }
  }
});

generateSearchBar();

body.addEventListener('submit', (e) => {
  searchInput = document.querySelector('.search-input');
  let value = searchInput.value.toUpperCase();
  let h3 = document.querySelectorAll('.card-name');
  const cards = document.querySelectorAll('.card');

  for (let i = 0; i < cards.length; i += 1) {
    if (h3[i].textContent.toUpperCase().includes(value)) {
      cards[i].style.opacity = 1.0;
    } else {
      cards[i].style.opacity = 0;
    }
  }
});

body.addEventListener('keyup', (e) => {
  searchInput = document.querySelector('.search-input');
  let h3 = document.querySelectorAll('.card-name');
  const cards = document.querySelectorAll('.card');
  if (searchInput.value === '') {
    for (let i = 0; i < cards.length; i += 1) {
      cards[i].style.opacity = 1.0;
    }
  }
});



});
