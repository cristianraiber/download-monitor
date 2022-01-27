// This will hold the the file as a local object URL
var _OBJECT_URL;
let log_id = 0;

function handleDownloadLinkClick(e) {
	let href = this.getAttribute('href');
	let id = this.parentNode.className.split('-')[2];
	// Get the parent container class name of the button
	if (this.href.indexOf('?ajax_download') === -1) {
		href = new URL(href);
		href.searchParams.append('ajax_download', 'true');
	}
	e.preventDefault();

	var request = new XMLHttpRequest();
	if (typeof href == 'object') {
		href = href.href;
	}
	// Bind this
	let button = this;

	// Get headers

	request.open('GET', href, true);

	request.responseType = 'blob';
	request.onreadystatechange = function () {
		let log_id = request.getResponseHeader('log_id');
		let extension = request.getResponseHeader('extension');
		let status =
			request.getResponseHeader('log_status') != null
				? request.getResponseHeader('log_status')
				: 'completed';
		if (request.status == 404 && request.readyState == 4) {
			// Change display type of the button
			button.style.display = 'none';
			if (request.statusText == 'Not Found') {
				document.querySelector(
					`.download-container-${id} .progress-bar-container`
				).style.display = 'none';

				// Hide the button and display a success message
				document.querySelector(
					`.download-container-${id} .download-link`
				).style.display = 'none';

				// Append a paragraph to display message
				let p = document.createElement('p');
				p.innerHTML = 'Download failed';
				// Append the paragraph to the download-contaner
				document
					.querySelector(`.download-container-${id}`)
					.appendChild(p);
				let data = {
					action: 'log_download',
					download_id: id,
					log_id: log_id,
					log_status: status,
				};
				jQuery.post(dlmProgressVar.ajaxUrl, data, function (res) {});
			}

			let statusText = request.statusText.split(',');
			if (statusText[0] == 'redirect') {
				window.location.href = statusText[1];
			}

			if (statusText[0] == 'NoFilePaths') {
				// Append a paragraph to display message
				let p = document.createElement('p');
				p.innerHTML = statusText[1];
				button.parentNode.appendChild(p);
			}

			if (statusText[0] == 'AccessDenied') {
				let p = document.createElement('p');
				p.innerHTML = statusText[1];
				button.parentNode.appendChild(p);
			}
		}

		if (request.status == 200 && request.readyState == 4) {
			let blob = request.response;

			_OBJECT_URL = URL.createObjectURL(blob);
			// Get the a.download-complete from the parent container
			let downloadLink = document.querySelector(
				`.download-container-${id} .download-complete`
			);
			// Set the href of the a.download-complete to the object URL
			downloadLink.setAttribute('href', _OBJECT_URL);
			// Set the download attribute of the a.download-complete to the file name
			downloadLink.setAttribute('download', `${id}.${extension}`);
			// Trigger click on a.download-complete
			downloadLink.click();

			document.querySelector(
				`.download-container-${id} .progress-bar-container`
			).style.display = 'none';

			// Hide the button and display a success message
			document.querySelector(
				`.download-container-${id} .download-link`
			).style.display = 'none';

			// Append a paragraph to display message
			let p = document.createElement('p');
			p.innerHTML = 'Download complete';
			// Append the paragraph to the download-contaner
			document.querySelector(`.download-container-${id}`).appendChild(p);

			// Ajax request to update the log
			var data = {
				action: 'log_download',
				download_id: id,
				log_id: log_id,
				log_status: status,
			};
			jQuery.post(dlmProgressVar.ajaxUrl, data, function (res) {});
		}
	};
	request.addEventListener('progress', function (e) {
		var percent_complete = (e.loaded / e.total) * 100;
		// Force perfect complete to have 2 digits
		percent_complete = Math.round(percent_complete * 100) / 100;
		document.querySelector(
			`.download-container-${id} .progress-bar-container .progress-bar`
		).style.width = percent_complete + '%';
		// Set download container display to block
		document.querySelector(
			`.download-container-${id} .progress-bar-container`
		).style.display = 'block';
		//Set the inner html of the progress bar to the percentage of upload completed
		document.querySelector(
			`.download-container-${id} .progress-bar-container .progress-bar-percent`
		).innerHTML = percent_complete + '%';
		// Append progress bar below the button
	});
	request.onerror = function () {
		console.log('** An error occurred during the transaction');
	};

	request.send();
	// Remove event listener
	this.removeEventListener('click', handleDownloadLinkClick);
	//Set the display of the button to none
	this.style.display = 'none';
}

