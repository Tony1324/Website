function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("sketch")
}

var posX = -180
var posY = -100
var dirX = 1
var dirY = 1

var shapeStroke = 10

var mouseDrag = false;
function draw(){
    background(255);
    strokeWeight(shapeStroke)
    translate(width/2,height/2)
    fill(0,0,0,0)

    let shapes = [new Circle(25,-120,50), new Circle(-100, 140,120), new Rect(120,50,100,200)]
    for(let shape of shapes){
        shape.show()
    }

    if (keyIsDown(LEFT_ARROW)) {
        posX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        posX += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        posY -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        posY += 5;
    }

    let mouseVector = createVector(mouseX,mouseY)
    mouseVector.x -= width/2 + posX
    mouseVector.y -= height/2 + posY
    if (mouseIsPressed) {
            mouseDrag = true
            posX=mouseX - width/2
            posY=mouseY - height/2
    }else{
        mouseDrag = false
        if(mouseVector.x || mouseVector.y){
            dirX=mouseVector.x
            dirY=mouseVector.y
        }
    }

    let dir = createVector(dirX,dirY).normalize()
    let current = createVector(posX,posY);
    strokeWeight(10)
    point(current.x, current.y)
    for(let i=0; i<500; i++){
        let step = dir.copy()

        let minDist = 500
        shapes.forEach((shape)=>{
            let dist = shape.dist(current.x, current.y)
            if(dist < minDist){
                minDist = dist
            }
        })
        
        strokeWeight(10)
        point(current.x, current.y)
        strokeWeight(2)
        ellipse(current.x,current.y, minDist * 2, minDist * 2)
        step.mult(minDist)
        strokeWeight(2)
        line(current.x,current.y, current.x + step.x, current.y + step.y)
        current.add(step)
    }

}

class Shape {
    constructor(x,y){
        this.pos = createVector(x,y)
    }
    show(){
        point(this.pos.x, this.pos.y);
    }

}

class Circle extends Shape {
    constructor(x,y,r){
        super(x,y)
        this.radius = r
    }
    show(){
        ellipse(this.pos.x,this.pos.y,this.radius * 2 - shapeStroke ,this.radius * 2 - shapeStroke)
    }
    dist(x,y){
        let temp = createVector(x,y)
        return p5.Vector.dist(this.pos, temp) - this.radius
    }
}

class Rect extends Shape {
    constructor(x,y,w,h){
        super(x,y)
        this.width = w
        this.height = h
    }
    show(){
        rect(this.pos.x + shapeStroke / 2,this.pos.y + shapeStroke / 2,this.width - shapeStroke,this.height - shapeStroke)
    }
    dist(x,y){
        let temp = createVector(x,y)
        var dx = Math.max(this.pos.x - temp.x, 0, temp.x - this.width - this.pos.x);
        var dy = Math.max(this.pos.y - temp.y, 0, temp.y - this.height - this.pos.y);
        return createVector(dx,dy).mag()
    }
}


window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
