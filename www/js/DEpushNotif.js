
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
						//document.addEventListener("e.message", borrem(), true);
						//document.addEventListener("e", borrem(), true);
						message = e.message;
						dateMessage = e.payload.tickerText;
						//alert(dateMessage);

						//alert("rebut : "+message);
						//insertMessages();
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
						
							insertMessages();
							// if the notification contains a soundname, play it.
							//var my_media = new Media("/android_asset/www/"+e.soundname);
							//my_media.play();
							menu2();
							//alert(e.message);
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							//document.addEventListener("e", borrem(e.message), true);
							//document.addEventListener("e.event", borrem("hola"), true);
							if (e.coldstart){
								messageReceived = 1;
								insertMessages();
								menu2();
								//alert( e.message);
								}
							else{
								messageReceived = 1;
								insertMessages();
								menu2();
								//alert(e.message);
							}
						}
							
					//	$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
					//	$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
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
			  //messageReceived = 0;
				
            }
            
            function errorHandler (error) {
               // $("#app-status-ul").append('<li>error:'+ error +'</li>');
			   alert(" fail " + error);
            }