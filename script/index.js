var clickCount = 0;
var currentPlayerToken = "O";
var gameSize;
var winner=false;

startGame();

function startGame() {
    $("#startGame").click(function(){
        setGameSize();
        setGameArena();
        createAllBoxes();
    });
}
function setGameSize() {
    var minimumGameSize = 3;
    var maximumGameSize = 100;

    if ($("#gameSize").val() >= minimumGameSize && $("#gameSize").val() <= maximumGameSize) {
        gameSize = parseInt($("#gameSize").val());
    } else {
        alert("Please choose Game Size from 3 to 100.");
        location.reload(true);
    }
    
}
function setGameArena() { 
    $("#startGame,#gameSize").hide();
    $(".game-board,.player1").show();
 }
 function createAllBoxes(){
   
    for ( var row = 1; row <= gameSize; row++) {
         createRow(row);
        for ( var col = 1; col<= gameSize; col++){
            primaryDiagonal = setPrimaryDiagonal(row,col);
            secondaryDiagonal = setSecondaryDiagonal(row,col);
            createBox(row,col,primaryDiagonal,secondaryDiagonal);
        }
    }
}
function createRow(row){
    $(".rows").append(`<div class="row" data-line=${row}></div>`);
}
function createBox(row,col,primaryDiagonal,secondaryDiagonal) {
    $(`[data-line = ${row}]`).append(`<div class="box" data-row=${row} data-col=${col} data-primaryDiagonal=${primaryDiagonal} data-secondaryDiagonal=${secondaryDiagonal} ></div>`);
}
function setPrimaryDiagonal(row,col) {
    return row == col? "pDiagonal":"none";
}
function setSecondaryDiagonal(row,col) {
    return row + col == gameSize + 1?"sDiagonal":"none"
}

//all the functions for games logic

$(".rows").on("click",".box",function() {
    clickCount++;
    $(this).css("pointer-events", "none");

    currentPlayerToken = setCurrentPlayer(clickCount);
    setCurrentPlayerBox(currentPlayerToken,$(this));
    showPlayerTurn();

    var totalMinimumMovesToFindResult = gameSize * 2 -1;

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

    getPossibleWinningTokenTexts(currentRowNumber,currentColNumber);

    if (clickCount == gameSize * gameSize && !winner) {
        var message = "<p>It's a Draw!! <strong> Play Again.</strong></p>"
        endTheGame(message);
    }
    
}

function getPossibleWinningTokenTexts(currentRowNumber,currentColNumber) {
    
    currentRow = document.querySelectorAll(`div[data-row='${currentRowNumber}']`);
    currentCol = document.querySelectorAll(`div[data-col='${currentColNumber}']`);
    currentPrimaryDiagonal=document.querySelectorAll(`div[data-primaryDiagonal='pDiagonal']`);
    currentSecondaryDiagonal=document.querySelectorAll(`div[data-secondaryDiagonal='sDiagonal']`);

    possibleWinningTokenTexts=[generateTokenText(currentRow),generateTokenText(currentCol),generateTokenText(currentPrimaryDiagonal),generateTokenText(currentSecondaryDiagonal)];
    checkWinner(possibleWinningTokenTexts);
}


function generateTokenText(currentCells) {
    testText="";
    currentCells.forEach(function(cell){
        testText += cell.innerText;
    });
    return testText;
}
function checkWinner(possibleWinningTokenTexts) {
    if(possibleWinningTokenTexts.includes(currentPlayerToken.repeat(gameSize))){
        winner = true;
        message=`<p>Congratulations!! 🎉🎉 <strong> Player "${currentPlayerToken}" is the winner.</strong></p>`;
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
    $(".player1,.player2").toggle();
}

