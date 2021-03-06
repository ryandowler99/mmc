	var degrees = 0;
	var $j_object;
	var wheelValues = []; //vaues user inputted to the wheels fields
	var numSpinTimes = 1; //how many times the wheel spun; how manny inputed values
	var recievedParams //budget items(fields) chosen 
	var curIteration = 0; //keeps track of current number of calls to the 'addWheelValuesToForm' function to simulate iteration
	var numParams = 0;
	var purse = 0; //money_in goes in and spends on each iteration comes out
	var total = 0; //money_in
	var first  = $('.first'); //item (field) on wheel
	var second = $('.second');//item (field) on wheel
	var third  = $('.third'); //item (field) on wheel
	var elemId; // current field - active field
	var weekNumHelperFinished = false;
	var skipWeekField;
	var globalLabel;

		skipWeekField = function(){
			$('.weekNumHelper1').remove();
			$('.weekNumHelper2').remove();
			var date = new Date();
			var weekNum = date.getWeek();
			var selector = "currentField" + (curIteration + 1);
			$('#' + selector).val(weekNum);
			weekNumHelperFinished = true;
			wheelCycle();
			$('#wheelContainer').removeClass("overlay");
			$('#closeWeekHelperBtn').remove();
		}

	// ** get params and output needed fields **
	$(document).ready(function() {    //DO I NEED TO THIS 1/2
		var array = [];
		var elements = $(); //stores the fields
		recievedParams =  $('.recievedParams').text(); //budget items(fields) chosen 
		numParams =  parseInt($('.numParams').text()); //the number of budget items chosen
		$j_object = $(".field"); //list of all page fields
		$j_object.each( function(i) {	 if(i > 1){ $(this).remove(); }}); //remove all but first 2 fields (title, money in) use > 2 to includee week again 

		//----rename allFields later its confussing & hh1(Change)

		//loop through all fileds to find the ones chosen by user
		for (var i = 0; i<$j_object.length; i++ ){
			var allFields = $($j_object[i], "label").text();
			if (recievedParams.toLowerCase().trim().indexOf(allFields.toLowerCase().trim()) >= 0){
				var hhl = $j_object[i];
				$(".fields").append(hhl.outerHTML);
			}
		}

		//sets the focus on the first field ONE time if any keyboard input at all / remove styled cursor
		$( "body" ).one( "keypress", function() {
			$('#currentField1').focus(); 
			$('	.first').find('*').not('#currentField1').remove(); //remove flashing styled cursor
		});
	}); //DO I NEED TO THIS 2/2

	//spin the wheel
	function spinWheel(){ 
		if (curIteration > 1) {
			$('.nextCategoryArrow').removeClass("hidden");
			$('#spinWheel').css("opacity", "0");
			$('#titleImg_category').css("opacity", "0");
			$('#title').css("opacity", "0");
			$('#wheelCycleBtn').css("opacity", "0");
			theTime = 6000;
		}else{
			theTime = 0;
		}
		setTimeout(function() {
			degrees+=120; $('.spinWheel').css('transform', 'rotate(' + degrees + 'deg)'); 
			$('.nextCategoryArrow').addClass("hidden");
			$('#spinWheel').css("opacity", "1");
			$('#titleImg_category').css("opacity", "1");
			$('#title').css("opacity", "1");
			$('#wheelCycleBtn').css("opacity", "1");
		}, theTime);
	}
	
	function wheelCycle(){
	 	elemId = "#currentField" + numSpinTimes;
	 	console.log("->>>>> :" + elemId);
        	var nextElemId = "#currentField" + (numSpinTimes + 1);
        	var value = $(elemId).val();
        	//alert(elemId + " has the value of: " + value );
            
            if (value == null || value == "" || value == " ") {	value = 0;	} //default value = 0
            //alert(value);
            wheelValues.push(value);
            spinWheel(); //spin wheel animation to next item (field)
            focusWheelItem(numSpinTimes); //blur the 2 wheel items not being used
            addWheelValuesToForm(wheelValues); //change title (of which field is now being filled) / add values to form

            //reset ids so only 3 fields are needed
            if (numSpinTimes == 3)  { numSpinTimes = 1; nextElemId = "#currentField" + 1; } //set back to 1 if its 3
            else { numSpinTimes = numSpinTimes + 1; } //increase to use to access the next input field it rotated to
            
            $(elemId).val("");	// reset the field value to blank
            $(nextElemId).focus();	// focus the cursor on the next field spinning around
            return false; // prevent the button click from happening
	 }
	//check if enter is pressed in .spinWheel input then call spinWheel();
	$('.spinWheel').on("keypress", function(e) {
        if (e.keyCode == 13) {
        	/*if (curIteration != 2){
        		wheelCycle();
        	}//is on weeknum (2) and helper has finished
        	else if(weekNumHelperFinished){
        		wheelCycle();
        	}*/
        	$('#wheelCycleBtn').addClass("hidden");
        	wheelCycle();
        }
	});
	$('#wheelCycleBtn').click(function(){ 
		$(this).addClass("hidden");
	 wheelCycle();
	});
