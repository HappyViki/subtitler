let items = JSON.parse(localStorage.getItem("items")) || [];
console.log(items);

function editProject(i) {
	localStorage.setItem("currentProjectId", i);
	window.location.href = "index.html";
}

function renderRows() {    
	rowsContainer.innerHTML = "";
	const rows = items.map((row, i) => {
		return rowTemp(i, row.projectName, row.videoLink);
	});
	rowsContainer.innerHTML += rows.join('');
}

renderRows();

addProjectBtn.addEventListener("click", ()=>{
	items.unshift({
		file: "",
		projectName: "",
		videoLink: ""
	});
	localStorage.setItem("items", JSON.stringify(items));	
	renderRows();
})

function deleteProject(i) {
	items.splice(i, 1)
	localStorage.setItem("items", JSON.stringify(items));	
	renderRows();
}