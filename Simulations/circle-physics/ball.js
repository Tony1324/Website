class ball{
    constructor(i){
        this.p = p5.Vector.random2D().mult(random(200));
        this.v = p5.Vector.random2D().mult(random(1));
        this.a = createVector(0,0.1);
        this.index = i;
    }

    show(){
        strokeWeight(size);
        point(this.p.x,this.p.y);

    }

    move(){
        this.v.add(p5.Vector.mult(this.a,dt));
        this.p.add(p5.Vector.mult(this.v,dt));
        this.v.limit(10)
    }

    walls(){
        if(this.p.x>(width-size)/2||this.p.x<-(width-size)/2){
            this.v.x *=-1;
            this.p.x = constrain(this.p.x,-(width-size)/2,(width-size)/2);
        }

        if(this.p.y>(height-size)/2||this.p.y<-(height-size)/2){
            this.v.y *=-1;
            this.p.y = constrain(this.p.y,-(height-size)/2,(height-size)/2);
        }

    }

    collide(){
        this.d = createVector(0,0);
        this.dist = 0;
        this.v1 = 0;
        this.v2 = 0;
        /*for(let i = 0; i < balls.length; i++){
            this.d = p5.Vector.sub(balls[i].p,this.p);
            this.dist = this.d.mag();
            if(this.dist<size){
                this.d.normalize();
                this.correction = size-this.dist;
                this.p.sub(p5.Vector.mult(this.d,this.correction/2));
                balls[i].p.add(p5.Vector.mult(this.d,this.correction/2));
                this.v1 = this.d.dot(this.v);
                this.v2 = this.d.dot(balls[i].v);
                this.d.mult(this.v1-this.v2)
                this.v.sub(this.d);
                balls[i].v.add(this.d);

            }
        }*/
        for(let i = round(this.p.x/bsize)*bsize-bsize; i<=round(this.p.x/bsize)*bsize+bsize; i+=bsize){
            for(let j = round(this.p.y/bsize)*bsize-bsize; j<=round(this.p.y/bsize)*bsize+bsize; j+=bsize){
                if(j>-height/2&&j<height/2&&i>-width/2&&i<width/2){
                    for(let k = 0; k<box[i][j].length;k++){
                        this.d = p5.Vector.sub(balls[box[i][j][k]].p,this.p);
                        this.dist = this.d.mag();
                        if(this.dist<size){
                            this.d.normalize();
                            this.correction = size-this.dist;
                            this.p.sub(p5.Vector.mult(this.d,this.correction/2));
                            balls[box[i][j][k]].p.add(p5.Vector.mult(this.d,this.correction/2));
                            this.v1 = this.d.dot(this.v);
                            this.v2 = this.d.dot(balls[box[i][j][k]].v);
                            this.d.mult(this.v1-this.v2)
                            this.v.sub(p5.Vector.mult(this.d,bounce));
                            balls[box[i][j][k]].v.add(p5.Vector.mult(this.d,bounce));
                        }
                    }
                }
            }
        }

    }





}