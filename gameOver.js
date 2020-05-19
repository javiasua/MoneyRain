let scoreObj = document.getElementById('gameOver');

let name1 = window.localStorage.getItem('Name')
scoreObj.innerHTML = 'Hey '+name1+' your score is '+(window.localStorage.getItem('Score')*50);
var gameOverSound = new Audio('sounds/gameover.mp3');
gameOverSound.volume = 0.2
gameOverSound.loop = true
gameOverSound.play()