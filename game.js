let canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d')
ctx.fillStyle = 'border:2px solid black';
var img = new Image();
var money = new Image();
img.src ='basket.png';
money.src = 'gold-coins.png';
var bombImage = new Image();
bombImage.src = 'bomb1.png'
explosionImage = new Image();
explosionImage.src = 'explosion.png'
var liveimage = new Image();
liveimage.src= 'live.png'
let score = 0;
let lives = 3;
let increasebombSpeed = 1;
let moneyBagSpeed = 2;
var goldScore = new Image();
goldScore.src = 'gold.png'
let background = new Image();
background.src = 'background.png'
let taxes = new Image()
taxes.src = 'taxes.png'

let checker = 10;
let emptyBagSpeed = 50


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
        if(this.y+30>canvas.height-emptyBag.height && this.y+90<canvas.height+30 && this.x+this.width/2>emptyBag.x && this.x<emptyBag.x+emptyBag.width){
            this.y += NaN;
            if(this.type == 'money'){
                score++;
            }
            if(this.type=='bomb'){
                this.explosionBool = true;
                switch(lives){
                    case 3:
                        ctx.clearRect(370,15,50,40)
                        lives--
                        break;
                    case 2:
                        ctx.clearRect(430,15,50,40)
                        lives--;
                        break;
                    case 1:
                        ctx.clearRect(490,15,50,40)
                        lives--
                        break
                    case 0:
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
        checker+=10;
        moneyBagSpeed +=1;
        emptyBagSpeed +=5;
    }
}
var fallingObject1 = new fallingObject(Math.floor(Math.random()*500),70,70,'money')
var fallingObjectArr = [fallingObject1]


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
    ctx.font = '30px Arial'
    ctx.fillText('Score : '+score*50,20,40)
    ctx.drawImage(goldScore,200,10,40,40)
}

function drawExplosion(x,y,width,height,bombBool){
        ctx.drawImage(explosionImage,x,y,width,height)
}

function draw (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground()
    drawLives()
    drawEmptyMoneyBag(emptyBag);
    drawScoreBoard();
    updateSpeeds()
    for(let i =0; i<fallingObjectArr.length;i++){
        drawFallinObjects(fallingObjectArr[i]);
        let explosionY = canvas.height-emptyBag.height;
        //drawExplosion(fallingObjectArr[i].x,explosionY,fallingObjectArr[i].width,fallingObjectArr[i].height,fallingObjectArr[i].explosionBool)
        fallingObjectArr[i].moveDown();
        fallingObjectArr[i].checkCollision();
        if(fallingObjectArr[i].y > 150  && fallingObjectArr[i].bool){
            fallingObjectArr[i].bool = false;
            if(Math.floor(Math.random()*8) > 2){
                fallingObject1 = new fallingObject(Math.floor(Math.random()*500),70,70,'money')
                fallingObjectArr.push(
                fallingObject1
            )}else{
                if(lives>=3){
                    fallingObject1 = new fallingObject(Math.floor(Math.random()*500),70,70,'bomb')
                    fallingObjectArr.push(
                    fallingObject1
                    )
                } else{
                    fallingObject1 = new fallingObject(Math.floor(Math.random()*500),70,70,(Math.round(Math.random()*5)<4?'bomb':'live'))
                    fallingObjectArr.push(
                    fallingObject1
                    )
                }
            }
        }

    }
    drawScoreBoard()

}


let interval = setInterval(function(){
    draw();
},20) 
                   
/*if(moneyBagArr.length==3 && !speedBool){
        moneyBagSpeed=moneyBagSpeed+2;
        //console.log('hello')
        speedBool = true;
    }*/

