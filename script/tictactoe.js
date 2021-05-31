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

	let draw; 
	let finished;
		$(".box").click(function(){
			if (count <= 9) {
				count+=1;
				id = $(this).attr("id")
				if (count % 2 != 0){
					//player 1
					$(this).addClass("disabled1")
					$(this).html("O")

					$(".player1").hide()
					$(".player2").show()

					id.split("")[0]== "1"? player1_row_1+=1: id.split("")[0]== "2"?player1_row_2+=1:player1_row_3+=1;
					id.split("")[1]== "1"? player1_col_1+=1: id.split("")[1]== "2"?player1_col_2+=1:player1_col_3+=1;
					if (id.split("")[0]== id.split("")[1]){player1_diag_1+=1}
					if (id == "13" || id == "22" || id == "31"){player1_diag_2+=1}
					
				}
				else{
					//player 2
					$(this).addClass("disabled2")
					$(this).html("X")
					
					$(".player1").show()
					$(".player2").hide()

					id.split("")[0]== "1"? player2_row_1+=1: id.split("")[0]== "2"?player2_row_2+=1:player2_row_3+=1;
					id.split("")[1]== "1"? player2_col_1+=1: id.split("")[1]== "2"?player2_col_2+=1:player2_col_3+=1;
					if (id.split("")[0]== id.split("")[1]){player2_diag_1+=1}
					if (id == "13" || id == "22" || id == "31"){player2_diag_2+=1}
				}
				$(this).unbind('click')
				

				if (player1_row_1 == 3 || player1_row_1 == 3 || player1_row_2 == 3 || player1_row_3 == 3 || player1_col_1 == 3 || player1_col_2 == 3 || player1_col_3 == 3 || player1_diag_1 == 3 || player1_diag_2 == 3) {
					alert("Player1 is winner")
					draw=false
					finished = true
				}
				else if(player2_row_1 == 3 || player2_row_1 == 3 || player2_row_2 == 3 || player2_row_3 == 3 || player2_col_1 == 3 || player2_col_2 == 3 || player2_col_3 == 3 || player2_diag_1 == 3 || player2_diag_2 == 3) {
						alert("Player2 is winner")
						draw=false
						finished = true
						
				}
				else if (count >= 9){
					draw=true
					finished = true
				}
				if (draw) {alert("Its a draw!!")}
			}
		if (finished) {
			$(".restart").show()
		}

		})

		$(".restart").click(function(){
            location.reload(true);
        });
});