const myVideoLink = localStorage.getItem("videoLink");
const localFile = localStorage.getItem("file");
let file = localFile || '0:00:00.000,0:00:05.000';
let playTimeout;
let subtitlesList = [];
let myPlayer = videojs('movieVideo');

if (myVideoLink) {
	videoLink.value = myVideoLink;

	myPlayer.src({
		type: 'video/youtube',
		src: myVideoLink
	});
}

function formatTimeToSeconds(str) {
	const [hours, mins, secs] = str.split(":");
	return ((+hours * 60) + (+mins * 60) + +Number(secs));
}

function formatSecondsToTime(n) {
	return new Date(n * 1000).toISOString().slice(12, 23);
}

/* https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server */
function download(content, mimeType, filename) {
	const a = document.createElement('a');
	const blob = new Blob([content], {
		type: mimeType
	});
	const url = URL.createObjectURL(blob);
	a.setAttribute('href', url);
	a.setAttribute('download', filename);
	a.click();
}

function downloadFile() {
	const content = localStorage.getItem("file");
	const mimeType = "text/plain";
	const filename = "(edited) " + sbvFile.files[0].name;
	download(content, mimeType, filename);
}

function objectifySubtitles(file) {
	subtitlesList = file.split(/\n\n+/).map(subtitle => {
		const lines = subtitle.split('\n');
		const start = lines[0].split(',')[0];
		const end = lines[0].split(',')[1];
		const text = lines.splice(1).join('\n');
		return {
			start,
			end,
			text
		};
	});
}

function startApp(file) {
	objectifySubtitles(file);
	renderSubtitles();
	saveFile();
}

if (file) {
	startApp(file);
}

function onFileSelected(event) {
	var selectedFile = event.target.files[0];
	var reader = new FileReader();

	reader.onload = function (event) {
		const file = event.target.result;
		localStorage.setItem("file", file);
		startApp(file);
	};

	reader.readAsText(selectedFile);
}

function onVideoLinkSelected() {	
	myPlayer.src({
		type: 'video/youtube',
		src: videoLink.value
	});

	localStorage.setItem("videoLink", videoLink.value);
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

function playClip(i) {

	const start = formatTimeToSeconds(subtitlesList[i].start);
	const end = formatTimeToSeconds(subtitlesList[i].end);

	myPlayer.currentTime(start);
	myPlayer.play();

	if (playTimeout) {
		clearTimeout(playTimeout);
	}

	playTimeout = setTimeout(function () {
		myPlayer.pause();
	}, (end - start) * 1000);
}

function saveFile() {
	const file = [...document.querySelectorAll(".subtitleContainer")].map(subtitle => {
		const start = subtitle.querySelector(".f-start")?.value;
		const end = subtitle.querySelector(".f-end")?.value;
		const text = subtitle.querySelector(".f-text")?.value;
		return `${start},${end}\n${text}`;
	}).join(`\n\n`);
	result.value = file;
	localStorage.setItem("file", file);
	objectifySubtitles(file);
}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();

	return div.firstChild;
}

function addAboveSubtitle(i) {
	subtitlesList.splice(i, 0, {
		start: subtitlesList[i - 1]?.end || subtitlesList[i]?.start,
		end: subtitlesList[i]?.start,
		text: ''
	});
	renderSubtitles();
}

function addBelowSubtitle(i) {
	subtitlesList.splice(i + 1, 0, {
		start: subtitlesList[i]?.end,
		end: subtitlesList[i + 1]?.start || subtitlesList[i]?.end,
		text: ''
	});
	renderSubtitles();
}

function deleteClip(i) {
	subtitlesList.splice(i, 1);
	renderSubtitles();
	saveFile();
}

function updateStart(i) {
	subtitlesList[i].start = formatSecondsToTime(myPlayer.currentTime());
	renderSubtitles();
	saveFile();
}

function updateEnd(i) {
	subtitlesList[i].end = formatSecondsToTime(myPlayer.currentTime());
	renderSubtitles();
	saveFile();
}

function renderSubtitles() {
	subtitlesContainer.innerHTML = addTemp('addAboveSubtitle(0)');
	const subtitles = subtitlesList.map((subtitle, i) => {
		return (subTemp(i, subtitle.start, subtitle.end, subtitle.text) + addTemp(`addBelowSubtitle(${i})`));
	});
	subtitlesContainer.innerHTML += subtitles.join('');
}

sbvFile.addEventListener("change", onFileSelected);
videoLink.addEventListener("change", onVideoLinkSelected);
mp4File.addEventListener("change", onMP4Selected);
subtitlesContainer.addEventListener("change", saveFile);
downloadBtn.addEventListener("click", downloadFile);