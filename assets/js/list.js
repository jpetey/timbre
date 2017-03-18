//get information from localStorage 
  var likedEventJson = localStorage.getItem('eventDataCollection');
  var likedEvents = JSON.parse(likedEventJson);
  console.log(likedEvents)



    //iterate through the search results an return the results as objects into a global array
    var needAlt = false;
    for (var key in likedEvents) {
      var day = likedEvents[key].day;
      var month = likedEvents[key].date;
      var time = likedEvents[key].time;
      var date = likedEvents[key].date;
      var title = likedEvents[key].title;
      var venue = likedEvents[key].venue;
      var imageUrl = likedEvents[key].image;

      var displayDay = day.substr(0,3);
      var displayMonth = month.substr(0,3);
      var displayTime = time;
      console.log(displayTime, displayMonth, displayDay)
// Dynamic results return div
        var eventBlock = $('<div>');
        eventBlock.addClass('eventBlock new');
        
        if (needAlt) {
          needAlt = false;
          eventBlock.addClass('alt');
        } else {
          needAlt = true;
        }

        //create an event return div and assign it a class to reference
        var eventDate= $("<div>");
        eventDate.addClass("eventDate");

        var eventLeft = $('<div class="eventDate-left">');
        var eventRight = $('<div class="eventDate-right">');

        //make a div to put inside eventResult to store the event date return 
        var eventDateMonth = $("<div>");
        eventDateMonth.attr("class","eventDate-month");

        var eventDateWeekday = $("<div>");
        eventDateWeekday.attr("class","eventDate-weekday");

        //  var eventDateDay = $("<div>");
        // eventDateDay.attr("class","eventDate-day");

        var eventDateTime = $("<div>");
        eventDateTime.attr("class","eventTime");


        //make a div to store the event title and venue return
        var eventContent = $("<div id='info'>");
        eventContent.attr("class","eventContent");

         //make a div to store the image return
        var eventPicture = $("<div>");
        eventPicture.attr("class","eventPhoto");

        var clearFix = $('<div style="clear: both;">')

        //set text on dates
        eventDateMonth.text(displayMonth);
        eventDateWeekday.text(displayDay);  
        eventDateTime.text(displayTime);
        


        var eventTitle = $("<div class='eventHeadliner' itemprop='name'>").text(title); 
        var eventVenue = $("<div class='eventSupport1'>").text(venue); 
        
        // Make an image div for the returned image and 
        var eventImage = $("<img class='artist-pic rounded-circle' id='image'>"); 

        // Set the image's src and id //note, need this for itunes call
        console.log(eventImage, imageUrl)
        eventImage.attr("src", imageUrl);
        
        // Append the p variable to the eventInfo variable.
        eventTitle.appendTo(eventContent);
        eventVenue.appendTo(eventContent);

        // Append both the info and the image variables to the eventResult variable.
        eventLeft.appendTo(eventDate)
        eventDateMonth.appendTo(eventDate);
        eventDateWeekday.appendTo(eventDate);
        eventDateTime.appendTo(eventDate);
        eventImage.appendTo(eventPicture);
        eventRight.appendTo(eventDate)
        // eventInfo.appendTo(eventResult);

        //send it to the HTML div

        eventDate.appendTo(eventBlock);
        eventPicture.appendTo(eventBlock);
        eventContent.appendTo(eventBlock);
        clearFix.appendTo(eventBlock);

       $("#main-list").prepend(eventBlock);

    //   $(".artist-pic").on("click", function(){
    //     event.preventDefault();
    //     // showRecordPlayer();

    // //this isnt working bc the image is just a URL, not accesing the api, im only getting 1st btn info; maybe import the itunes info here
    //       $(".detail-date").append(eventDate);
    //       $(".detail-title").append(eventTitle);
    //       $(".detail-venue").append(eventVenue);
    //       $(".event-url").append(likedEvents[key].url);
    //   // //$(".detail-genre").append(likedEvents[key].genre)
    //   });
  }