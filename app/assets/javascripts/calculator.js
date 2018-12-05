 $(document).ready(function(){
            var displayValue = '0';   
            var lastValue;//used for context memory ie. after 3,+,3,=  are pressed the value is held onto in case an operator is pressed straight after   
            $('.result').text(displayValue);
 
            $('.key').each(function(index, key){       
                $(this).click(function(e){
                    if(displayValue == '0') displayValue = '';
                    if($(this).attr("value") == 'C'){
                        displayValue = '0';
                        $('.result').text(displayValue);
                    }
                    else if($(this).text() == '='){
                        try{
                            displayValue = eval(displayValue);
                            $('.result').text(displayValue);
                            lastValue = displayValue;
                            displayValue = '0';
                        }
                        catch (e){
                            displayValue = '0';
                            $('.result').text('ERROR');
                        }               
                    }
                    else{
                        displayValue += $(this).attr('value');
                        //alert("adding + " + displayValue);
                        displayValIsEmpty = $('.result').text('');
                         if($(this).text() == '+' ){
                            //alert("displ ++ : " + displayValue + " old one is "+ lastValue );
                            newDisplayValue = lastValue + displayValue;
                            //displayValue = newDisplayValue;
                        }

                        $('.result').text(displayValue);
                    }
                    e.preventDefault()
                })
            })

            $('.numberCalcBtn').click(function(){
            	$('#arrow1').css("visibility", "visible");
            	$('#arrow2').css("visibility", "hidden");
            	$('.calculatorMain').css("background-color", "#78CBC3");
            	$('#calculator_number').toggleClass("hidden");
            	$('#calculator_money').toggleClass("hidden");
            });
            $('.moneyCalcBtn').click(function(){
            	$('#arrow2').css("visibility", "visible");
            	$('#arrow1').css("visibility", "hidden");
            	$('.calculatorMain').css("background-color", "#7b69eb");
            	$('#calculator_money').toggleClass("hidden");
            	$('#calculator_number').toggleClass("hidden");
            });
        })