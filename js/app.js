window.addEventListener('DOMContentLoaded', () => {

/* -------------------------------
---------- GLOBAL VARIABLES ------
--------------------------------*/

const body = document.querySelector('body');
const gallery = document.querySelector('div#gallery');

/* -------------------------------
---------- FETCH DATA ------------
--------------------------------*/



fetch('https://randomuser.me/api/?results=12')
  .then( data => data.json() )
  .then(res => {
    console.log(res);
    for (let i = 0; i < 12; i += 1) {
      generateGallery(res.results[i]);
    }
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

function checkClick(e) {
  const divId = e.target.getAttribute('id');
  if (divId !== 'gallery') {
    return true;
  } else if (divId === 'gallery') {
    return false;
  } else {
    return true;
  }
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
  </div>
`
  body.innerHTML += html;
}

/* -------------------------------
--------- EVENT LISTENERS --------
--------------------------------*/

body.addEventListener('click', (e) => {
  if (checkClick(e)) {
    generateModal(data); //no data to send to the generateModal function
  }
});


});
