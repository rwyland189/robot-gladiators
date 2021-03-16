// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 20;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 20;

var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while(enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }

            // if no (false), ask question again by running fight() again
            else {
                fight ();
            }
            
        }

        if (promptFight === "fight" || promptFight === "FIGHT") {
            // Subtract the value of 'playerAttack from the value of 'enemyHealth and use that result to update the value in the 'enemyHealth' variable
            enemyHealth = enemyHealth - playerAttack;

            // Log a resulting message to the console so we know that it worked
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // Check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                // leave while() if enemy is dead
                break;
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
            playerHealth = playerHealth - enemyAttack;

            // Log a resulting message to the console so we know that it worked
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            // Check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                // leave while() loop if player is dead
                break;
            } 
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        } 
        
        else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
};

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    // this fight() function call now passes each enemy-robot name into the fight() function, will let the player face each robot in a battle round        
    fight(enemyNames[i]);
}