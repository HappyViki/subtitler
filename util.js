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