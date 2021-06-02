$(document).ready(function(){

	var clickCount=0;
	var result,player,playerToken;
	

	$(".box").click(function(){
		$(this).unbind('click');
		clickCount+=1;
		setPlayerToken(clickCount,$(this));
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

	//for statrting game
		$("#start").click(function(){
			$(".box").css("pointer-events", "auto");
			$("#start").hide();
			$(".player1").show();
		});

	//function for setting the player token
	function setPlayerToken(clickCount,thisBox){
		if (clickCount % 2 != 0){
			thisBox.addClass("disabled1");
			thisBox.text("O");
			playerToken="OOO";
			player="1";
		}
		else{
			thisBox.addClass("disabled2");
			thisBox.text("X");
			playerToken="XXX";
			player="2";
		}
	}
	//function for setting the player turn
	function showPlayerTurn(){
			$(".player1").toggle();
			$(".player2").toggle();
	}

	//function to check the winner
	function checkRowWinner(thisRow){
		if ($(".row1").text() == playerToken || $(".row2").text() == playerToken || $(".row3").text() == playerToken ){
			result=`<p>Congratulations!! 🎉🎉 <strong> Player${player} is the winner.</strong></p>`;
			declareWinner();
		}

	}
	//function to check the winner
	function checkColWinner(thisRow){
		if ($(".col1").text() == playerToken || $(".col2").text() == playerToken || $(".col3").text() == playerToken ){
			result=`<p>Congratulations!! 🎉🎉 <strong> Player${player} is the winner.</strong></p>`;
			declareWinner();
		}

	}
	//function to check the winner
	function checkDiagWinner(thisRow){
		if ($(".diag1").text() == playerToken || $(".diag2").text() == playerToken ){
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
			$("#player_turn_displayer").hide();
			$("#result").html(result);
			$("#result").show();
			$(".box").css("pointer-events", "none");
	}
 
	//for restatrting the once finished
		$("#restart").click(function(){
            location.reload(true);
        });

});