var tempCount = 0; //temp store how  many times user input less than 15 on items
	// add the wheel values to the hidden form
	function addWheelValuesToForm(wheelValues){
		var input = $('.fields').find('input')[curIteration]; //get the input field for this call (like iteration, goes through 1by1)
		var theValue = wheelValues[curIteration];
		input.value = theValue; //put val from wheel to its corresponding field eg (title into title field)
		curIteration += 1;	//increase variable to keep track of number of calls this method gets  (to iterate through object)
		var elem = $('#myBar2')[0];
		var label = $('.fields').find('div:nth-child('+(curIteration + 1)+')').text().trim(); //get the label (starts at index 2, holds labels(field names) for wheel spins					becasue first label is present in html and because this function runs after field has been used) ./ 	
		globalLabel = label;
		//if there is no more fields remove wheel
		if(!label){
			$('.spinWheel').hide();
			$('#myProgress').hide();
			$('#submitBudgetBtn').removeClass("hidden");
			$("#wheelCycleBtn").addClass("hidden");
			$('body').css('background-color', 'rgba(123, 105, 235, 0.40)');
		}

		$('#title').text(label); //change the title above wheel 


		//change to switch statement
		if(curIteration == 2){
			purse = theValue;
			total = theValue;

			let message = "You have €" + purse
			$('#myBar').text(message);
			$('#circledivText').text("Out of €" + purse);
			$('#myProgress').css("visibility", "visible");
			responsiveVoice.speak(message + " left to spend", "UK English Male");
			$('#categoriesDock').removeClass("hidden");

			//add icon beside title
			var theSrc = $("#currentCat").attr('src'); //the desired image			
			$('#titleImg_category').attr('src', theSrc);

			//profile attr - if true will skip the field all together
			/*var isFalse = (skipTheWeekField === 'false');
			if(isFalse){
				$('#pageIntroduceBtn').css("display", "none");
				$('#wheelContainer').addClass("overlay");
				$( "#currentField3" ).blur();
				//add a button to exit the week helper when the user clicks outside of the helper
				$( "#wheelContainer" ).click(function(){
					//find and remove old button before append it again
					$("#closeWeekHelperBtn").remove();
				    var $div = $("<div>", {id: "closeWeekHelperBtn"});
				    $div.text("DONE");
				    $div.click(function(){  
				        $( ".weekNumHelper" ).css("display", "none");
				        $( "#wheelContainer" ).removeClass("overlay");
						
						setTimeout(function() {
							$("#closeWeekHelperBtn").css("display", "none");//hide button
							$("#wheelContainer").unbind( "click" );
							$(".weekNumHelper").remove();
							showGenieQuickButtons();
						}, 500);
					});
				    $("#wheelContainer").append($div);
				});
			
				setTimeout(function(){
					let theElem = $('.weekNumHelper1');
					theElem.css("display", "block");
					let messageToSpeak = theElem.text().trim();
					setTimeout(function(){
						theElem.addClass("scale_1point4");
						highlightElem('.weekNumHelper1', messageToSpeak);
					}, 1500);
					//highlightElem('.weekNumHelper', messageToSpeak);
				}, 1500);
				
				// add in the "or if you want to fill it out click this button "
				setTimeout(function(){
					let theElem = $('.weekNumHelper2');
					theElem.css("display", "block");
					let messageToSpeak = theElem.find("p").text().trim();
					highlightElem('.weekNumHelper2', messageToSpeak);
				}, 9000);
			}else{
				$("#title").fadeOut(500);
				setTimeout(function() {
					skipWeekField();
					$("#title").fadeIn(1000);	
				}, 500);
				
			}
			*/
		}//start retrieving values after 'week' 
		else if(curIteration == 2){

		}
	
		else if(curIteration > 2){
			purse = purse - theValue;
			let message2 = "You have €" + purse;
			$('#myBar').text(message2 + " remaining");
			responsiveVoice.speak(message2 + " left to spend now", "UK English Male");
			$('#circledivText').text("Out of €" + total);
			var percentageOfPurseSpent = Math.floor(( (total - purse) / total) * 100);

			//when the bar is big enough tp hold the text clearly then remove #myBar
			if (percentageOfPurseSpent > 40){
				$("#myBar").animate({ left: '-500px' }, 'slow');
				$('#myBar').remove();
				$('#myBar2').text("You have €" + purse + " remaining");
			}
			elem.style.width = (percentageOfPurseSpent - 7) + '%';
		}
		//sloppy dont look below - hacky category order is messed up fix later]
		if(curIteration > 2){
			//alert("now" + globalLabel);
			//$('#title').text("---"+categoryArray[(curIteration)]); //change the title above wheel 
			let theClassName = globalLabel + "_categoryImg";
			$('.' + theClassName).animate({
				top: "-=200"
			}, 5000, function() {
				// Animation complete.
				var theSrc = $("." +theClassName).attr('src'); //the desired image

				$("." +theClassName).remove();
				$('#currentCat').attr('src', theSrc);
				$('#titleImg_category').attr('src', theSrc);
			});
			
		}
		if(curIteration > 3){
			/*let theClassName = categoryArray[(curIteration + 1)] + "_categoryImg";
			alert("2yo ar: " + categoryArray);
			alert("2yo think its: " + theClassName);
			alert("cur counrr " + curIteration);*/
		}
	}

