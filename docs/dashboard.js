let projects = JSON.parse(localStorage.getItem("projects")) || [];

function editProject(i) {
	localStorage.setItem("currentProjectId", i);
	window.location.href = "index.html";
}

function renderRows() {    
	rowsContainer.innerHTML = "";
	const rows = projects.map((row, i) => {
		return rowTemp(i, row.projectName, row.videoLink);
	});
	rowsContainer.innerHTML += rows.join('');
}

renderRows();

addProjectBtn.addEventListener("click", ()=>{
	projects.unshift({
		subtitlesList: [],
		projectName: "",
		videoLink: ""
	});
	localStorage.setItem("projects", JSON.stringify(projects));	
	renderRows();
})

function deleteProject(i) {
	projects.splice(i, 1)
	localStorage.setItem("projects", JSON.stringify(projects));	
	renderRows();
}