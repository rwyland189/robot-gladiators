// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 50;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 500;
var enemyAttack = 12;

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
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }

            // if no (false), ask question again by running fight() again
            else {
                fight ();
            }
            
        }

        if (promptFight === "fight" || promptFight === "FIGHT") {
            // generate a random damage value based on player's attack power
            var damage = randomNumber(playerAttack - 3, playerAttack);

            // subtract damage value from enemy health
            enemyHealth = Math.max(0, enemyHealth - damage);

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

            // generate random damage value based on enemy's attack power
            var damage = randomNumber(enemyAttack - 3, enemyAttack);

            // subtract damage value from player health
            playerHealth = Math.max(0, playerHealth - damage);

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

// function to start a new game
var startGame = function() {
    // reset player stats every time player plays the game
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they are in, arrays start at 0 so we need to have a 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
    
            // reset enemy health before starting new fight
            enemyHealth = randomNumber(40, 60);
    
            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;
    
            // this fight() function call now passes each enemy-robot name into the fight() function, will let the player face each robot in a battle round        
            fight(enemyNames[i]);

            // if player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store()(shop?) function
                if (storeConfirm) {
                    shop();
                }
            }
        }
    
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // play again, but does an infinite loop and can't end game
    // startGame();

    
};

// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// shop function
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;       
        
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// start the game when the page loads
startGame();

// let players enter and shop in the store
shop();

// after the loop ends, player is either out of health or enemies to fight, so run the endGame function
endGame();
