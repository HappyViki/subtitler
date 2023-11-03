let items = JSON.parse(localStorage.getItem("items")) || [];

function renderRows() {    
	const rows = items.map((row, i) => {
		return rowTemp(i, row.title, row.status);
	});
	rowsContainer.innerHTML += rows.join('');
}

renderRows();