  // $(".on_the_spot_editing").focus(function(){
  //   //$(".on_the_spot_editing span").css("color", "red");
  //     alert("ddddddd")
  // })

//next look mat cloning the div and hiding real oine in  polace to keep structure and check if clone submits properly
//then so auto referedh or ajax after submit  
function fieldChanged(){}

  function moveCardUp(categoryName){
    let cat = categoryName;
    let selector = "." + cat + '_card';
    //check if an elem is already active first
    var aCardIsActive = $('.activeCard').length; //1 for true 0 for false
    if(aCardIsActive != 0){
      $('.activeCard').css("top", "150%"); //set pos back for next animation
      $('.activeCard').removeClass("activeCard");//remove absolute pos so returns to normal
    }
    console.log(aCardIsActive + " ----");

    $(selector).addClass("activeCard"); 
    setTimeout(function() {
      $(selector).animate({
        top: "-=120%"
      }, 5000, function() {
        // Animation complete.
        //do a check so stars dont show without the div (multiple taps at a time)
        if($('.activeCard').length > 0){
          $(".animatedStars").removeClass("hidden");
          setTimeout(function() {
            $(".animatedStars").css("transform", "scale(1.2)");
            $(".animatedStars").css({'transform': 'rotate(50deg)'});
          setTimeout(function() {
            $(".animatedStars").addClass("hidden");
          }, 500);
        }, 500);
        }else{alert('hnkoo0o ' + aCardIsActive);}
      });
    }, 500); 
  }
//   $('span').change(function(e) {
//     alert("dda");
//     $(this).closest( "blockquote" ).removeClass( "itsBlank" );
// });

$(function() {
  //autofocus on edit cards (edit category div)
  $(".on_the_spot_editing").on("click", function () {
    $(".on_the_spot_editing form").eq(0).find("input").select();
    $(".on_the_spot_editing").addClass("override_hover");
    granparentElm = $(this).parent().parent();
    parentElm = granparentElm.children()[0];
    //check if div is already there before appending
    if (granparentElm.find('.quotation-mark').find('#categoryEditBubble').length == 0) {
    // code to run if it isn't there
      let theCategory = parentElm.innerText;
      $(parentElm).append( $('#categoryEditBubble') );
      $('#categoryEditBubble cat').text(theCategory);
      let message = "Type a new number now for: " + theCategory;
      $('#categoryEditBubble').css('display', 'block');
      responsiveVoice.speak(message, "UK English Male");
      console.log("hhh");
      console.log(parentElm);
    }
    //new value entered
    $("button").click(function() {
      window.location.reload();
      window.scrollTo(0, 0);
    }); 
  });

  //when click outide out category item div, close the help message within
  $(document).click(function(event) {
    if (!$(event.target).closest(".quote-box").length) {
      $('#categoryEditBubble').css('display', 'none');
      $(".on_the_spot_editing").removeClass("override_hover");
    }
  });
});
var ttws;
$('blockquote').click(function() {
    console.log("this---- :");
    console.log(this);
    ttws = this;
    this.children[2].children[0].click(); //bad code -change
    this.children[3].className += " pushDown50"; //bad code -change
    });

  $(function() {
    //pie
      var chart = AmCharts.makeChart("chartdiv", {
      "type": "pie",
      "theme": "light",
      "addClassNames": true,
      "dataProvider": [{}],
      "valueField": "litres",
      "titleField": "country",
      "labelRadius": -50,
      "labelText": "[[title]]",
      "innerRadius": "40%",
      "balloon": {
        "fixedPosition": true
      },
      "listeners": [{
        "event": "rendered",
        "method": updateLabels
      }, {
        "event": "drawn",
        "method": updateLabels
      }]
    });
        //get the images of the fields filled out
    var theCatArray = $('blockquote.notBlank .budgetShowImg').map(function() { return this.src; }).get();

    var images = {};
    var allTheCatsAndAmounts = [{}];
    for(var i = 0, len = theCatArray.length; i < len; i++) {
      //retrieve category name from filename
      let imageUrl = theCatArray[i];
      var categoryName = imageUrl.substring(
          imageUrl.lastIndexOf("/assets/") + 8, 
          imageUrl.lastIndexOf("-")
      );

      var selector = "span[id^='budget__" + categoryName + "']"; //selects id like
      var catValAsString = $(selector).text(); //get €val from the elem
      var iNum = parseFloat(catValAsString); //convert to number
      var amountSpent = iNum;
      allTheCatsAndAmounts [categoryName] = amountSpent;
      //allTheCatsAndAmounts[i] = thisCategory;

      newPieSlice = {country: categoryName, litres: amountSpent} //create slice
      chart.dataProvider[chart.dataProvider.length] = newPieSlice; //add to pie
      images[categoryName] = imageUrl; //asign image
    }

    function updateLabels(event) {
      $(".amcharts-pie-label").each(function() {
        
        // init and find parent
        var label = this;
        var parent = this.parentNode;
        var text = label.children[0].innerHTML;

        // determine image
        // 
        //console.log("+++++++++++++++++ :");
        //console.log(images);
        var flag = images[text];
        
        // create image
        var group = document.createElementNS('http://www.w3.org/2000/svg', "g");
        var img = document.createElementNS('http://www.w3.org/2000/svg', "image");

        // Setup image
        img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', flag);
        img.setAttribute('x', '-17');
        img.setAttribute('y', '-17');
        img.setAttribute('width', '34');
        img.setAttribute('height', '34');

        // Swap position to group; remove from label
        group.setAttribute('transform', label.getAttribute('transform'));
        parent.removeChild(label);

        // Group axis labels
        //group.appendChild(label);
        group.appendChild(img);
        parent.appendChild(group);
      });;
    }

    //auto TTS when tap on slice -
      setTimeout(function() {
        //tapping on outer slice
        $("g.amcharts-pie-item").click(function(){
          var desc = $(this).attr('aria-label');
          var categoryName = desc.substring(
              0, 
              desc.lastIndexOf(":")
          );
          //alert(categoryName);
          let message = allTheCatsAndAmounts[categoryName] + "spent on: " + categoryName;
        responsiveVoice.speak(message, "UK English Male");
        moveCardUp(categoryName);//moves card up beside pie
        });
      
        //tapping on image
        $("image").click(function(){
        var imgSrc = $(this).attr("href");
        var categoryName = imgSrc.substring(
              imgSrc.lastIndexOf("/assets/") + 8, 
              imgSrc.lastIndexOf("-")
          );
        //alert(categoryName + allTheCatsAndAmounts[categoryName]);
        let message = allTheCatsAndAmounts[categoryName] + "spent on: " + categoryName;
        responsiveVoice.speak(message, "UK English Male");
        moveCardUp(categoryName);//moves card up beside pie
        });
      }, 500);
    // ./ pie
   });
 
  //update pie chart - new value entered
  $('span').on("keypress", function(e) {
    if (e.keyCode == 13) {
      window.location.reload();
      window.scrollTo(0, 0);
    }
  });   
  $("button").click(function() {
    alert("yo1");
    //window.location.reload();
  }); 

//   $("form").submit(function (e) {
//     e.preventDefault();
//     alert("yo7777");
// });