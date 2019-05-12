var characterSelected = false;
var defenderSelected = false;
var attackButtonCreated = false;
var playerBaseAttack;

//Add click handler to the character cards
$(".character").on("click", setupGame);


function setupGame() {
  //Check if the player has selected a character yet
  //In jQuery  'this'  will hold the element that fired the the event
  if (!characterSelected) {
    $(this).appendTo("#playerRow");

    playerBaseAttack = $(this).attr('attack') * 1;
    console.log("baseAttack: " + playerBaseAttack);

    characterSelected = true;
  }
  //If the player has already selected a character, check if a defender has been selected
  else if (!defenderSelected) {
    $(this).appendTo("#defenderRow");
    $("#startingRow .character").appendTo("#enemyRow");

    defenderSelected = true;

    //Dynamically create the attack button, add a click handler, and append to the players row
    if (!attackButtonCreated) {
      var button = $("<button/>", {
        text: "Attack",
        click: attack
      });

      $("#playerRow").append(button);
      attackButtonCreated = true;
    }
  }
}

var playerHealth;
var defenderHealth;
var playerAttack;
var defenderAttack;

function attack() {
  //Get the health and attack power of the player and defender characters
  playerHealth = $("#playerRow .character #hp").text();
  defenderHealth = $("#defenderRow .character #hp").text();

  playerAttack = $("#playerRow .character").attr("attack");
  defenderAttack = $("#defenderRow .character").attr("counter-attack");

  //Update player and defender's health points in the DOM
  defenderHealth = defenderHealth - playerAttack;
  playerHealth = playerHealth - defenderAttack;
  $("#defenderRow .character #hp").text(defenderHealth);
  $("#playerRow .character #hp").text(playerHealth);

  //Increase the players attack points and update it in the DOM
  playerAttack = playerAttack * 1 + playerBaseAttack;
  console.log("newAttack: " + playerAttack);

  $("#playerRow .character").attr("attack", playerAttack);

  //Check if either the defender or player has died this round
  checkIfDead();
}

function checkIfDead() {
  //Check if the defenders health points is equal to or below 0
  if (defenderHealth <= 0) {
    $("#defenderRow .character").remove();
    //Allow the player to select a new defender
    alert(
      "You killed the defender! Choose a new enemy to fight by clicking on them."
    );
    defenderSelected = false;
  }

  //Check if player's health points is equal to or below 0. If so, alert loss and restart game
  else if (playerHealth <=0 ){
    alert("You have lost! The page will reset and you may try again.");
    location.reload();
  }

}
