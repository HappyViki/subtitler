const subTemp = (i, start, end, text) => `<div id="sub-${i}" class="card mb-4 subtitleContainer">
<div class="card-body">
    <div class="mb-3">
        <form class="form-inline">
            <label class="sr-only" for="inlineFormInputGroupStart${i}">Start</label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">@</div>
                </div>
                <input name="start" type="text" class="form-control f-start" id="inlineFormInputGroupStart${i}"
                    value="${start}">
            </div>
            <label class="sr-only" for="inlineFormInputGroupEnd${i}">End</label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">@</div>
                </div>
                <input name="end" type="text" class="form-control f-end" id="inlineFormInputGroupEnd${i}"
                    value="${end}">
            </div>
        </form>
    </div>
    <div class="mb-3">
        <button type="button" class="btn btn-primary btn-start-clip mb-1">Update Start</button>
        <button type="button" class="btn btn-primary btn-end-clip mb-1">Update End</button>
    </div>
    <p class="mb-3">
        <textarea name="text" class="form-control f-text" rows="3">${text}</textarea>
    </p>
    <button type="button" class="btn btn-success btn-play-clip mb-1">Play</button>
    <!--<button type="button" class="btn btn-warning btn-pause-clip mb-1" disabled>Pause</button>-->
    <button type="button" class="btn btn-danger btn-delete-clip mb-1">Delete</button>
</div>
</div>`;

const addTemp = (fn) => `<div class="mb-4">
<button onclick="${fn}" type="button" class="btn btn-primary btn-block mb-1">Add</button>
</div>`;

const rowTemp = (i, title, link) => `<div id="row-${i}" class="card d-flex flex-row mb-3 active">
<div class="d-flex flex-grow-1 min-width-zero">
    <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
        <button onclick="editProject(${i})" type="button" class="list-item-heading btn mb-0 text-primary w-15 w-xs-100">${title || "New Project"}</button>
        <a class="mb-0 truncate w-40 w-xs-100 text-center" href="${link || ""}">
            ${link || "N/A"}
        </a>
        <div class="w-15 w-xs-100 text-center">
            <span class="badge badge-pill badge-secondary">In Progress</span>
        </div>
        <button onclick="deleteProject(${i})" type="button" class="list-item-heading btn mb-0 text-danger w-15 w-xs-100">Delete</button>
    </div>
</div>
</div>`