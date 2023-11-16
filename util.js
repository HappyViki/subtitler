let myPlayer = videojs('movieVideo');
let playTimeout;

export const objectifySubtitles = (file) => {
	return file.split(/\n\n+/).map(subtitle => {
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

export const formatTimeToSeconds = (str) => {
	const [hours, mins, secs] = str.split(":");
	return ((+hours * 60) + (+mins * 60) + +Number(secs));
}

export const formatSecondsToTime = (n) => {
	return new Date(n * 1000).toISOString().slice(12, 23);
}

export const toWebVTT = (tracks) => {
	return `WEBVTT

	` + tracks.map(({start, end, text})=>{
		return `${start} --> ${end}
		${text}`
	}).join(`\n\n`)
} 

export const toSBV = (tracks) => {
	return tracks.map(({start, end, text})=>{
		return `${start},${end}\n${text}`
	}).join(`\n\n`)
}

/* https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server */
export const download = ({content, mimeType = "text/plain", filename}) => {
	const a = document.createElement('a');
	const blob = new Blob([content], {
		type: mimeType
	});
	const url = URL.createObjectURL(blob);
	a.setAttribute('href', url);
	a.setAttribute('download', filename);
	a.click();
}

export const addFirstClip = (subtitlesList) => {
	subtitlesList.unshift({
		start: '0:00:00.000',
		end: subtitlesList[0]?.start || '0:00:05.000',
		text: ''
	});
}

export const insertClip = (i, subtitlesList) => {
	subtitlesList.splice(i + 1, 0, {
		start: subtitlesList[i]?.end,
		end: subtitlesList[i + 1]?.start || subtitlesList[i]?.end || '0:00:00.000',
		text: ''
	});
}

export const playClip = (i, subtitlesList) => {
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

export const deleteClip = (i, subtitlesList) => {
	subtitlesList.splice(i, 1);
}

export const updateStartClip = (i, subtitlesList) => {
	subtitlesList[i].start = formatSecondsToTime(myPlayer.currentTime());
}

export const updateEndClip = (i, subtitlesList) => {
	subtitlesList[i].end = formatSecondsToTime(myPlayer.currentTime());
}