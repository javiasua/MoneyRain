# Project's name
MONEY RAIN

## Description
This is a game where te player controls the empty money bag and tries to get as much money as possible. Money bags will be falling from the sky. However since money doesnt come easy, bombs will be falling from the sky too. Player will need to dodge bombs and thiefs whilst getting money bags. The game ends when 3 bombs hit the empty money bag (player). Thiefs will steal money from the bag .. Ocassionaly some lives will also fall from the sky. A score is calculated based on the total amount of money the player manages to get.



## MVP (DOM - CANVAS)
MVP definition, deliverables.
- Game has an empty money bag in the bottom of the screen.
- Money bags and bombs fall from the sky with similar frequencies, however lives only fall occasionally.
- Player starts game with 3 lives that will show in the top of the screen.
- Money collected will also show at the top of the screen.
- Speed of objects falling from sky will increase.
- Empty money bag will be able to shoot bullets in order to destroy bombs.



## Backlog

<p class="names"><input type="button" name="submit" value="submit" onclick="processFormData();" ></p>
## Data structure
main.js 
splashScreen(){}
gameScreen(){}
gameOverScreen(){}


game.js
addFallingObjects(){}
addEmptyMoneyBag(){}
updateCanvas(){}
clearCanvas(){}
checkCollisions(){}
increaseScoreBoard(){}
draw(){}
gameOver(){}

emptyBag.js
draw(){}
moveLeft(){}
moveRight(){}
moneyAccount(){}
shoot(){}

fallingObject.js
draw(){}
moveDown(){}



## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen


## Task
Task definition in order of priority 
main - splashScreen
main - gameScreen
main - gameOverScreen

game - addFallingObjects
game -addEmptyMoneyBag    
game - updateCanvas
game - clearCanvas
game -checkCollisions
game -increaseScoreBoard
game -draw(){}
game -gameOver

emptyBag- draw
emptyBag- moveLeft
emptyBag- moveRight
emptyBag- moneyAccount
emptyBag- shoot

fallingObject-draw
fallingObject- Types
fallinObject-moveDown


## Links


### Trello
[Link url](https://trello.com/b/sqoioQra/game-plan)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/javiasua/MoneyRain.git)
[Link Deploy](https://javiasua.github.io/MoneyRain/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)