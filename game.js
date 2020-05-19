let canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d')
ctx.fillStyle = 'border:2px solid black';
var img = new Image();
var money = new Image();
var bombImage = new Image();
var liveimage = new Image();
var goldScore = new Image();
var explosionImage = new Image();
let taxes = new Image();
let background = new Image();
img.src ='images/basket.png'
money.src = 'images/gold-coins.png';
bombImage.src = 'images/bomb1.png'
explosionImage.src = 'images/explosion.png'
liveimage.src= 'images/live.png'
goldScore.src = 'images/gold.png'
background.src = 'images/background.png'
taxes.src = 'images/taxes.png'
let level = 0;
let checker = 10;
let emptyBagSpeed = 50
window.score = 0;
let lives = 3;
let increasebombSpeed = 1;
let moneyBagSpeed = 2;
var bombSound = new Audio('sounds/bombSound.mp3');
var goldSound = new Audio('sounds/goldSound.mp3');
var gameOverSound = new Audio('sounds/gameover.mp3');



var emptyBag = {

    x : 10,
    y: canvas.height-100,
    width : 100,
    height : 100,

    moveLeft : function(){

        this.x -= emptyBagSpeed;
    } ,

    moveRight : function(){

        this.x +=emptyBagSpeed;
    }
}


class fallingObject{

    constructor(x,height,width,type){
        this.x = x;
        this.y =10;
        this.height=height;
        this.width=width;
        this.type = type;
        this.bool = true;
        this.explosionBool = false;
        this.explosionX = x;

    }
    moveDown(){

        switch(this.type){
            case 'bomb':
                this.y +=moneyBagSpeed+increasebombSpeed;
                break;
            case 'money':
                this.y += moneyBagSpeed;
                break;
            case 'live':
                this.y += moneyBagSpeed;
                break;
        }
    }


    checkCollision(){

        if(this.y+10>canvas.height-emptyBag.height && this.y+90<canvas.height+30 && this.x+this.width/2>emptyBag.x && this.x<emptyBag.x+emptyBag.width){
            this.y += NaN;

            if(this.type == 'money'){
                score++;
                goldSound.play();
            }

            if(this.type=='bomb'){
                this.explosionBool = true;
                switch(lives){
                    case 3:
                        ctx.clearRect(370,15,50,40)
                        bombSound.play(); 
                        lives--
                        break;
                    case 2:
                        ctx.clearRect(430,15,50,40)
                        lives--;
                        bombSound.play(); 
                        break;
                    case 1:
                        ctx.clearRect(490,15,50,40)
                        lives--
                        bombSound.play(); 
                        break
                    case 0:
                        gameOverSound.play();
                        window.localStorage.setItem('Score',window.score)
                        document.location.href = "gameOver.html";
                        break;
                }
            }

            if(this.type=='live'){
                if(lives<=2){
                    lives++
                }
            }
        }
    }

}

function updateSpeeds(){

    if(score>checker){

        if(moneyBagSpeed<7){
            checker+=10;
            level++;
            moneyBagSpeed +=1;
            emptyBagSpeed +=5;
        }
    }
}

var fallingObject1 = new fallingObject(Math.floor(Math.random()*500),50,50,'money')
var fallingObject2 = new fallingObject(Math.floor(Math.random()*500),50,50,'bomb')
var fallingObject3 = new fallingObject(NaN,0,0,'live')
var fallingObjectArr = [fallingObject1,fallingObject2,fallingObject3]


document.onkeydown = function(e) {

        if(emptyBag.x<canvas.width-100){

           if(e.keyCode==39){
                emptyBag.moveRight();
           }
        }

        if(emptyBag.x>0){

            if(e.keyCode==37){
                emptyBag.moveLeft();
            }
        }
}

function drawBackground() {
    ctx.drawImage(background,0,0,canvas.width,canvas.height)
}

function drawEmptyMoneyBag(emptyBag){
    ctx.drawImage(img, emptyBag.x, emptyBag.y, emptyBag.width, emptyBag.height)      
}

function drawFallinObjects(fallingObject1){

    if(fallingObject1.type=='money'){
        ctx.drawImage(money, fallingObject1.x, fallingObject1.y, fallingObject1.width, fallingObject1.height)        
    }  

    if(fallingObject1.type=='bomb'){
        ctx.drawImage(bombImage, fallingObject1.x, fallingObject1.y, fallingObject1.width, fallingObject1.height)        
    }   

    if(fallingObject1.type=='live'){
        ctx.drawImage(liveimage, fallingObject1.x, fallingObject1.y, fallingObject1.width, fallingObject1.height)        
    }  

    if(fallingObject1.type=='taxes'){
        ctx.drawImage(taxes, fallingObject1.x, fallingObject1.y, fallingObject1.width, fallingObject1.height)        
    }    
}

