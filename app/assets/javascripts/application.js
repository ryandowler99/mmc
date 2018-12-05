// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// require jquery
//= require chartkick
//= require turbolinks
//= require on_the_spot
// require_tree .

//add clases to elems, to be used for inline onClicks to reduce duplication
function addClassToElm(theId, theClass){
	console.log("theId is: " + theId + "theClass is: " + theClass);
	document.getElementById(theId).classList.add(theClass);
}

// Returns the ISO week of the date. (call like this dateyObj.getWeek())
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

//typing text onscreen animation with voice over for the text as it types
var typeWriter; //function
var typeWriterCount = 0;
var typeWriterTxt = "dont forget to override this";
var speed = 50;
var itsDoneNow = false;
typeWriter = function () {
	if(typeWriterCount < 1){ 
		document.getElementById("typingText").innerHTML ="";
		responsiveVoice.speak(typeWriterTxt);
	}
  	if (typeWriterCount < typeWriterTxt.length) {
	    document.getElementById("typingText").innerHTML += typeWriterTxt.charAt(typeWriterCount);
	    typeWriterCount++;
	    setTimeout(typeWriter, speed);
	}else if (typeWriterCount == typeWriterTxt.length) {
		itsDoneNow = true;
	}
	else{ typeWriterCount = 0; itsDoneNow = false; }
}
/* USAGE -> typeWriterTxt = "blah";
		 -> typeWriter(); //dont pass as param
*/
var autoTTsMessagesSpoken = [];
var counter = 0;
$(function() {
	$(".ttsOnHover").on('click mouseover', function(){//alert("llk");});
		//auto TTS
		var timer = 1500;

		//$( ".ttsOnHover" ).mouseover(function() {
			let theText = $(this).text();
			autoTTsMessagesSpoken[counter] = theText;

			if(counter == 1){
				counter = 0;
			}else{ counter++; }
			var auttoTTSMessage1 = autoTTsMessagesSpoken[0];
			var auttoTTSMessage2 = autoTTsMessagesSpoken[1];
			// console.log(theText + " - " + counter);
			// console.log(theText);
			console.log("auttoTTSMessage1 :" + auttoTTSMessage1);
			console.log("auttoTTSMessage2 :" + auttoTTSMessage2);
			//if needed so the above voice doesnt get interupted
			if(true){
				//speak - each elem
				setTimeout(function() {
					//dont say the same thing twice
					if(auttoTTSMessage1 !== auttoTTSMessage2){
						responsiveVoice.speak(theText, "UK English Male");
					}
				}, 500);
				//reset after 2 seconds incase they actually do want to autotts the same thing again
				setTimeout(function() {
					autoTTsMessagesSpoken = [];
				}, 2000);
				
			}
		//});
		
	});
	$( ".ttsOnHover" ).mouseleave(function() {
			responsiveVoice.cancel(); // stop anything currently being spoken
		});

	function checkIfMouseAwayFromAutottsElm() {
	   alert('this ');
	}
	//setInterval(checkIfMouseAwayFromAutottsElm, 2000);
});


// $(function() {
// //auto TTS
// 	var timer = 1500;
// 	$( ".ttsOnHover" ).mouseover(function() {
// 		let theText = $(this).text();
// 		console.log(theText);
// 		//if needed so the above voice doesnt get interupted
// 		if(true){
// 			//speak - each elem
// 			responsiveVoice.speak(theText, "UK English Male");
// 		}
// 	});
// 	$( ".ttsOnHover" ).mouseleave(function() {
// 		responsiveVoice.cancel(); // stop anything currently being spoken
// 	});
// });
