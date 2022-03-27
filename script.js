const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellJoke(joke) {
  VoiceRSS.speech({
    key: "631c7dbe7d464a19a472b2e1d302b0ed",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellJoke(joke);
    toggleButton();
  } catch (error) {
    console.log("whoops ", error);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
