$(document).ready(function(){
    var clickCount = 0;
    var gameSize;
    var currentPlayerToken = "O";
    
    startGame();
    });
    
    
    $(".box").one("click",function() {
        clickCount++;
        currentPlayerToken = setCurrentPlayer(clickCount);
        setCurrentPlayerBox(currentPlayerToken,$(this));
        showPlayerTurn();
        totalMinimumMovesToFindResult = gameSize * 2 -1;
        
        if (clickCount >= totalMinimumMovesToFindResult){
            checkForTheResult($(this));
        }
    });
    
    function setCurrentPlayer(clickCount) {
        return(clickCount % 2 != 0?currentPlayerToken = "O":currentPlayerToken  = "X");
    }
    function setCurrentPlayerBox(currentPlayerToken,thisBox){
        currentPlayerToken == "O"?boxDisabledClass = "disabled1":boxDisabledClass = "disabled2";
        thisBox.addClass(boxDisabledClass);
        thisBox.text(currentPlayerToken);
    }
    
    function checkForTheResult(thisBox){
        currentRowNumber = thisBox.data('row');
        currentColNumber = thisBox.data('col');
        getCurrentRowTokenText(currentRowNumber);
        getCurrentColTokenText(currentColNumber);
        getCurrentDiagonalText(currentRowNumber,currentColNumber);
        
    }
    function getCurrentRowTokenText(currentRowNumber){
        currentRow = document.querySelectorAll(`div[data-row='${currentRowNumber}']`);
        testTextToken = generateTokenText(currentRow);
        checkWinner(testTextToken);
    }
    function getCurrentColTokenText(currentColNumber){
        currentCol = document.querySelectorAll(`div[data-col='${currentColNumber}']`);
        testTextToken = generateTokenText(currentCol);
        checkWinner(testTextToken);
    }
    function getCurrentDiagonalText(currentRowNumber,currentColNumber) {
        if (currentRowNumber == currentColNumber) {
            currentDiagonal = document.querySelectorAll(`div[data-primaryDiag='pDiagonal']`);
            testTextToken = generateTokenText(currentDiagonal);
            checkWinner(testTextToken);
        }
        if ( parseInt(currentRowNumber) + parseInt(currentColNumber) == 10) {
            currentDiagonal = document.querySelectorAll(`div[data-secondaryDiag='sDiagonal']`);
            testTextToken = generateTokenText(currentDiagonal);
             checkWinner(testTextToken);
        }
        
    }
    
    function generateTokenText(currentCells) {
        testText="";
        currentCells.forEach(function(cell){
            testText += cell.innerText;
        });
        return testText;
    }
    function checkWinner(currentTestToken) {
        if(currentTestToken == currentPlayerToken.repeat(9)){
            endTheGame();
        }
    }
    
    function endTheGame(){
        restartGame();
        displayResult();
        
    }
    function displayResult() {
        $("#player_turn_display").hide();
        $("#result").html(`<p>Congratulations!! 🎉🎉 <strong> Player "${currentPlayerToken}" is the winner.</strong></p>`);
        $(".box").css("pointer-events", "none");
    }
    
    
    
    
        $("#start").click(function(){
            gameSize = $("#gameSize").val();
            setGameArena();
            createAllBoxes();
        });
    
    function restartGame(){
        $(".restart").show();
        $("#restart").click(function(){
        location.reload(true);
    });
    }
    function setGameArena() { 
        $(".game-board").show();
        $("#start").hide();
        $("#gameSize").hide();
        $(".player1").show();
     }
    function showPlayerTurn(){
        $(".player1").toggle();
        $(".player2").toggle();
    }
    
    //function to create all boxes
    function createAllBoxes(){
        console.log(gameSize)
        for (row = 1; row <= 4; row++) {
            row_num = `Row${row}`;
            $(".rows").append(`<div class="row" data-line=${row}></div>`)
            for ( col = 1; col<= 4; col++){
                if (row==col) {
                    primaryDiag = "pDiagonal"; 
                }else{
                    primaryDiag="None";
                }
                if (col+row == 10) {
                    secondaryDiag = "sDiagonal";
                }else{
                    secondaryDiag = "None";
                }
                col_num = `Col${col}`;
            $(`[data-line = ${row}]`).append(`<div class="box" data-row=${row} data-col=${col} data-primaryDiag=${primaryDiag} data-secondaryDiag=${secondaryDiag} ></div>`);
            }
        }
        
        
    }
    