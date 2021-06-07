$(".game-board").hide();
var clickCount = 0;
var currentPlayerToken = "O";
var gameSize,result=false;
startGame();

function startGame() {
    $("#startGame").click(function(){
        setGameSize();
        setGameArena();
        createAllBoxes();
    });
}
function setGameSize() {
    
    if ($("#gameSize").val() >= 3 && $("#gameSize").val() <= 100) {
        gameSize = parseInt($("#gameSize").val());
    } else {
        alert("Please choose Game Size from 3 to 100.");
        location.reload(true);
    }
    
}
function setGameArena() { 
    $("#startGame").hide();
    $("#gameSize").hide();
    $(".game-board").show();
    $(".player1").show();
 }
 function createAllBoxes(){
    for (row = 1; row <= gameSize; row++) {
        row_num = `Row${row}`;
        $(".rows").append(`<div class="row" data-line=${row}></div>`)
        for ( col = 1; col<= gameSize; col++){
            if (row==col) {
                primaryDiag = "pDiagonal"; 
            }else{
                primaryDiag="None";
            }
            if (col+row == gameSize + 1) {
                secondaryDiag = "sDiagonal";
            }else{
                secondaryDiag = "None";
            }
            col_num = `Col${col}`;
        $(`[data-line = ${row}]`).append(`<div class="box" data-row=${row} data-col=${col} data-primaryDiag=${primaryDiag} data-secondaryDiag=${secondaryDiag} ></div>`);
        }
    }
}

//all the functions for games logic

$(".rows").on("click",".box",function() {
    clickCount++;
    $(this).css("pointer-events", "none");
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
    if (clickCount == gameSize * gameSize) {
        checkDraw();
    }
    
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
        currentDiagonal=document.querySelectorAll(`div[data-primaryDiag='pDiagonal']`);
    }else if(parseInt(currentRowNumber) + parseInt(currentColNumber) == gameSize + 1){
        currentDiagonal=document.querySelectorAll(`div[data-secondaryDiag='sDiagonal']`);
    }   

    if (currentDiagonal){
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
    if(currentTestToken == currentPlayerToken.repeat(gameSize)){
        result = true;
        message=`<p>Congratulations!! 🎉🎉 <strong> Player "${currentPlayerToken}" is the winner.</strong></p>`;
        endTheGame(message);
    }
}
function checkDraw() { 
    if (!result){
        message="<p>It's a Draw!! <strong> Play Again.</strong></p>"
        endTheGame(message);
    }
 }

function endTheGame(message){
    restartGame();
    displayResult(message);
    
}
function displayResult(message) {
    $("#player_turn_display").hide();
    $("#result").html(message);
    $(".box").css("pointer-events", "none");
}
  

function restartGame(){
    $(".restart").show();
    $("#gameSize").val("");
    $("#restart").click(function(){
        location.reload(true);
    });
}

function showPlayerTurn(){
    $(".player1").toggle();
    $(".player2").toggle();
}