//add code to  (change)
//check if any letters are being pressed or any keyboard input to then autofocus field

$('#currentField1').click(function(){
	$('.first').find('*').not('#currentField1').remove(); //remove flashing styled cursor
});

//blurs the 2 wheel items (fields) that are not about to be used when animation spins it

function focusWheelItem(itemToFocus){
   	switch (itemToFocus) {
   		//spin from item 1 to item 3 (clockwise)
	    case 1:
	    	first.addClass( "blurWheelItem" );
	    	second.addClass( "blurWheelItem" );
	    	third.removeClass( "blurWheelItem" );
	        break;
	    //spin from item 3 to item 2 (clockwise)
	    case 2:
	    	third.addClass( "blurWheelItem" );
	    	second.removeClass( "blurWheelItem" );
	        break;
	    //spin from item 2 to item 1 (clockwise)
	    case 3:
	    	second.addClass( "blurWheelItem" );
	        first.removeClass( "blurWheelItem" );
	        break;
	}
}

$( ".weekNumHelper2" ).click(function() {
	$(this).unbind( "click" );
	$(this).finish();
	$('.weekNumHelper1').toggle( "slide" );
	$('.weekNumHelper2').animate({
	    left: "-=300",
		top: "-=280",
		height: "+=150"
	  }, 2000, function() {
	    // Animation 1 complete.
	    $('.weekNumHelper2').animate({
	    	left: "-=250",
			width: "+=500"
		  }, 2000, function() {
		  	// Animation 2 complete.
		  	$('.weekNumHelper2 p').css("opacity", 0);
		    $('#weekHelperBtns').css("display", "block");
		  });
	  });
});

