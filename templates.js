const subTemp = (i, start, end, text) => `<li id="sub-${i}" class="list-group-item">
							<div class="container text-center subtitleContainer">
								<div class="row mb-3">
									<div class="col-8">
										<div class="form-floating">
											<textarea class="form-control text" placeholder="Leave a comment here" id="floatingTextarea">${text}</textarea>
											<label for="floatingTextarea">subtitles</label>
										</div>
									</div>
									<div class="col-4">
										<div class="input-group input-group-sm mb-3">
											<button onclick="updateStart(${i})" class="input-group-text bg-primary text-white" id="input-start">start</button>
											<input value="${start}" type="text" class="form-control start" aria-describedby="input-start">
										</div>
										<div class="input-group input-group-sm mb-3">
											<button onclick="updateEnd(${i})" class="input-group-text bg-primary text-white" id="input-end">end</button>
											<input value="${end}" type="text" class="form-control end" aria-describedby="input-end">
										</div>
									</div>
								</div>
							</div>
							<div class="d-grid gap-2 d-md-block">
								<button onclick="playClip(event)" class="btn btn-primary play-btn" type="button">Play</button>
                                <button onclick="deleteClip(${i})" class="btn btn-primary play-btn" type="button">Delete</button>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-secondary" disabled>Add Subtitle</button>
                                    <button onclick="addAboveSubtitle(${i})" class="btn btn-primary add-above-btn" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg></button>
                                    <button onclick="addBelowSubtitle(${i})" class="btn btn-primary add-below-btn" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/></svg></button>
                                </div>
							</div>
						</li>`