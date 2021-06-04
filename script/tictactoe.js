$(document).ready(function(){

	var clickCount=0;
	var result,player,playerTokenText;
	

	$(".box").click(function(){
		$(this).unbind('click');
		clickCount+=1;
		if (clickCount % 2 != 0){
			setPlayerToken("disabled1","O","OOO","1",$(this));
		}
		else{
			setPlayerToken("disabled2","X","XXX","2",$(this));
		}
		showPlayerTurn();

		if (clickCount>=5){
			checkRowWinner();
			checkColWinner();
			checkDiagWinner();
		}

		if(clickCount === 9 && !result){
			checkDraw();
		}

	});
	
	//for starting game
		$("#start").click(function(){
			$(".box").css("pointer-events", "auto");
			$("#start").hide();
			$(".player1").show();
		});

	//function for setting the player token
	function setPlayerToken(disabledClass,boxText,tokenText,playerNumber,thisBox){
			thisBox.addClass(disabledClass);
			thisBox.text(boxText);
			playerTokenText=tokenText;
			player=playerNumber;
	}
	
	//function for setting the player turn
	function showPlayerTurn(){
			$(".player1").toggle();
			$(".player2").toggle();
	}

	//function to check the winner
	function checkRowWinner(thisRow){
		if ($(".row1").text() == playerTokenText || $(".row2").text() == playerTokenText || $(".row3").text() == playerTokenText ){
			result=`<p>Congratulations!! 🎉🎉 <strong> Player${player} is the winner.</strong></p>`;
			declareWinner();
		}

	}
	//function to check the winner
	function checkColWinner(thisRow){
		if ($(".col1").text() == playerTokenText || $(".col2").text() == playerTokenText || $(".col3").text() == playerTokenText ){
			result=`<p>Congratulations!! 🎉🎉 <strong> Player${player} is the winner.</strong></p>`;
			declareWinner();
		}

	}
	//function to check the winner
	function checkDiagWinner(thisRow){
		if ($(".diag1").text() == playerTokenText || $(".diag2").text() == playerTokenText ){
			result=`<p>Congratulations!! 🎉🎉 <strong> Player${player} is the winner.</strong></p>`;
			declareWinner();
		}

	}

	//function to check the draw
	function checkDraw(){
		declareWinner(result="Its a draw!! Play Again.");
	}

	//function to declare winner
	function declareWinner(){
			$(".restart").show();
			$("#player_turn_display").hide();
			$("#result").html(result);
			$("#result").show();
			$(".box").css("pointer-events", "none");
	}
 
	//for restarting the once finished
		$("#restart").click(function(){
            location.reload(true);
        });

});