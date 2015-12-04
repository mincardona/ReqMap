// format localstorage as a csv text field (space separators instead of commas)
// format (one entry per line):
//      objid number_of_connections latitude longitude
document.addEventListener('DOMContentLoaded', function() {
    var bigstr = '';
    var rawlocal;
    var objid = 1;
	for (ip in localStorage) {
        storstr = localStorage[ip].split(' ');
        if (storstr[1].length == 0 || storstr[2].length == 0)
            continue;
        
        storstr[1] = prepare(storstr[1]);
        storstr[2] = prepare(storstr[2]);
        
        bigstr += objid + ' ' + storstr[0] + ' ' + storstr[1] + ' ' + storstr[2] + '\n';
        objid++;
    }
    document.getElementById('stdout').innerHTML = bigstr;
});

// pad number "str" with zeros to 6 decimal places
function prepare(str) {
    var dot = str.indexOf('.');
    if (dot == -1) {
        str += '.';
        dot = str.length-1;
    }
    while (str.length - dot < 7) {
        str += "0";
    }
    return str;
}