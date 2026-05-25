// CHAPTER-1

// PART-1
// define variables

// api variables
const apiKey = "iXObB0jpwWEXSmUyJaQQ2mpUJoW1S2BVHapLBtEP";

// dom variables - left panel
const frmSearch = document.querySelector(".frmSearch");
const inpSearch = document.querySelector(".inpSearch");
const btnClearSearch = document.querySelector("#btnClearSearch");
const pResultsEmpty = document.querySelector("#pResultsEmpty");
const lstResults = document.querySelector("#lstResults");

// dom variables - right panel
const txtNowPlaying = document.querySelector(".h2NowPlayingTitle");
const spnAuthor = document.querySelector(".spnNowPlayingAuthor");
const divWaveform = document.querySelector(".divWaveform");

// PART-2
// render functions

const renderResults = (sounds) => {
	lstResults.innerHTML = "";

	if (sounds.length === 0) {
		pResultsEmpty.style.display = "";
		return;
	}

	pResultsEmpty.style.display = "none";

	for (const sound of sounds) {
		const itmResult = document.createElement("li");
		itmResult.className = "itmResult";
		itmResult.dataset.name = sound.name;
		itmResult.dataset.username = sound.username;
		itmResult.dataset.image = sound.images["waveform_bw_l"];
		itmResult.dataset.preview = sound.previews["preview-hq-mp3"];

		const divResultInfo = document.createElement("div");
		divResultInfo.className = "divResultInfo";

		const spnResultName = document.createElement("span");
		spnResultName.className = "spnResultName";
		spnResultName.textContent = sound.name;

		const spnResultMeta = document.createElement("span");
		spnResultMeta.className = "spnResultMeta";
		spnResultMeta.textContent = `${sound.username} · ${sound.duration.toFixed(1)}s`;

		divResultInfo.appendChild(spnResultName);
		divResultInfo.appendChild(spnResultMeta);

		itmResult.appendChild(divResultInfo);

		lstResults.appendChild(itmResult);
	}
};

// PART-3
// api call

const searchSound = async (term) => {
	const params = new URLSearchParams({
		query: term,
		fields: "name,username,duration,images,previews",
	});

	const url = "https://freesound.org/apiv2/search/";
	const options = {
		headers: {
			Authorization: `Token ${apiKey}`,
		},
	};

	const response = await fetch(`${url}?${params}`, options);
	const data = await response.json();

	console.log(data);
	renderResults(data.results);
};

// PART-4
// event listeners

const syncClearBtn = () => {
	btnClearSearch.classList.toggle(
		"btnClearSearchVisible",
		inpSearch.value.length > 0,
	);
};

inpSearch.addEventListener("input", syncClearBtn);

btnClearSearch.addEventListener("click", () => {
	inpSearch.value = "";
	syncClearBtn();
	inpSearch.focus();
});

frmSearch.addEventListener("submit", async (e) => {
	e.preventDefault();
	const query = inpSearch.value.trim();
	if (query) await searchSound(query);
});

const loadSong = (e) => {
	const itmResult = e.target.closest(".itmResult");
	if (!itmResult) return;
	if (itmResult.classList.contains("itmResultSelected")) return;

	audio.pause();
	syncPlayBtn();

	const itmPrev = document.querySelector(
		".itmResultSelected, .itmFavouriteSelected",
	);
	if (itmPrev) {
		itmPrev.classList.remove("itmResultSelected");
		itmPrev.classList.remove("itmFavouriteSelected");
	}
	itmResult.classList.add("itmResultSelected");

	txtNowPlaying.textContent = itmResult.dataset.name;
	spnAuthor.textContent = itmResult.dataset.username;

	divWaveform.innerHTML = "";
	const imgWaveform = document.createElement("img");
	imgWaveform.className = "imgWaveform";
	imgWaveform.src = itmResult.dataset.image;
	divWaveform.appendChild(imgWaveform);

	currentSound = {
		name: itmResult.dataset.name,
		username: itmResult.dataset.username,
		image: itmResult.dataset.image,
		preview: itmResult.dataset.preview,
	};

	audio.src = itmResult.dataset.preview;
	syncFavBtn();
};

lstResults.addEventListener("click", loadSong);

// CHAPTER-2

// PART-1
// define variables
const btnPlay = document.querySelector(".btnPlay");
const spnPlayLabel = document.querySelector(".spnPlayLabel");
const pthPlayIcon = document.querySelector(".pthPlayIcon");
const btnFavourite = document.querySelector(".btnFavourite");
const lstFavourites = document.querySelector("#lstFavourites");
const pFavouritesEmpty = document.querySelector("#pFavouritesEmpty");
const spnFavouritesCount = document.querySelector("#spnFavouritesCount");
const btnClear = document.querySelector(".btnClear");

