var balls = [];
var n = 800;
var size = 25;
var dt = 1;
var box = [];
var bsize = size;
var bounce = 1;
function setup() {
    createCanvas(windowWidth,windowHeight);
    for (let i = 0; i < n; i++) {
        balls[i] = new ball();
    }

    for(let i = -width/2 - (bsize-(width/2)%bsize);i<width/2+bsize;i+=bsize){
        box[i] = [];
        for(let j = -height/2 - (bsize-(height/2)%bsize);j<height/2+bsize;j+=bsize){
            box[i][j] = [];
        }
    }
}

function draw(){
    background(255);
    translate(width/2,height/2)

    for(let i = -width/2 - (bsize-(width/2)%bsize);i<width/2+bsize;i+=bsize){
        for(let j = -height/2 - (bsize-(height/2)%bsize);j<height/2+bsize;j+=bsize){
            box[i][j].length = 0;
        }
    }


    //dt = 60/frameRate();

    for (let i = 0; i < n; i++) {
        balls[i].move();
        balls[i].walls();

        box[round(balls[i].p.x/bsize)*bsize][round(balls[i].p.y/bsize)*bsize].push(i);


        balls[i].collide();
        balls[i].show();

    }


}
