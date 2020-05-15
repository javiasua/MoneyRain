let canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d')
ctx.fillStyle = 'border:2px solid black';
var img = new Image();
var money = new Image();
img.src ='emptyMoney.png';
money.src = 'moneybag.png';
var bombImage = new Image();
bombImage.src = 'bomb1.png'
explosionImage = new Image();
explosionImage.src = 'explosion.png'
var liveimage = new Image();
liveimage.src= 'live.png'
let speedBool=false;
let score = 0;

var emptyBag = {
    x : 10,
    y: canvas.height-100,
    width : 100,
    height : 100,

    moveLeft : function(){
        this.x -= 50;
    } ,

    moveRight : function(){
        this.x +=50;
    }
}

var bombsArr = [{
    x : Math.floor(Math.random()*500),
    y :  10,
    width : 50,
    height : 50,
    moveDown : function(){
        this.y += 2;
    },
    checkCollision : function(){
        if(this.y+60>canvas.height-emptyBag.height && this.x>emptyBag.x && this.x<emptyBag.x+emptyBag.width){
            let hi = this.y;
            ctx.drawImage(explosionImage,this.x,hi,60,60)
            this.y += NaN;
        }
    }
}]

let moneyBagSpeed =2;

var moneyBagArr = [{
    x: Math.floor(Math.random()*500),
    y : 10,
    width : 70,
    height  : 70,
    moveDown : function(){
        this.y += 2;
    },
    checkCollision : function(){
        if(this.y+60>canvas.height-emptyBag.height && this.x>emptyBag.x && this.x<emptyBag.x+emptyBag.width){
            this.y += NaN;
        }
    }
}];


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

function drawEmptyMoneyBag(emptyBag){
    ctx.drawImage(img, emptyBag.x, emptyBag.y, emptyBag.width, emptyBag.height)  
    console.log('helloMan')      
}
function drawMoneyBag(moneyBag){
    ctx.drawImage(money, moneyBag.x, moneyBag.y, moneyBag.width, moneyBag.height)        
}

function drawBombs(bombi){
    ctx.drawImage(bombImage,bombi.x,bombi.y,bombi.width,bombi.height);
}

function drawLives(){
    for(let i=0;i<3;i++){
        ctx.drawImage(liveimage,370+i*60,15,50,40);
    }
}

function drawScoreBoard(){
    ctx.font = '30px Arial'
    ctx.fillText('Score : '+score,20,40)
}

function draw (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(emptyBag);
    drawLives()
    drawEmptyMoneyBag(emptyBag);
    console.log('hello')
    drawScoreBoard();
    drawBags();
    for(let i =0; i<bombsArr.length;i++){
        drawBombs(bombsArr[i]);
        
        bombsArr[i].moveDown();
        bombsArr[i].checkCollision();
        if(bombsArr[i].y == 190 ){
            bombsArr.push({
                x: Math.floor(Math.random()*500),
                y: 10,
                width: 50,
                height :50,
                moveDown : function(){
                    this.y += moneyBagSpeed;
                },
                checkCollision : function(){
                    if(this.y+60>canvas.height-emptyBag.height && this.x>emptyBag.x && this.x<emptyBag.x+emptyBag.width){
                        ctx.drawImage(explosionImage,this.x,this.y+25,60,60)
                        this.y += NaN;
                        score++;
                    }
                }
            })
        }

    }
    drawScoreBoard()

}

function drawBags(){
    for(let i = 0; i<moneyBagArr.length;i++){
        drawMoneyBag(moneyBagArr[i]);
        moneyBagArr[i].moveDown();
        moneyBagArr[i].checkCollision();
        //console.log(i)
        console.log(moneyBagArr[i].y)
        if(moneyBagArr[i].y ===180){
            console.log('hello')
             moneyBagArr.push({
                 x: Math.floor(Math.random()*500),
                 y : 10,
                 width : 60,
                 height  : 60,
                 moveDown : function(){
                     this.y += moneyBagSpeed;
                 },
                 checkCollision : function(){
                     if(this.y+60>canvas.height-emptyBag.height && this.x>emptyBag.x && this.x<emptyBag.x+emptyBag.width){
                         this.y += NaN;
                         score++;
                     }
                 }
             })
         }
 
     }
}

let interval = setInterval(function(){
    draw();
},20) 
                   
/*if(moneyBagArr.length==3 && !speedBool){
        moneyBagSpeed=moneyBagSpeed+2;
        //console.log('hello')
        speedBool = true;
    }*/