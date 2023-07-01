console.log("Client side javascript loaded"); // this console only on browser

// fetch("http://localhost:3000/weather?address=kanpur").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const searchForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const content = document.querySelector("main");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(searchTerm.value);
  content.textContent = "Loading...";
  const address = searchTerm.value;
  const Base_URL = "http://localhost:3000/weather";
  const url = `${Base_URL}?address=${address}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        content.textContent = data.error;
      }
      else 
      content.textContent = data.forecast;
    });
  });
});
