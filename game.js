Math.radians = function (degrees) {
  return (degrees * Math.PI) / 180;
};

// Convert from radians to degrees.
Math.degrees = function (radians) {
  return (radians * 180) / Math.PI;
};
CheckResolution = 3;
draw2d = true;
class rect {
  x = 0;
  y = 0;
  color = Math.floor(Math.random() * 16777215).toString(16);
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  drawrect() {
    context.fillRect(this.x / 5, this.y / 5, 50 / 5, 50 / 5);
  }
}
rects = [];
rects.push(new rect(300, 300));

class ray {
  x = 0;
  y = 0;
  endx = 0;
  endy = 0;
  angle = 0;
  len = 0;
  lastgoodlen = null;
  currX = 0;
  currY = 0;
  lenIshouldDrawAt = [];
  finalen = 534534;
  id = 0;
  collidedWith = 0;
  precos = 0;
  presin = 0;

  constructor(x, y, angle, len) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.len = len;
    this.currX = this.x;
    this.currY = this.y;
  }
  cast() {
    this.precos = Math.cos(this.angle);
    this.presin = Math.sin(this.angle);
    this.endy = this.y + this.finalen * this.presin;
    this.endx = this.x + this.finalen * this.precos;

    //Math.pow(this.endy,2)+Math.pow(this.length,2))
  }
  checkcollisions() {
    this.collidedWith = 538583;
    this.finalen = 45535525;
    for (let j = 0; j < rects.length; j++) {
      this.lenIshouldDrawAt[j] = 0;
      this.currX = this.x;
      this.currY = this.y;
      let minlen = 646564;
      for (let i = 0; i < this.len / CheckResolution; i++) {
        if (
          areColliding(
            this.currX,
            this.currY,
            5,
            5,
            rects[j].x + 5,
            rects[j].y + 5,
            45,
            45
          )
        ) {
          minlen = this.lenIshouldDrawAt[j];
          break;
        } else {
          this.currX += CheckResolution * this.precos;
          this.currY += CheckResolution * this.presin;
          if (this.lenIshouldDrawAt[j] < this.len) {
            this.lenIshouldDrawAt[j] += CheckResolution;
          }
        }
      }
      if (this.lenIshouldDrawAt[j] < this.finalen) {
        this.finalen = this.lenIshouldDrawAt[j];
        this.collidedWith = j;
      }
    }
  }
  draw() {
    context.beginPath();
    context.moveTo(this.x / 5, this.y / 5);
    context.lineTo(this.endx / 5, this.endy / 5);
    context.stroke();
  }
  drawRect() {
    context.fillStyle = "#" + rects[this.collidedWith].color;
    //  console.log(this.collidedWith);
    if (this.finalen - 2 != this.len) {
      context.fillRect(200 + this.id * 3, 100, 3, 60000 / this.finalen);
    }

    context.fillStyle = "white";
  }
}
rays = [];
for (i = 0; i < 60 * 5; i++) {
  rays[i] = new ray(mouseX, mouseY, Math.radians(i / 5), 1000);
  rays[i].id = i;
}

function update() {}
function draw() {
  if (isKeyPressed[68] == 1) {
    for (i = 0; i < rays.length; i++) {
      rays[i].angle += 0.03;
    }
  }
  if (isKeyPressed[65] == 1) {
    for (i = 0; i < rays.length; i++) {
      rays[i].angle -= 0.03;
    }
  }
  if (isKeyPressed[87] == 1 || isKeyPressed[83]) {
    for (i = 0; i < rays.length; i++) {
      presin = Math.sin(rays[rays.length / 2].angle);
      precos = Math.cos(rays[rays.length / 2].angle);

      if (isKeyPressed[83]) {
        rays[i].x -= 5 * precos;
        rays[i].y -= 5 * presin;
      } else {
        rays[i].x += 5 * precos;
        rays[i].y += 5 * presin;
      }
    }
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, 1280, 1270);

  context.fillStyle = "white";

  context.strokeStyle = "yellow";
  //context.fillRect(200, 300, 800, 400);

  for (i = 0; i < rays.length; i++) {
    rays[i].drawRect();

    //	rays[i].len=0}
    //	for(i=0;i<rays.length;i++){
    //		for(j=0;j<300;j++){
    //		while(rays[i].len<j && !rays[i].checkcollisions()){
    //		rays[i].len+=1}
    //		}

    //while(!rays[i].checkcollisions() && rays[i]<300){
    //	rays[i].length++
    //}
    //	if(!rays[i].checkcollisions()){
    //		rays[i].length=300
    //	}
    //	rays[i].length=0
    //	for(j=0;j<300;j+=1){
    //		if(!rays[i].checkcollisions()){
    //			rays[i].length=j;
    //		}
    //	}
    // rays[i].x = mouseX;
    // rays[i].y = mouseY;
    rays[i].checkcollisions();

    rays[i].cast();
    if (draw2d) rays[i].draw();
  }

  for (i = 0; i < rects.length; i++) {
    context.fillStyle = "#" + rects[i].color;
    if (draw2d) rects[i].drawrect();
  }
}
function keyup(key) {
  console.log(key);
  if (key == 32) {
    rects.push(new rect(mouseX * 5, mouseY * 5));
  }
}
