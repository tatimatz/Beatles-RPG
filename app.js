import { episodes } from "./episodes.js";

console.log(episodes);
const currentEpisodeElement = document.getElementById("current-episode");

/**
 *
 * @param {String} episodeTitle
 * @returns {Number} the given episode index in episodes array
 */
function findNextEpisodeIndex(episodeTitle) {
  if (episodeTitle === "Get Back") {
    return 0;
  }
  if (episodeTitle === "Go to a Sgt. Peppers Lonely Hearts Club Band concert") {
    return 7;
  }
  if (episodeTitle === "Call Doctor Robert") {
    return 8;
  }
  if (episodeTitle === "Call Nowhere Man") {
    return 17;
  }

  for (let i = 0; i < episodes.length; i++) {
    if (episodes[i].title === episodeTitle) return i;
  }
  return -1;
}

function prepareNextEpisode(evt) {
  console.log(evt, evt.target, evt.target.textContent);
  const nextTitle = evt.target.textContent;
  const nextIndex = findNextEpisodeIndex(nextTitle);
  if (nextIndex !== -1) render(episodes[nextIndex]);
}

function render(episode) {
  console.log("current episode :", episode);
  let template = `<div id="background">
    <h1 class="episode-title">${episode.title}</h1>
    <div class="main">
    <img id="episode-image" src="./assets/img/${episode.image}" alt="image"/>
    <div class="episodes-description des-strawberry">
        <p>${episode.description}"</p>
    <audio id="soundtrack" src="./assets/audio/${episode.audio}"></audio>
    </div>
    </div>
    </div>`;

  if (episode.choices) {
    template += `<div class="buttons">
        <button id="btn-1">${episode.choices[0]}</button>
        <button id="btn-2">${episode.choices[1]}</button>
    </div>
    `;
  }

  currentEpisodeElement.innerHTML = template;

  const audio = currentEpisodeElement.querySelector("#soundtrack");
  audio.play();

  const button1 = document.getElementById("btn-1");
  button1.addEventListener("click", prepareNextEpisode);

  const button2 = document.getElementById("btn-2");
  button2.addEventListener("click", prepareNextEpisode);

  if (episode.choices.length === 1) {
    const noButton = document.querySelector(".buttons");
    var element = document.getElementById("btn-2");
    noButton.removeChild(element);
  }
}

render(episodes[0]);
