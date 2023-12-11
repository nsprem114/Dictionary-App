/** @format */
let input = document.querySelector("#input");

let searchBtn = document.querySelector("#search");

let apiKey = "ba1c72a0-bb0b-4e0c-8709-1f8d588e3b9a";

let notFound = document.querySelector(".not_found");

let defBox = document.querySelector(".def");

let audioBox = document.querySelector(".audio");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Get Input Data
  let word = input.value;
  // call API get data
  if (word === "") {
    alert("Word is required");
    return;
  }

  getData(word);
});

async function getData(word) {
  // Ajax Call
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/sd3/json/${word}?key=${apiKey}`
  );
  const data = await response.json();

  // If Not Found
  if (!data.length) {
    notFound.innerText = "No result found";
    return;
  }

  //   If Result is suggestion
  if (typeof data[0] === "string") {
    let heading = document.createElement("h3");
    heading.innerText = "Did you mean?";
    notFound.appendChild(heading);
    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("suggested");
      suggestion.innerText = element;
      notFound.appendChild(suggestion);
    });
    return;
  }

  //   Result found
  let defination = data[0].shortdef[0];
  defBox.innerText = defination;

  //   sound
  const soundName = data[0].hwi.prs.sound.audio;
  if (soundName) {
    renderSound(soundName);
  }

  console.log(data);
}

function renderSound(soundName) {
  // https://media.merriam-webster.com/soundc11
  let subfolder = soundName.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

  let aud = document.createElement("audio");
  aud.src = soundSrc;
  aud.controls = true;
  audioBox.appendChild(aud);
}
