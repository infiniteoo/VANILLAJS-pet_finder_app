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
        .then((data) => console.log(data));
    })
    .catch((err) => console.error(err));
}
