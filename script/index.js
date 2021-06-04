$(document).ready(function(){
	createAllBoxes();
	var currentRowNumber,currentColNumber;
	var clickCount=0;
	var result,player,playerTokenText,currentTokenText;
	
	$(".box").click(function(){
		$(this).unbind('click');
		
		clickCount+=1;
		if (clickCount % 2 != 0){
			setPlayerToken("disabled1","O","OOOOOOOOO","1",$(this));
		}
		else{
			setPlayerToken("disabled2","X","XXXXXXXXX","2",$(this));
		}
		showPlayerTurn();

		if (clickCount>=17){
            currentRowNumber = $(this).parent().data('row').split("");
            currentRowNumber = currentRowNumber[currentRowNumber.length - 1];

            currentColNumber = $(this).data('col').split("");
            currentColNumber = currentColNumber[currentColNumber.length - 1];

			checkRowWinner(currentRowNumber);
            checkColWinner(currentColNumber);

            if (currentRowNumber == currentColNumber) {
                checkPrimaryDiagonalWinner();
            }
            if ( parseInt(currentRowNumber) + parseInt(currentColNumber) == 10) {
                checkSecondaryDiagonalWinner();
            }
        }	
        if(clickCount === 81 && !result){
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

	//functions to check the winner by row
	function checkRowWinner(currentRowNumber){
            currentRow = $(`div[data-row='Row${currentRowNumber}']`)["0"];
            currentRow = currentRow.innerText.replace(/\r?\n|\r/g, "");
            checkWinner();
	}
    //functions to check the winner by column
	function checkColWinner(currentColNumber){
        currentCol = $(`div[data-col='Col${currentColNumber}']`);
        currentTokenText = getCurrentTokenText(currentCol);
        checkWinner();
    }

    //function to check winner by primary diagonal
    function checkPrimaryDiagonalWinner(){
        currentDiagonal=$(`div[data-primaryDiag='pDiagonal']`);
        currentTokenText = getCurrentTokenText(currentDiagonal);
        checkWinner();
    }

    //function to check winner by secondary diagonal
    function checkSecondaryDiagonalWinner(){
        currentDiagonal=$(`div[data-secondaryDiag='sDiagonal']`);
        currentTokenText = getCurrentTokenText(currentDiagonal);
        checkWinner();
    }
    //function to check col and diagonal texts
    function getCurrentTokenText(currentCell){
        return (currentCell["0"].innerText + currentCell["1"].innerText + currentCell["2"].innerText +
                currentCell["3"].innerText + currentCell["4"].innerText + currentCell["5"].innerText +
                currentCell["6"].innerText + currentCell["7"].innerText + currentCell["8"].innerText);
    }

    //function to check winner
    function checkWinner() {
        if(currentTokenText == playerTokenText){
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

	//function to create Boxes:rows and columns
	function createBoxes(){
		for (let col = 1; col<= 9; col++){
			col_num = `Col${col}`;
		$(".row").append(`<div class="box" data-col=${col_num} ></div>`);
		}
		
	}

    function createAllBoxes(){
		for (let row = 1; row <=9; row++) {
            row_num = `Row${row}`;
			$(".rows").append(`<div class="row" data-row=${row_num}></div>`)
            for (let col = 1; col<= 9; col++){
                if (row==col) {
                    primaryDiag = "pDiagonal"; 
                }else{
                    primaryDiag="None";
                }
                if ( col+row == 10) {
                    secondaryDiag = "sDiagonal";
                }else{
                    secondaryDiag = "None";
                }
                col_num = `Col${col}`;
            $(`[data-row = ${row_num}]`).append(`<div class="box" data-col=${col_num} data-primaryDiag=${primaryDiag} data-secondaryDiag=${secondaryDiag} ></div>`);
            }
		}
		
		
	}
});