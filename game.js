let canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d')
ctx.fillStyle = 'border:2px solid black';
var img = new Image();
var money = new Image();
img.src ='emptyMoney.jpg';
money.src = 'moneybag.jpg'

var emptyBag = {
    x : 10,
    y: 500,
    width : 100,
    height : 100,

    moveLeft : function(){
        this.x -= 40;
    } ,

    moveRight : function(){
        this.x +=40;
    }



}


var moneyBag = {
    x: 300,
    y : 10,
    width : 100,
    height  : 100,
    moveDown : function(){
        this.y += 2;
    }
}
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
    ctx.drawImage(img, emptyBag.x, emptyBag.y, 100, 100)        
}
function drawMoneyBag(moneyBag){
    ctx.drawImage(money, moneyBag.x, moneyBag.y, moneyBag.width, moneyBag.height)        
}
function draw (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEmptyMoneyBag(emptyBag);
    drawMoneyBag(moneyBag);
    moneyBag.moveDown();
}

interval = setInterval(() => {
    draw();
},20)