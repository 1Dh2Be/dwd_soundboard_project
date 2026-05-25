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

	txtNowPlaying.textContent = itmResult.dataset.name;
	spnAuthor.textContent = itmResult.dataset.username;
};

lstResults.addEventListener("click", loadSong);
