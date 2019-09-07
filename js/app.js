/* -------------------------------
---------- GLOBAL VARIABLES ------
--------------------------------*/

const gallery = document.querySelector('div#gallery');

/* -------------------------------
---------- FETCH DATA ------------
--------------------------------*/

function fetchData(url) {
  fetch(url)
  .then(data => data.json())
  .then(res => generateGallery(res.results[0]))
}
for (let i = 0; i < 12; i += 1) {
  fetchData('https://randomuser.me/api/');
}

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