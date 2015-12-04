var latlong = ' ';

// called after a request finishes
// use this to log the request
chrome.webRequest.onCompleted.addListener(
	// function to run on completed requests that match the filter
    function (details) {
        // if pause is defined, then we are not collecting data
        if (localStorage.getItem('pause'))
            return;
        var ip = details.ip;
        if (ip == undefined)
            return;
        // if the item is not in local storage, add it with count 1
        if (!localStorage.getItem(ip)) {
            ip2json(ip, setLatLong);
            localStorage[ip] = "1 " + latlong;
        } else {
            var storstr = localStorage[ip].split(' ');
            // increment the request count for this ip
            localStorage[ip] = (parseInt(storstr[0]) + 1) + ' ' + storstr[1] + ' ' + storstr[2];
        }
        // update the visible popup counter
        // only one popup for this extension, so use index 0
        chrome.extension.getViews({type:'popup'})[0].renderStatus();
    },
	// filters that restrict when the callback is triggered
    {
		// trigger on any url that is http or https
		urls: ['*://*/*', 'ftp://*/*']	// add 'ftp://*/*' to the array to catch ftp requests too
	}
);

// provide ip string and callback function taking one arg
function ip2json(ip, callback) {
    // use easily-parseable json format
	httpGetAsync('https://freegeoip.net/json/' + ip, callback);
}

// https://stackoverflow.com/questions/247483/http-get-request-in-javascript/4033310#4033310
// puts response text in callback param
function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open('GET', url, true); // use "true" for asynchronous method call
    xmlHttp.send(null);
}

function setLatLong(responseJSON) {
    var dat = JSON.parse(responseJSON);
	latlong = dat.latitude + ' ' + dat.longitude;
}