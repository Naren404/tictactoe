$(document).ready(function(){
	let count=0;
	let player1_row_1 = 0;
	let player1_row_2 = 0;
	let player1_row_3 = 0;

	let player1_col_1 = 0;
	let player1_col_2 = 0;
	let player1_col_3 = 0;

	let player2_row_1 = 0;
	let player2_row_2 = 0;
	let player2_row_3 = 0;

	let player2_col_1 = 0;
	let player2_col_2 = 0;
	let player2_col_3 = 0;

	let player1_diag_1= 0;
	let player1_diag_2= 0;

	let player2_diag_1= 0;
	let player2_diag_2= 0;
	

		$(".box").click(function(){
			if (count <= 9) {
				count+=1;
				id = $(this).attr("id")
				if (count % 2 != 0){
					//player 1
					$(this).html("O")
					id.split("")[0]== "1"? player1_row_1+=1: id.split("")[0]== "2"?player1_row_2+=1:player1_row_3+=1;
					id.split("")[1]== "1"? player1_col_1+=1: id.split("")[1]== "2"?player1_col_2+=1:player1_col_3+=1;
					if (id.split("")[0]== id.split("")[1]){player1_diag_1+=1}
					if (id == "13" || id == "22" || id == "31"){player1_diag_2+=1}
					
				}
				else{
					//player 2
					$(this).html("X")
					id.split("")[0]== "1"? player2_row_1+=1: id.split("")[0]== "2"?player2_row_2+=1:player2_row_3+=1;
					id.split("")[1]== "1"? player2_col_1+=1: id.split("")[1]== "2"?player2_col_2+=1:player2_col_3+=1;
					if (id.split("")[0]== id.split("")[1]){player2_diag_1+=1}
					if (id == "13" || id == "22" || id == "31"){player2_diag_2+=1}
				}
				$(this).unbind('click')
				$(this).addClass("disabled")

				if (player1_row_1 == 3 || player1_row_1 == 3 || player1_row_2 == 3 || player1_row_3 == 3 || player1_col_1 == 3 || player1_col_2 == 3 || player1_col_3 == 3 || player1_diag_1 == 3 || player1_diag_2 == 3) {
					alert("player1 is winner")
				}
				else if(player2_row_1 == 3 || player2_row_1 == 3 || player2_row_2 == 3 || player2_row_3 == 3 || player2_col_1 == 3 || player2_col_2 == 3 || player2_col_3 == 3 || player2_diag_1 == 3 || player2_diag_2 == 3) {
						alert("player2 is winner")
				}
			}
		})
});