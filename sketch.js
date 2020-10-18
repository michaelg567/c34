var ball;

var database,position;
function setup(){
    database=firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ball_Loc=database.ref('ball/position');
    ball_Loc.on("value",read_position,showerror)
}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            write_position(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            write_position(1,0);
        }
        else if(keyDown(UP_ARROW)){
            write_position(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            write_position(0,+1);
        }
        drawSprites();
    }
   
}

function  write_position(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function read_position(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y
}

function write_position(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}
function showerror(){
    console.log("error")
}
