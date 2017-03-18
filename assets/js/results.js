//when the user clicks an event 
$('.event-list').click(function() {
	//slide record into view
	$('.record-player').addClass('record-player-active');
	//slide event-list to the left
	$('.event-list').removeClass('push-3');

});

//when user clicks heart
$('#heart').click(function() {
	//slide list drawer into view for 30 seconds
	$('.my-list-drawer').toggleClass('my-list-drawer-active');
	
});


//add event to drawer-list 

//add event to list page