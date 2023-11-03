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
        <button onclick="updateStart(${i})" type="button" class="btn btn-primary mb-1">Update Start</button>
        <button onclick="updateEnd(${i})" type="button" class="btn btn-primary mb-1">Update End</button>
    </div>
    <p class="mb-3">
        <textarea name="text" class="form-control f-text" rows="3">${text}</textarea>
    </p>
    <button onclick="playClip(${i})" type="button" class="btn btn-success mb-1">Play</button>
    <!--<button type="button" class="btn btn-warning mb-1" disabled>Pause</button>-->
    <button onclick="deleteClip(${i})" type="button" class="btn btn-danger mb-1">Delete</button>
</div>
</div>`;

const addTemp = (fn) => `<div class="mb-4">
<button onclick="${fn}" type="button" class="btn btn-primary btn-block mb-1">Add</button>
</div>`;

const rowTemp = (i, title, status) => `<tr id="row-${i}">
<td>
    <a href="index.html"><p class="list-item-heading">${title}</p></a>
</td>
<td>
    <p class="text-muted">${status}</p>
</td>
<td>
    <label
        class="custom-control custom-checkbox mb-1 align-self-center data-table-rows-check">
        <input type="checkbox" class="custom-control-input">
        <span class="custom-control-label">&nbsp;</span>
    </label>
</td>
</tr>`;