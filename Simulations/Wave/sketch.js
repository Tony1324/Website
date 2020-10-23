var p = [];
var pp = [];
var v = [];
var a = [];
var s = 5;
var p1 = 0;
var p2 = 0;
var s1 = 1;

function setup(){
	createCanvas(windowWidth,windowHeight);
	for(let i = 0; i<width;i+=s){
		p[i] = 0;
		pp[i] = 0;
		v[i] = 0;
		a[i] = 0;
	}
}

function draw(){
	background(255);
	translate(0,height/2);
	strokeWeight(3);

	for(let i = 0; i<width;i+=s){

		if(i!=0&&i<width-s){
			v[i]+=(p[i]-pp[i-s])/-10
			v[i]+=(p[i]-pp[i+s])/-10
			
		}

		p[i]+=v[i]*10/s;

		if(mouseIsPressed&&i!=0&&i<width-s){
			let amount = pow(1.001,-pow((i-round(mouseX/s)*s+s/2)/s1,2))*(mouseY-height/2-p[i]*s1)/3/s1;

			if(amount!=undefined){p[i]+=amount}
		}

		if(keyIsDown(32)){v[i]*=0.9}
		if(i==0){p[i] = p1}
		if(i>=width-s){p[i] = p2}

		line(i-s,p[i-s],i,p[i]);
		//strokeWeight(s)
		//point(i,p[i])

	}

	for(let i = 0; i<width;i+=s){
		pp[i] = p[i]
	}

	if(keyIsDown(37)){p1-=2}
	if(keyIsDown(39)){p1+=2}
	if(keyIsDown(40)){p2+=2}
	if(keyIsDown(38)){p2-=2}	


}