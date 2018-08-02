
function ajax(url, callback, args) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		callback(xhr.responseText, args);
	};
	xhr.send();
}
