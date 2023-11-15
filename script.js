import {
	objectifySubtitles,
	formatTimeToSeconds,
	formatSecondsToTime,
	toWebVTT,
	toSBV,
	download,
} from './util.js';

let playTimeout;
let items = JSON.parse(localStorage.getItem("items")) || [];
let currentProjectId = localStorage.getItem("currentProjectId") || 0;
let subtitlesList = items[currentProjectId]?.subtitlesList || [{
	start: '0:00:00.000',
	end: '0:00:05.000',
	text: ''
}];
let myPlayer = videojs('movieVideo');
projectName.value = items[currentProjectId]?.projectName || '';

if (!!items[currentProjectId]?.videoLink) {
	videoLink.value = items[currentProjectId].videoLink;

	myPlayer.src({
		type: 'video/youtube',
		src: items[currentProjectId].videoLink
	});
}

function onFileSelected(event) {
	var selectedFile = event.target.files[0];
	var reader = new FileReader();

	reader.onload = function (event) {
		subtitlesList = objectifySubtitles(event.target.result);
		renderSubtitles();
	};

	reader.readAsText(selectedFile);
}

function onEditProjectName() {	
	items[currentProjectId] = {...items[currentProjectId], projectName: projectName.value}
	localStorage.setItem("items", JSON.stringify(items));
}

function onVideoLinkSelected() {	
	myPlayer.src({
		type: 'video/youtube',
		src: videoLink.value
	});

	items[currentProjectId] = {...items[currentProjectId], videoLink: videoLink.value}
	localStorage.setItem("items", JSON.stringify(items));
}

function onMP4Selected() {
	const video = URL.createObjectURL(mp4File.files[0]);
	myPlayer.src({
		type: 'video/mp4',
		src: video
	});
	myPlayer.onload = () => {
		URL.revokeObjectURL(video);
	};
}

function saveFile() {
	subtitlesList = [...document.querySelectorAll(".subtitleContainer")].map(subtitle => {
		const start = subtitle.querySelector(".f-start")?.value;
		const end = subtitle.querySelector(".f-end")?.value;
		const text = subtitle.querySelector(".f-text")?.value;
		return {start, end, text};
	});
	
	items[currentProjectId] = {...items[currentProjectId], subtitlesList}
	localStorage.setItem("items", JSON.stringify(items));

	let oldTracks = myPlayer.remoteTextTracks();
	let i = oldTracks.length;
	while (i--) {
		myPlayer.removeRemoteTextTrack(oldTracks[i]);
	}
	myPlayer.addRemoteTextTrack({
		src: `data:text/srt;base64,${btoa(toWebVTT([...subtitlesList]))}`,
		kind: "captions",
		label: "English",
		srclang: "en",
		default: true,
		mode: 'showing'
	});
}

// Subtitles Utils

const addFirstClip = () => {
	subtitlesList.unshift({
		start: '0:00:00.000',
		end: subtitlesList[0]?.start || '0:00:05.000',
		text: ''
	});
}

const insertClip = (i) => {
	subtitlesList.splice(i + 1, 0, {
		start: subtitlesList[i]?.end,
		end: subtitlesList[i + 1]?.start || subtitlesList[i]?.end || '0:00:00.000',
		text: ''
	});
}

const playClip = (i) => {
	const start = formatTimeToSeconds(subtitlesList[i].start);
	const end = formatTimeToSeconds(subtitlesList[i].end)

	myPlayer.currentTime(start);
	myPlayer.play();

	if (playTimeout) {
		clearTimeout(playTimeout);
	}

	playTimeout = setTimeout(function () {
		myPlayer.pause();
	}, (end - start) * 1000);
}

const deleteClip = (i) => {
	subtitlesList.splice(i, 1);
}

const updateStartClip = (i) => {
	subtitlesList[i].start = formatSecondsToTime(myPlayer.currentTime());
}

const updateEndClip = (i) => {
	subtitlesList[i].end = formatSecondsToTime(myPlayer.currentTime());
}

function renderSubtitles () {
	subtitlesContainer.innerHTML = `<div class="mb-4">
	<button type="button" class="btn btn-primary btn-block btn-add-first mb-1">Add</button>
	</div>`;
	const subtitles = subtitlesList.map((subtitle, i) => {
		return (subTemp(i, subtitle.start, subtitle.end, subtitle.text) + `<div class="mb-4">
		<button type="button" class="btn btn-primary btn-block btn-add-insert mb-1">Add</button>
		</div>`);
	});

	subtitlesContainer.innerHTML += subtitles.join('');

	saveFile();

	subtitlesContainer.querySelector(".btn-add-first").addEventListener("click", () => {
		addFirstClip(i);
		renderSubtitles();
	})

	document.querySelectorAll(".btn-add-insert").forEach((insertBtn, i) => {
		insertBtn.addEventListener("click", () => {
			insertClip(i);
			renderSubtitles();
		})
	});

	document.querySelectorAll(".subtitleContainer").forEach((subtitle, i) => {
		subtitle.querySelector(".btn-start-clip").addEventListener("click", () => {
			updateStartClip(i);
			renderSubtitles();
		})
		subtitle.querySelector(".btn-end-clip").addEventListener("click", () => {
			updateEndClip(i);
			renderSubtitles();
		})
		subtitle.querySelector(".btn-play-clip").addEventListener("click", () => playClip(i))
		subtitle.querySelector(".btn-delete-clip").addEventListener("click", () => {
			deleteClip(i);
			renderSubtitles();
		})
	});
}
renderSubtitles();

projectName.addEventListener("change", onEditProjectName);
sbvFile.addEventListener("change", onFileSelected);
videoLink.addEventListener("change", onVideoLinkSelected);
mp4File.addEventListener("change", onMP4Selected);
subtitlesContainer.addEventListener("change", saveFile);
downloadBtn.addEventListener("click", () => {
	let filename = "subtitles.sbv";

	if (projectName.value !== '') {
		filename = projectName.value + ".sbv";
	} else if (sbvFile.files[0] !== undefined) {
		filename = "(edited) " +  sbvFile.files[0].name;
	}

	download({content: toSBV(subtitlesList), filename});
});