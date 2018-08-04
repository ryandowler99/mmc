 $(document).ready(function(){
            var displayValue = '0';   
            $('.result').text(displayValue);
 
            $('.key').each(function(index, key){       
                $(this).click(function(e){
                    if(displayValue == '0') displayValue = '';
                    if($(this).text() == 'C'){
                        displayValue = '0';
                        $('.result').text(displayValue);
                    }
                    else if($(this).text() == '='){
                        try{
                            displayValue = eval(displayValue);
                            $('.result').text(displayValue);
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
;
