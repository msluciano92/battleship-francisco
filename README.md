# battleship-test

2) 
	a. Fire a player shot.

		Make a play of the player.

		PATCH http://localhost:1337/send-plays-player

		body => {
			"partida_id": value number that references a game
			"x": valor entre 1..10 (string)
			"y": valor entre A..J (string)
		}

	b. Get the game’s state at a given moment.
		GET http://localhost:1337/state-game-player/:id
		retorn state board, reflects the player plays (send-play-player)

		GET http://localhost:1337/state-game-cpu/:id
		retorn state board, reflects the cpu plays (send-play-cpu)
		

	c. Fire a CPU shot, taking into account the game’s state.
		PATCH http://localhost:1337/send-plays-cpu

		body => {
			"partida_id": value number, references a game
			"x": valor entre 1..10 (string)
			"y": valor entre A..J (string)
		}

		

	d. Modification of a ship's name

		PATCH http://localhost:1337/barco/:id

		body => {
			"nombre": "..." (string)
		}

	e. Remove a ship

		DELETE http://localhost:1337/barco/:id

*************************************************************************


Steps to try


1) Created a game
	 POST -> http://localhost:1337/create-game
	 	body: {
	 		"nombre": "name game"
	 	}
	 Create game. It is initialized the boards. Boards are  4; 2 are for player and 2 for cpu:
	 tipo "JD" (player defend): board references ship of the player.
	 tipo "JA" (jugador ataca): board references the player play.
	 tipo "CD" (cpu defiende): board references ship of the cpu.	 	 
	 tipo "CA" (cpu ataca): board references the cpu play.


2) Create ship of the player and cpu

	POST -> http://localhost:1337/create-ship-player
		body: {
			"partida_id": "id the game",
			"nombre": the ship name (string),
			"longitud": the ship length (number),
			"inicial_x": coordinate x initial (string), ['0'..'9']
			"inicial_y": coordinate y initial (string), ['A'..'J']
			"orientacion": ship orientation, vertical or horizontal (string), [V, H],
			"dirección": the ship address. Left, rigth, bottom or Top (string), [L,R,B,T]
		}				

		( EJ =>
			{	
				"nombre": "sarasa",
				"longitud": 5,
				"partida_id" : 1,
				"inicial_x": "1",
				"inicial_y": "B",
				"orientacion": "H",
				"direccion": "R"
			}
		 ) 



Once this is done, you can try 2) a.  y  2) b.

* CLARIFICATIONS:
	Pending:
		Control the number ship on the board.
			"     the ship lenth.
			"     when game finalized.
			"	  you can start playing once the boards are created.


# battleship
# battleship-francisco
