
			function loadXMLDoc()
			{
			var xmlhttp;
			var serverM;
			var serverM2;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }

			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				serverM = xmlhttp.responseText;
				serverM2 = JSON.parse(serverM);
				}
			}
			xmlhttp.open("GET","http://www.directebre.cat/app_lastmessage/",false);
			xmlhttp.send();
				return serverM2;
			}
function checkEarlierMessages()
{
	
	messageServer = loadXMLDoc();
	if (lastMessageSql != messageServer.mess){
		dateMessage = messageServer.dated;
		message = messageServer.mess;
		insertMessages();
	}
	else{
		putMessages();
	}
}

function pushRegister() {
	try 
	{ 
        pushNotification = window.plugins.pushNotification;
		
        pushNotification.register(successHandler, errorHandler, {"senderID":"668871680869","ecb":"onNotificationGCM"});		// required!		
    }
	catch(err) 
	{ 
		txt="There was an error on this page.\n\n"; 
		txt+="Error description: " + err.message + "\n\n"; 
		alert(txt); 
	} 
}
// handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                  //   $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    //var snd = new Media(e.sound);
                    //snd.play();
                }
                
                if (e.badge) {
                   // pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotificationGCM(e) {   	
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						regID = e.regid;
					}
                    break;
                    
                    case 'message':

						message = e.message;
						dateMessage = e.payload.tickerText;

                    	if (e.foreground)
                    	{
						
							insertMessages();
							// if the notification contains a soundname, play it.
							//var my_media = new Media("/android_asset/www/"+e.soundname);
							//my_media.play();
							menu2();
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart){
								messageReceived = 1;
								insertMessages2();
								menu2();
								}
							else{
								insertMessages2();
								menu2();
							}
						}
                    break;
                    
                    case 'error':
					//	$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
					//	$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
               // $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
			
            function successHandler (result) {
               // $("#app-status-ul").append('<li>success:'+ result +'</li>');
			  // alert("suxxes " + result);
				
            }
            
            function errorHandler (error) {
               // $("#app-status-ul").append('<li>error:'+ error +'</li>');
			   alert(" fail " + error);
            }