class tax {

    constructor(){
        this.x = Math.floor(Math.random()*500)
        this.y = 10,
        this.width = 120,
        this.height = 120,
        this.bool = true;
    }

    moveDown() {
        this.y += moneyBagSpeed;
    }

    checkCollision() {

        if(this.y+30>canvas.height-emptyBag.height && this.y+90<canvas.height+30 && this.x+this.width/2>emptyBag.x && this.x<emptyBag.x+emptyBag.width){
            this.y = NaN;
            score = score -10;
        }
    }
}

let tax1 = new tax();
var taxesArr = [tax1]

function drawTaxes(taxesArr){

    if(level>0){

        for(let i = 0;i<taxesArr.length;i++){
            ctx.drawImage(taxes,taxesArr[i].x,taxesArr[i].y,taxesArr[i].width,taxesArr[i].height)
            taxesArr[i].moveDown();
            taxesArr[i].checkCollision();

            if(taxesArr[i].y>200 && taxesArr[i].bool){
                taxesArr[i].bool = false;

                if(Math.round(Math.random()*9)<2){
                    taxes1 = new tax();
                    taxesArr.push(taxes1);

                 }else{
                    taxes1 = new tax();
                    taxes1.x = NaN;
                    taxesArr.push(taxes1);
                } 
            }
        }
    }
}

function drawLives(){

    switch(lives){

        case 3:

            ctx.drawImage(liveimage,370,15,50,40);
            ctx.drawImage(liveimage,430,15,50,40);
            ctx.drawImage(liveimage,490,15,50,40);
            break;

        case 2: 

            ctx.drawImage(liveimage,430,15,50,40);
            ctx.drawImage(liveimage,490,15,50,40);
            break;

        case 1:

            ctx.drawImage(liveimage,490,15,50,40);
            break;
    }
}

function drawScoreBoard(){
    ctx.font = '50px Arial'
    ctx.fillText('Score : '+score*50,20,40)
    //ctx.drawImage(goldScore,230,10,40,40)
    console.log('score is '+score)
    
}

function drawExplosion(x,y,width,height,bombBool){
        ctx.drawImage(explosionImage,x,y,width,height)
}

function updateFallingObjects(){

    for(let i =0; i<fallingObjectArr.length;i++){
        drawFallinObjects(fallingObjectArr[i]);
        fallingObjectArr[i].moveDown();
        fallingObjectArr[i].checkCollision();

        if(fallingObjectArr[i].y > 150  && fallingObjectArr[i].bool && fallingObjectArr[i].type=='money'){
            fallingObjectArr[i].bool = false;
            fallingObject1 = new fallingObject(Math.floor(Math.random()*500),55,55,'money')
            fallingObjectArr.push(
                fallingObject1
            )
        }
        if(fallingObjectArr[i].y > 150  && fallingObjectArr[i].bool && fallingObjectArr[i].type=='bomb'){
            fallingObjectArr[i].bool = false;

            if(Math.round(Math.random()*2)==1){
                fallingObject1 = new fallingObject(Math.floor(Math.random()*500),50,50,'bomb')
                    fallingObjectArr.push(
                        fallingObject1
                    )
            }else{
                fallingObject1 = new fallingObject(NaN,70,70,'bomb')
                    fallingObjectArr.push(
                        fallingObject1
                    )
            }
        }

        if(fallingObjectArr[i].y > 150  && fallingObjectArr[i].bool && fallingObjectArr[i].type=='live'){
            fallingObjectArr[i].bool = false;

            if(Math.round(Math.random()*10)==2 && lives<3){
                fallingObject1 = new fallingObject(Math.floor(Math.random()*500),50,50,'live')
                    fallingObjectArr.push(
                        fallingObject1
                    )
            }else{
                fallingObject1 = new fallingObject(NaN,0,0,'live')
                    fallingObjectArr.push(
                        fallingObject1
                    )
            }
        }

    }
}

    function draw (){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground()
        drawLives()
        drawEmptyMoneyBag(emptyBag);
        updateSpeeds()
        updateFallingObjects()
        drawTaxes(taxesArr)
        drawScoreBoard()
    }
    




 let interval = setInterval(function(){
    draw();
},20) 
                   

