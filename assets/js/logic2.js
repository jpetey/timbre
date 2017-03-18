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
          var eventDay = $("<p class='local-event info-event event-date'>").text(displayDay);
          var eventMonth = $("<p class='local-event info-event event-date'>").text(displayMonth);
          var eventTime = $("<p class='local-event info-event event-date'>").text(displayTime);
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

          var eventTitles = $(this).parent().find(".event-title").text();
          var eventDates = $(this).parent().find(".event-date").text();
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
            h.preventDefault();
            
            var likedList = $("<div>");
            likedList.attr("class","info-event");

            var eventTitleText = activeElm.find(".event-title").text();
            var eventDateText = activeElm.find(".event-date").text();
            var eventVenueText = activeElm.find(".event-venue").text();

            var title = $("<h4>");
            title.text(eventTitleText);
            var date = $("<h5>");
            date.text(eventDateText);
            var venue = $("<h5>");
            venue.text(eventVenueText);

   
            console.log($(this).parent().find(".event-date").text()); 
            

            var eventImg = $("<img class='artist-pic rounded-circle'>"); 
            eventImg.attr("src", activeElm.find(".artist-pic").attr("src"));


            likedList.append(eventImg);
            likedList.append(date);
            likedList.append(title);
            likedList.append(venue);
            
            console.log(eventImage.attr("src"));

          $(".liked").prepend(likedList);

            //$(".fist").attr("src", eventImage.attr("src"));
            setTimeout(function(){
              $('.my-list-drawer').removeClass('my-list-drawer-active');
            },5000)
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

  
    

    // //first try html grabs>>>> this was only returning 1 object
    // $("#city_search").html("<br>Event Location : " + gData[i].city + "<br>" );
    
    // $("#data-date").html(displayDate);
    // $("#data-eventName").html(gData[i].title);
    // $("#data-venue").html(gData[i].venue);
    // //$("#test4").html("<br>" + eventListing.url + "<br>" );

    // $("#dImg").attr("src",gData[i].imageStr);
    // //$("#data-image").append("<img src='" + gData[i].imageStr + "' width='180' height='180'>");
    
    // console.log(gData[i].imageStr);
  
 
//show record-player when user clicks event
    //   function showRecordPlayer() {
    //       document.getElementById("record-player").style.display = "block";
    //   }
    //   //show my-list when user clicks heart
    //   function showMyList() {
    //       document.getElementById("my-list-drawer").style.display = "block";
    //       }
    // $("#record-player").on("click", function(){
    //   $(".info-list").clear();

    // });








