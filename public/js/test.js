//console.log("client side JS Code");

/*

fetch("http://puzzle.mead.io/puzzle").then(res => {
  res.json().then(data => {
    console.log(data);
  });
});

*/

/*

fetch("http://localhost:3000/weather?address=!").then(res => {
  res.json().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.forcast);
      console.log(data.location);
    }
  });
});

*/
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;

  msg1.textContent = "Loading....";
  msg2.textContent = "";
  msg3.textContent = "Temperature in *C :";

  fetch("/weather?address=" + location).then(res => {
    res.json().then(data => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forcast.Summary;
        msg3.textContent += data.forcast.temperature;
        console.log(data.forcast);
      }
    });
  });
});
