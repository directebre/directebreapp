

function checkConnection(flag) {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	if( flag == 0 ){
		if((states[networkState] ==  states[Connection.NONE])
			|| (states[networkState] ==  states[Connection.UNKNOWN])){
			alert('Aquesta aplicació requereix l\'ús d\'internet,\nsisplau, torna-ho a intentar més tard');
			return false;
		}
		return true;
	}
	else{
		if((states[networkState] ==  states[Connection.NONE])
			|| (states[networkState] ==  states[Connection.UNKNOWN])){
			return false;
		}
		return true;
	}
}