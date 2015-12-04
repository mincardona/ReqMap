// compute & display status
function renderStatus() {
	var nips = 0;
	var total = 0;
	for (key in localStorage) {
        var storstr = localStorage[key];
        var separator = storstr.indexOf(" ");
        if (storstr.substring(0, separator) === '0')
            continue;
        nips++;
		total += parseInt(localStorage[key]);
	}
	document.getElementById('totalrlog').innerHTML = nips + ' / ' + total;
}

// clear localStorage
function clearAll() {
	localStorage.clear();
	renderStatus();
}

// export
function makeTab() {
	chrome.tabs.create({url: 'logtab.html'});
}

// (un)pause
function pauseFlip() {
    if (localStorage.getItem('pause')) {
        localStorage.removeItem('pause');
        document.getElementById('btnPause').innerHTML = 'Pause';
    } else {
        // set to zero so it doesn't affect the request totals
        // TODO: use prefix instead
        localStorage.setItem('pause', '0');
        document.getElementById('btnPause').innerHTML = 'Resume';
    }
}

// on popup load
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("btnClear").addEventListener('click', clearAll);
	document.getElementById("btnLog").addEventListener('click', makeTab);
    document.getElementById("btnPause").addEventListener('click', pauseFlip);
    if (localStorage.getItem('pause'))
        document.getElementById('btnPause').innerHTML = 'Resume';
    else
        document.getElementById('btnPause').innerHTML = 'Pause';
	renderStatus();
});