function handleDownloadButtonClick(e) {
	let href = this.getAttribute('href');
	let id = this.parentNode.className.split('-')[2];
	// Get the parent container class name of the button
	if (this.href.indexOf('?ajax_download') === -1) {
		href = new URL(href);
		href.searchParams.append('ajax_download', 'true');
	}
	e.preventDefault();

	var request = new XMLHttpRequest();
	if (typeof href == 'object') {
		href = href.href;
	}
	// Bind this
	let button = this;

	// Get headers

	request.open('GET', href, true);

	request.responseType = 'blob';
	request.onreadystatechange = function () {
		let log_id = request.getResponseHeader('log_id');
		let extension = request.getResponseHeader('extension');
		let status =
			request.getResponseHeader('log_status') != null
				? request.getResponseHeader('log_status')
				: 'completed';
		if (request.status == 404 && request.readyState == 4) {
			// Change display type of the button
			button.style.display = 'none';
			if (request.statusText == 'Not Found') {
				document.querySelector(
					`.download-container-${id} .progress-bar-container`
				).style.display = 'none';

				// Hide the button and display a success message
				document.querySelector(
					`.download-container-${id} .download-button`
				).style.display = 'none';

				// Append a paragraph to display message
				let p = document.createElement('p');
				p.innerHTML = 'Download failed';
				// Append the paragraph to the download-contaner
				document
					.querySelector(`.download-container-${id}`)
					.appendChild(p);
				let data = {
					action: 'log_download',
					download_id: id,
					log_id: log_id,
					log_status: status,
				};
				jQuery.post(dlmProgressVar.ajaxUrl, data, function (res) {});
			}

			let statusText = request.statusText.split(',');
			if (statusText[0] == 'redirect') {
				window.location.href = statusText[1];
			}

			if (statusText[0] == 'NoFilePaths') {
				// Append a paragraph to display message
				let p = document.createElement('p');
				p.innerHTML = statusText[1];
				button.parentNode.appendChild(p);
			}

			if (statusText[0] == 'AccessDenied') {
				let p = document.createElement('p');
				p.innerHTML = statusText[1];
				button.parentNode.appendChild(p);
			}
		}

		if (request.status == 200 && request.readyState == 4) {
			let blob = request.response;

			_OBJECT_URL = URL.createObjectURL(blob);
			// Get the a.download-complete from the parent container
			let downloadLink = document.querySelector(
				`.download-container-${id} .download-complete`
			);
			// Set the href of the a.download-complete to the object URL
			downloadLink.setAttribute('href', _OBJECT_URL);
			// Set the download attribute of the a.download-complete to the file name
			downloadLink.setAttribute('download', `${id}.${extension}`);
			// Trigger click on a.download-complete
			downloadLink.click();

			document.querySelector(
				`.download-container-${id} .progress-bar-container`
			).style.display = 'none';

			// Hide the button and display a success message
			document.querySelector(
				`.download-container-${id} .download-button`
			).style.display = 'none';

			// Append a paragraph to display message
			let p = document.createElement('p');
			p.innerHTML = 'Download complete';
			// Append the paragraph to the download-contaner
			document.querySelector(`.download-container-${id}`).appendChild(p);

			// Ajax request to update the log
			var data = {
				action: 'log_download',
				download_id: id,
				log_id: log_id,
				log_status: status,
			};
			jQuery.post(dlmProgressVar.ajaxUrl, data, function (res) {});
		}
	};
	request.addEventListener('progress', function (e) {
		var percent_complete = (e.loaded / e.total) * 100;
		// Force perfect complete to have 2 digits
		percent_complete = Math.round(percent_complete * 100) / 100;
		document.querySelector(
			`.download-container-${id} .progress-bar-container .progress-bar`
		).style.width = percent_complete + '%';
		// Set download container display to block
		document.querySelector(
			`.download-container-${id} .progress-bar-container`
		).style.display = 'block';
		//Set the inner html of the progress bar to the percentage of upload completed
		document.querySelector(
			`.download-container-${id} .progress-bar-container .progress-bar-percent`
		).innerHTML = percent_complete + '%';
		// Append progress bar below the button
	});
	request.onerror = function () {
		console.log('** An error occurred during the transaction');
	};

	request.send();
	// Remove event listener
	this.removeEventListener('click', handleDownloadLinkClick);
	//Set the display of the button to none
	this.style.display = 'none';
}
// Loop through all .download-links buttons and add click event listener to them
document.querySelectorAll('.download-link').forEach(
	function (button) {
		button.addEventListener('click', handleDownloadLinkClick);
	},
	{ once: true }
);

document.querySelectorAll('.download-button').forEach(
	function (button) {
		button.addEventListener('click', handleDownloadButtonClick);
	},
	{ once: true }
);
