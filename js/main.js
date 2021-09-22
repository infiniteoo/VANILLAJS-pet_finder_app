import fetchJsonp from "fetch-jsonp";
// require dotenv
require("dotenv").config();

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

// fetch animals from API
function fetchAnimals(e) {
  e.preventDefault();

  // Get user Input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;

  // fetch Pets

  let key = process.env.PETFINDER_API_KEY;
  let secret = process.env.PETFINDER_API_SECRET_KEY;
  let token;

  // get authorization token
  fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      token = data.access_token;
    })
    .then((res2) => {
      // use token to fetch animals
      fetch(
        `https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res3) => res3.json())
        .then((data) => showAnimals(data.animals));
    })
    .catch((err) => console.error(err));
}

// show listings of pets
function showAnimals(pets) {
  const results = document.querySelector("#results");

  // clear results first
  results.innerHTML = "";

  // loop through pets
  pets.forEach((pet) => {
    console.log(pet);
    // create elements
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <h4>${pet.name} (${pet.age})</h4>
        
        </div>
        <div class="col-sm-6">
        

        </div>
      </div>

    `;
    results.appendChild(div);
  });
}