const PLAY_ICON = "M8 5 L19 12 L8 19 Z";
const PAUSE_ICON = "M6 5 H10 V19 H6 Z M14 5 H18 V19 H14 Z";

const audio = new Audio();
let favourites = [];
let currentSound = null;

// PART-2
// helper functions
const isFavourite = (name) => favourites.some((f) => f.name === name);

const syncFavBtn = () => {
	btnFavourite.classList.toggle(
		"btnFavouriteActive",
		currentSound !== null && isFavourite(currentSound.name),
	);
};

const syncPlayBtn = () => {
	const playing = !audio.paused;
	spnPlayLabel.textContent = playing ? "Pause" : "Play";
	pthPlayIcon.setAttribute("d", playing ? PAUSE_ICON : PLAY_ICON);
};

const renderFavourites = () => {
	lstFavourites.innerHTML = "";
	spnFavouritesCount.textContent = favourites.length;
	syncClearFavBtn();

	if (favourites.length === 0) {
		pFavouritesEmpty.style.display = "";
		return;
	}

	pFavouritesEmpty.style.display = "none";

	for (const sound of favourites) {
		const itmFavourite = document.createElement("li");
		itmFavourite.className = "itmFavourite";
		itmFavourite.dataset.name = sound.name;
		itmFavourite.dataset.username = sound.username;
		itmFavourite.dataset.image = sound.image;
		itmFavourite.dataset.preview = sound.preview;

		const divFavouriteInfo = document.createElement("div");
		divFavouriteInfo.className = "divFavouriteInfo";

		const spnFavouriteName = document.createElement("span");
		spnFavouriteName.className = "spnFavouriteName";
		spnFavouriteName.textContent = sound.name;

		const spnFavouriteMeta = document.createElement("span");
		spnFavouriteMeta.className = "spnFavouriteMeta";
		spnFavouriteMeta.textContent = sound.username;

		divFavouriteInfo.appendChild(spnFavouriteName);
		divFavouriteInfo.appendChild(spnFavouriteMeta);

		itmFavourite.appendChild(divFavouriteInfo);
		lstFavourites.appendChild(itmFavourite);
	}
};

// function to delete all favourites - extra js
const syncClearFavBtn = () => {
	btnClear.classList.toggle("hidden", favourites.length === 0);
};

const clearAllFav = () => {
	//simply set the list to an empty list
	favourites = [];
	syncClearFavBtn();
	renderFavourites();
};

// PART-3
// play/pause
const togglePlay = () => {
	if (!audio.src) return;
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
};

// PART-4
// add/remove favourite
const toggleFavourite = () => {
	if (!currentSound) return;

	if (isFavourite(currentSound.name)) {
		favourites = favourites.filter((f) => f.name !== currentSound.name);
	} else {
		favourites.push({ ...currentSound });
	}

	renderFavourites();
	syncFavBtn();
};

// PART-5
// load a favourite into now playing
const loadFavourite = (e) => {
	const itmFavourite = e.target.closest(".itmFavourite");
	if (!itmFavourite) return;
	if (itmFavourite.classList.contains("itmFavouriteSelected")) return;

	audio.pause();
	syncPlayBtn();

	const itmPrev = document.querySelector(
		".itmResultSelected, .itmFavouriteSelected",
	);
	if (itmPrev) {
		itmPrev.classList.remove("itmResultSelected");
		itmPrev.classList.remove("itmFavouriteSelected");
	}
	itmFavourite.classList.add("itmFavouriteSelected");

	txtNowPlaying.textContent = itmFavourite.dataset.name;
	spnAuthor.textContent = itmFavourite.dataset.username;

	divWaveform.innerHTML = "";
	const imgWaveform = document.createElement("img");
	imgWaveform.className = "imgWaveform";
	imgWaveform.src = itmFavourite.dataset.image;
	divWaveform.appendChild(imgWaveform);

	currentSound = {
		name: itmFavourite.dataset.name,
		username: itmFavourite.dataset.username,
		image: itmFavourite.dataset.image,
		preview: itmFavourite.dataset.preview,
	};

	audio.src = itmFavourite.dataset.preview;
	syncFavBtn();
};

// PART-6
// event listeners
btnPlay.addEventListener("click", togglePlay);
btnFavourite.addEventListener("click", toggleFavourite);
lstFavourites.addEventListener("click", loadFavourite);
btnClear.addEventListener("click", clearAllFav);

audio.addEventListener("play", syncPlayBtn);
audio.addEventListener("pause", syncPlayBtn);
