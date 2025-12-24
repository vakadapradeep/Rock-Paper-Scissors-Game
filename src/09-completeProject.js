 /* ==========================================================
         STEP 1: PAGE LOAD
         - This JavaScript runs automatically when page loads
         ========================================================== */

      /* STEP 2: Get score from localStorage
         - localStorage stores data as STRING
         - JSON.parse converts it back to an object
         - If nothing exists, result will be null
      */
      let score = JSON.parse(localStorage.getItem("score"));

      /* STEP 3: First-time user check
         - If score is null, create a new score object
         - This happens on first visit or after reset
      */
      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          Tie: 0,
        };
      }

      /* STEP 4: Show score immediately when page loads */
      updateScoreElement();

      /* ==========================================================
         STEP 5: Function to update score in UI
         - Called on page load
         - Called after every game
         ========================================================== */
      function updateScoreElement() {
        document.querySelector(".js-score").innerHTML = `
          Wins: ${score.wins}
          Losses: ${score.losses}
          Tie: ${score.Tie}
        `;
      }

      /* ==========================================================
         STEP 6: Main game function
         - Triggered when user clicks Rock / Paper / Scissors
         - input = player's choice
         ========================================================== */
      function playerMove(input) {
        /* STEP 6.1: Generate computer move
           - Math.random() → 0 to <1
           - * 3 → 0 to <3
           - Math.floor → 0, 1, or 2
        */
        let comMoves = Math.floor(Math.random() * 3);

        /* STEP 6.2: Convert random number to move name */
        let computerMoves = "";

        if (comMoves === 0) {
          computerMoves = "rock";
        } else if (comMoves === 1) {
          computerMoves = "paper";
        } else {
          computerMoves = "scissors";
        }

        /* STEP 6.3: Decide the result (Win / Lose / Tie) */
        let result = "";

        if (computerMoves === input) {
          result = "Your Match Tie";
        } else if (
          (input === "rock" && computerMoves === "paper") ||
          (input === "paper" && computerMoves === "scissors") ||
          (input === "scissors" && computerMoves === "rock")
        ) {
          result = "You Lose";
        } else {
          result = "You Win";
        }

        /* STEP 7: Update score values based on result */
        if (result === "You Win") {
          score.wins += 1;
        } else if (result === "You Lose") {
          score.losses += 1;
        } else {
          score.Tie += 1;
        }

        /* STEP 8: Save updated score in localStorage
           - JSON.stringify converts object → string
        */
        localStorage.setItem("score", JSON.stringify(score));

        /* STEP 9: Update score on UI */
        updateScoreElement();

        /* STEP 10: Show result text on screen */
        document.querySelector(".js-result").innerHTML = result;

        /* STEP 11: Show player & computer images dynamically */
        document.querySelector(".js-moves").innerHTML = `
          You
          <img src="images/${input}-emoji.png" class="move-icon" />
          <img src="images/${computerMoves}-emoji.png" class="move-icon" />
          Computer
        `;
      }