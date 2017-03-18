
//the variable necessary to launch our page from index.html
var text = window.location.hash.substring(1)

// function initialSearch(){

//   window.location.src ="../results.html";

// }
// initialSearch(clickSanDiegoMetro());

// $("#sd-m").on("click",function(){
//  initialSearch(clickSanDiegoMetro());
// })
//this makes our returned data show up in a global array
var gData = [];


  var oArgs = {
      app_key: "2CH4skmC8kN48Lr4",
      q: "music",
      where: "San Diego", 
      //postal_code:"92101",
      within: 15,
      units: "miles",
      page_size: 10,
      sort_order: "popularity"
   };

  $(".selection-location").on("click", function(e){
    e.preventDefault();
    $("#event-list").empty();
    var attrData = $(this).data();
    selectMetroByZipcode(attrData.attribute);
});


//setting my arguments to return data
function selectMetroByZipcode(zipcode){
   
   oArgs.where = zipcode;
   console.log(oArgs);
   //window.location.src ="../results.html";


     //api call plus  console checking of info
    EVDB.API.call("/events/search", oArgs, function(oData) {
    var app = oData;
    console.log(app)
    console.log(app.events.event[0].city_name);
    console.log(app.events.event[0].venue_name);
    console.log(app.events.event[0].postal_code);
    console.log(app.total_items); 
    

    //iterate through the search results an return the results as objects into a global array
    for (var i = 0; i < app.events.event.length; i++) {

      if (app.events.event[i].image) {

        

        gData.push({
          city: app.events.event[i].city_name,
          venue: app.events.event[i].venue_name,
          title: app.events.event[i].title,
          // artist: app.events.event[i].performers.performer.name,//this goes to itunes
          when: app.events.event[i].start_time,
          url: app.events.event[i].url,
          imageStr: app.events.event[i].image.medium.url
        })
      

      console.log(gData[i]);

     
    
    //moment.js date/time display conversion 
      var returnedDate = gData[i].when;
      console.log(returnedDate);

      var displayDay = moment(returnedDate).format("dddd");
      var displayMonth = moment(returnedDate).format("MMMM Do, YYYY");
      var displayTime = moment(returnedDate).format("LT");
      console.log();



  // Dynamic results return div
           //create an event return div and assign it a class to reference
          var eventResult= $("<div>");
          eventResult.addClass("event-list-item");
          eventResult.addClass("col-6");

          //make a div to put inside eventResult to store the event date return 
          var eventResultDay = $("<div>");
          eventResultDay.attr("class","info-event");

           var eventResultMonth = $("<div>");
          eventResultMonth.attr("class","info-event");

           var eventResultTime = $("<div>");
          eventResultTime.attr("class","info-event");

          //make a div to put inside eventResult to store the event text/info return
          var eventInfo = $("<div>");
          eventInfo.attr("class","info-event");


          //create variables for the desired display info
          var eventDay = $("<p class='local-event info-event event-date event-day'>").text(displayDay);
          var eventMonth = $("<p class='local-event info-event event-date event-month'>").text(displayMonth);
          var eventTime = $("<p class='local-event info-event event-date event-time'>").text(displayTime);
          var eventTitle = $("<p class='local-event info-event uppercase event-title'>").text(gData[i].title); 
          var eventVenue = $("<p class='local-event info-event event-venue'>").text(gData[i].venue); 
          
          // Make an image div for the returned image and 
          var eventImage = $("<img class='artist-pic rounded-circle'>"); 

          // Set the image's src and id //note, need this for itunes call
          eventImage.attr("src",gData[i].imageStr);
          eventImage.attr("id",gData[i].artist ? gData[i].artist : gData[i].title);
          eventImage.attr("class","artist-pic");
          //eventImage.attr("onclick","showRecordPlayer()"); both methods work, cool
          
          // Append the p variable to the eventInfo variable.
          eventDay.appendTo(eventResultDay);
          eventMonth.appendTo(eventResultMonth);
          eventTime.appendTo(eventResultTime);
          eventTitle.appendTo(eventInfo);
          eventVenue.appendTo(eventInfo);

          // Append both the info and the image variables to the eventResult variable.
          eventDay.appendTo(eventResult);
          eventMonth.appendTo(eventResult);
          eventTime.appendTo(eventResult);
          eventImage.appendTo(eventResult);
          eventInfo.appendTo(eventResult);

        //send it to the HTML div

         $("#event-list").prepend(eventResult);
     
      } 
    }
        var activeElm;
      $(".event-list").on("click",".artist-pic", function(event){
          event.preventDefault();
          //showRecordPlayer();
          activeElm = $(this).parent();
          console.log(activeElm);

          var eventDay = $(this).parent().find(".event-day").text();
          var eventMonth = $(this).parent().find(".event-month").text();
          var eventTime = $(this).parent().find(".event-time").text();
          var eventDates = eventDay + ' ' + eventMonth + ' ' + eventTime;
          var eventTitles = $(this).parent().find(".event-title").text();
          var eventVenues = $(this).parent().find(".event-venue").text();
          console.log($(this).find(".event-date").text());


      //this isnt working bc the image is just a URL, not accesing the api, im only getting 1st btn info; maybe import the itunes info here
            $(".detail-date").text(eventDates);
            $(".detail-title").text(eventTitles);
            $(".detail-venue").text(eventVenues);
            //$(".event-url").append(gData[i].url);
        //$(".detail-genre").append(gData[i].genre)
    
  });


    //show my-list when user clicks heart
    $("#heart").on("click",function(h){
            // prevent page navigation
            h.preventDefault();
            
            // create data wrapper
            var likedList = $("<div>");
            likedList.attr("class","info-event");

            // get event data and put on elements
            var eventDay = activeElm.find(".event-day").text();
            var eventMonth = activeElm.find(".event-month").text();
            var eventTime = activeElm.find(".event-time").text();
            
            var eventDateText = eventDay + ' ' + eventMonth + ' ' + eventTime;
            var eventTitleText = activeElm.find(".event-title").text();
            // var eventDateText = activeElm.find(".event-date").text();
            var eventVenueText = activeElm.find(".event-venue").text();
            var eventImageSrc = activeElm.find(".artist-pic").attr("src");

            var title = $("<h4>");
            var date = $("<h5>");
            var venue = $("<h5>");
            var eventImg = $("<img class='artist-pic rounded-circle'>"); 

            title.text(eventTitleText);
            date.text(eventDateText);
            venue.text(eventVenueText);            
            eventImg.attr("src", eventImageSrc);

            // add event data to wrapper
            likedList.append(eventImg);
            likedList.append(date);
            likedList.append(title);
            likedList.append(venue);
            
            // mount event data-collection to dom
            $(".liked").prepend(likedList);

            // close drawer after 1 second
            setTimeout(function(){
              $('.my-list-drawer').removeClass('my-list-drawer-active');
            },1000)

            //store event data
            var currentEvent = {
              day: eventDay,
              month: eventMonth,
              time: eventTime,
              date: eventDateText,
              title:eventTitleText,
              venue:eventVenueText,
              image:eventImageSrc,
            }


            // get eventDataCollection object from localStorage
            var allEventDataString = localStorage.getItem('eventDataCollection') || '{}';
            var allEventData = JSON.parse(allEventDataString);
            // // if there was no eventDataCollection object
            // if (!allEventData) {
            //   // assign eventDataCollection to empty object
            //   allEventData = {};
            // }
            console.log(allEventData);
            // create a unique key for current event 
            var uniqueName = currentEvent.date + currentEvent.title;
            // add new object to existing event data

            // adding the event data to the existing event data collection 
            allEventData[uniqueName] = currentEvent;


            console.log(allEventData);
            var allEventDataJson = JSON.stringify(allEventData);


            localStorage.setItem('eventDataCollection', allEventDataJson);

    });
    
  });
}



//





//ITUNES API CALLING
  //  $.getJSON(
  //     'https://itunes.apple.com/search?term=the+cure&limit=25&callback=?', 
  //     function iTunesCall( data ) {
  //       myData = data;
  //        console.log(data)
  //        console.log(myData.results[0].previewUrl);
       
  // var fSound = myData.results[0].previewUrl;
  //        var sound = new Audio(fSound);
  // sound.play();
  //    });
  //   });


