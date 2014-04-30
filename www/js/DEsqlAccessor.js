
function queryDB(tx)
{			
	tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}
function queryDBcheck(tx)
{			
	tx.executeSql('SELECT * FROM DEMO', [], querySuccessCheck, errorCB);
}
function queryDBmessages(tx)
{			
	tx.executeSql('SELECT * FROM MESSAGES', [], querySuccessMessages, errorCB);
}
function queryDBmessagesInsert(tx)
{			
	tx.executeSql('SELECT * FROM MESSAGES', [], querySuccessMessagesInsert, errorCB);
}
function queryDBmessagesPut(tx)
{			
	tx.executeSql('SELECT * FROM MESSAGES', [], querySuccessMessagesPut, errorCB);
}

function querySuccess(tx, results) 
{
	var len = results.rows.length;
	//alert(len);
	if ((len==1)&&(results.rows.item(0).data != MAIL))
	{
		tx.executeSql('UPDATE DEMO SET data="'+MAIL+'"WHERE id=1' );
	}
	if (len == 0) {
		//alert("insertant");
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1,"' + MAIL + '")' );
	}

    for (var i=0; i<len; i++){
        //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
    }
}
		
function querySuccessCheck(tx, results) //posa el mail al principi si es que n'hi ha
{
	var len = results.rows.length;
	if (len==1)
	{
		$(":text").val(results.rows.item(0).data);
	}
}
function querySuccessMessages(tx, results) // inicialitza la taula MESSAGES
{
		var len = results.rows.length;
		if(len==0){
			tx.executeSql('INSERT INTO MESSAGES (id, data) VALUES (0, "Benvingut a DirectEbre!")' );
		}
		//alert("messages initialized");
		putMessages();
}
function querySuccessMessagesInsert(tx, results) // inicialitza la taula MESSAGES
{
		var len = results.rows.length;
		len = len+1;
		tx.executeSql('INSERT INTO MESSAGES (id, data) VALUES ('+len+',"' + message + '")' );
		//alert("messages saved");
		putMessages();
}
function querySuccessMessagesPut(tx, results) // inicialitza la taula MESSAGES
{
		var len = results.rows.length;
		//alert("len mes: " + len );
		
		if(len>4){
			for (var i=len-1; i>=len-5; i--){
				$("#thelist").append('<li class="temporals">' + results.rows.item(i).data + '</li>');
			}
		}
		else{
			for (var i=len-1; i>=0; i--){
				$("#thelist").append('<li class="temporals">' + results.rows.item(i).data + '</li>');
			}
		}
}
		
function populateDB(tx)
{
        //tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
       // tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}
function populateDBmessages(tx)
{
    tx.executeSql('CREATE TABLE IF NOT EXISTS MESSAGES (id unique, data)');
}
				
function errorCB(tx, err)
{
    alert("Error processing SQL: "+err);
}
				
function successCB() {
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
   // alert("success1!" );
	db.transaction(queryDB, errorCB);
}
function successCBcheck() {
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
    //alert("success2!" );
	db.transaction(queryDBcheck, errorCB);
}
function successCBmessages() {
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
    //alert("success3!" );
	db.transaction(queryDBmessages, errorCB);
}
function insertMessages() {
	$(".temporals").remove();
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
	db.transaction(queryDBmessagesInsert, errorCB);
}
function putMessages() {
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
	db.transaction(queryDBmessagesPut, errorCB);
}

/////
function checkMail()
{
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000);
	db.transaction(populateDB, errorCB, successCBcheck);	
}
function insertMail()
{
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000);
	db.transaction(populateDB, errorCB, successCB);	
}
function initMessages()
{
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000);
	db.transaction(populateDBmessages, errorCB, successCBmessages);	
}
////////////////////////////////////////////////
