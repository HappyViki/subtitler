import {
	objectifySubtitles,
	toWebVTT,
	toSBV,
	download,
	addFirstClip,
	insertClip,
	playClip,
	deleteClip,
	updateStartClip,
	updateEndClip,
} from './util.js';

let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentProjectId = localStorage.getItem("currentProjectId") || 0;
let subtitlesList = projects[currentProjectId]?.subtitlesList || [{
	start: '0:00:00.000',
	end: '0:00:05.000',
	text: ''
}];
let myPlayer = videojs('movieVideo');
projectName.value = projects[currentProjectId]?.projectName || '';

if (!!projects[currentProjectId]?.videoLink) {
	videoLink.value = projects[currentProjectId].videoLink;

	myPlayer.src({
		type: 'video/youtube',
		src: projects[currentProjectId].videoLink
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
	projects[currentProjectId] = {...projects[currentProjectId], projectName: projectName.value}
	localStorage.setItem("projects", JSON.stringify(projects));
}

function onVideoLinkSelected() {	
	myPlayer.src({
		type: 'video/youtube',
		src: videoLink.value
	});

	projects[currentProjectId] = {...projects[currentProjectId], videoLink: videoLink.value}
	localStorage.setItem("projects", JSON.stringify(projects));
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
	
	projects[currentProjectId] = {...projects[currentProjectId], subtitlesList}
	localStorage.setItem("projects", JSON.stringify(projects));

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
		addFirstClip(subtitlesList);
		renderSubtitles();
	})

	document.querySelectorAll(".btn-add-insert").forEach((insertBtn, i) => {
		insertBtn.addEventListener("click", () => {
			insertClip(i, subtitlesList);
			renderSubtitles();
		})
	});

	document.querySelectorAll(".subtitleContainer").forEach((subtitle, i) => {
		subtitle.querySelector(".btn-start-clip").addEventListener("click", () => {
			updateStartClip(i, subtitlesList);
			renderSubtitles();
		})
		subtitle.querySelector(".btn-end-clip").addEventListener("click", () => {
			updateEndClip(i, subtitlesList);
			renderSubtitles();
		})
		subtitle.querySelector(".btn-play-clip").addEventListener("click", () => playClip(i, subtitlesList))
		subtitle.querySelector(".btn-delete-clip").addEventListener("click", () => {
			deleteClip(i, subtitlesList);
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