//what is this question
$( "#weekHelperBtn1" ).click(function() {
	$("#weekHelperBtn1").css("pointer-events", "none"); //nice way to remove click event
	$("#closeHelperBtnLeft").css("display", "none");
	$("#closeHelperBtn").css("display", "block");
	$("#weekHelperBtn3").fadeOut(2000);
	$('#weekHelperBtn1').animate({
		left: "-=10",
		top: "-=80"
		}, 2000, function() {
		$('#weekHelperBtn1').addClass("weekHelperBtnAfter");
		typeWriterTxt = "This question wants to know when will this budget be used? is it for christmas? or a summer holiday?";
		typeWriter();
	});
});

//what is a week number
$( "#weekHelperBtn3" ).click(function() {
	$("#weekHelperBtn3").css("pointer-events", "none"); //nice way to remove click event
	$("#closeHelperBtn").css("display", "none");
	$("#closeHelperBtnLeft").css("display", "block");
	$("#weekHelperBtn1").fadeOut(2000);
	$('#weekHelperBtn3').animate({
		right: "-=10",
		top: "-=80"
		}, 2000, function() {
		$('#weekHelperBtn3').addClass("weekHelperBtnAfter");
		$('#weekHelperBtn3').css("margin-left", "30%");
		typeWriterTxt = "A week number is a blah blah blah";
		typeWriter();
	});
});

// x - close button 1
$( "#closeHelperBtn" ).click(function() {
	$("#weekHelperBtn1").css("pointer-events", "all"); //nice way to re-add click event
	//animate button back into its position
	showHelperBtn1Again();
	$('#typingText').text(""); //reset the typing text
	setTimeout(function() { $(this).hide()}, 500);
	$( "#closeHelperBtn" ).css("display", "none")
});

// x - close button 2
$( "#closeHelperBtnLeft" ).click(function() {
	$("#weekHelperBtn3").css("pointer-events", "all"); //nice way to re-add click event
	$('#weekHelperBtn3').css("margin-left", "0");
	//animate button back into its position
	showHelperBtn3Again();
	$('#typingText').text(""); //reset the typing text
	 $( "#closeHelperBtnLeft" ).css("display", "none")
});


function showHelperBtn1Again(){
	//animate button back into its position
	$('#weekHelperBtn1').animate({
		left: "+=10",
		top: "+=80"
		}, 2000, function() {
		$('#weekHelperBtn1').removeClass("weekHelperBtnAfter");
		$("#weekHelperBtn3").fadeIn(2000);
	});
}

function showHelperBtn3Again(){
	//animate button back into its position
	$('#weekHelperBtn3').animate({
		right: "+=10",
		top: "+=80"
		}, 2000, function() {
		$('#weekHelperBtn3').removeClass("weekHelperBtnAfter");
		$("#weekHelperBtn1").fadeIn(2000);
	});
}
//this func is very very very messy - change
function showGenieQuickButtons(){
	//speak - introduce the elem
	responsiveVoice.speak("Here are some quick buttons, you can use them to help with this question", "UK English Male");
	//slowly show it
	setTimeout(function() {
		$("#genieQuickButtons").fadeIn(3000);//show quick buttons
	}, 2000);

	//highlight elem
		var timer = 1500;
		$( ".ttsOnHover" ).mouseover(function() {
			let theText = $(this).text();
			console.log(theText);
			//if needed so the above voice doesnt get interupted
			if(true){
				//speak - each elem
				responsiveVoice.speak(theText, "UK English Male");
			}
		});
		$( ".ttsOnHover" ).mouseleave(function() {
			responsiveVoice.cancel(); // stop anything currently being spoken
		});
	//move assistant to the helper buttons
	setTimeout(function() {
		var elmToFlyToPos = $('#genieQuickButtons').offset(); 
		console.log("thissssssss :" + elmToFlyToPos['top']);
		assistant.moveTo(elmToFlyToPos['left'],(elmToFlyToPos['top'] - 100));
	}, 2500);
}

$( ".weekNumHelper1" ).click(function() {
	skipWeekField();
});


//first time typing the rotate wheel button will appear
$('#currentField1, #currentField2, #currentField3').keypress(function() {
    //$(this).removeClass("hidden");
    setTimeout(function() {
    	$("#wheelCycleBtn").removeClass("hidden");
    }, 1000);
});




