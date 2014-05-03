
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
function queryDBmessagesInsert2(tx)
{			  
	tx.executeSql('SELECT data FROM MESSAGES WHERE id = (SELECT MAX(id) FROM MESSAGES)', [], querySuccessMessagesInsert2, errorCB);
}
function queryDBmessagesPut(tx)
{			
	tx.executeSql('SELECT * FROM MESSAGES', [], querySuccessMessagesPut, errorCB);
}
function queryDBlastMessage(tx)
{
//alert("inside2");
	tx.executeSql('SELECT data FROM MESSAGES WHERE id = (SELECT MAX(id) FROM MESSAGES)', [], querySuccessLastMessage, errorCB);
}

function querySuccess(tx, results) 
{
	var len = results.rows.length;
	if ((len==1)&&(results.rows.item(0).data != MAIL))
	{
		tx.executeSql('UPDATE DEMO SET data="'+MAIL+'"WHERE id=1' );
	}
	if (len == 0) {
		//alert("insertant");
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1,"' + MAIL + '")' );
	}

   // for (var i=0; i<len; i++){
        //alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
 //   }
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
			tx.executeSql('INSERT INTO MESSAGES (id, data, date) VALUES (0, "Benvingut a DirectEbre!" , "^_^")' );
			//putMessages();
		}
		//alert("messages initialized");
		//putMessages();
		
}
function querySuccessMessagesInsert(tx, results) // inicialitza la taula MESSAGES
{
		var len = results.rows.length;
		len = len+1;
		tx.executeSql('INSERT INTO MESSAGES (id, data, date) VALUES ('+len+',"' + message + '" , "' + dateMessage +'")' );
		//alert("messages saved");
		putMessages(); // els escriu a app2
}
function querySuccessMessagesInsert2(tx, results) // inicialitza la taula MESSAGES
{
		var mis = results.rows.item(0).data;
	
		//alert("last message: " + mis + " and message: " + message);
		
		if(mis != message){
			insertMessages();
		}
		else{
			putMessages(); // els escriu a app2
		}
}
function showMessage(obj)
{
	alert(obj.innerHTML);
}
function querySuccessMessagesPut(tx, results) // 
{
		var len = results.rows.length;
		//alert("len mes: " + len );
		
		if(len>4){
			for (var i=len-1; i>=len-5; i--){
				$("#thelist").append('<div class="tempo">' +results.rows.item(i).date);
				$("#thelist").append('<li class="temporals" onclick="showMessage(this)">'+results.rows.item(i).data + '</li>');
				$("#thelist").append('</div>');
			}
		}
		else{
			for (var i=len-1; i>=0; i--){
				$("#thelist").append('<div class="tempo">' +results.rows.item(i).date);
				$("#thelist").append('<li class="temporals" onclick="showMessage(this)">'+results.rows.item(i).data + '</li>');
				$("#thelist").append('</div>');
			}
		}
}
function querySuccessLastMessage(tx, results) // 
{
	//alert("inside3");
		var len = results.rows.length;
		//alert("last message: "+ results.rows.item(0).data);
		lastMessageSql = results.rows.item(0).data;
		//alert("lastm() finished" + lastMessageSql);
		checkEarlierMessages();
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
	//tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS MESSAGES (id unique, data, date)');
	//alert("table messages created");
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
	lastMessage();
}
function insertMessages() { // inserta de veritat
	$(".tempo").remove();
	$("li.temporals").remove();
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
	db.transaction(queryDBmessagesInsert, errorCB);
}
function insertMessages2() { // fake que inserta segons si la ultima entrada es igual a la rebuda per notificacio
	$(".tempo").remove();
	$("li.temporals").remove();
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
	db.transaction(queryDBmessagesInsert2, errorCB);
}
function putMessages() {// els escriu a app2
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
	db.transaction(queryDBmessagesPut, errorCB);
}
function lastMessage() {// 
	var db = window.openDatabase("DirectEbreBBDD", "1.0", "DirectEbreBBDD", 2000)
	//alert("LAST MESSAGE");
	db.transaction(queryDBlastMessage, errorCB);
	//alert("LAST MESSAGE2");
	//checkEarlierMessages();
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
	//alert("init messages");
	db.transaction(populateDBmessages, errorCB, successCBmessages);	
}
////////////////////////////////////////////////
