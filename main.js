boids = [];
let slider1, slider2, slider3, button;

function reset() {
  boids.splice(0, boids.length);
  for(i=0; i<100; i++) boids.push(new Boid());  
}

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT); 
  cnv.center();

  link = createA('http://www.red3d.com/cwr/boids/', "Craig Reynolds' Boids page", "_blank");
  link.position(0, cnv.y + HEIGHT + 10, 'fixed');
  link.center("horizontal");
  
  slider1 = select("#cohesion");
  slider2 = select("#alignment");
  slider3 = select("#separation");
  button = select("#reset");
  button.mousePressed(reset);
  
  reset();
}

function draw() {
  background("lightGray");
  
  for(let boid of boids){
    //boid.flock(boids);
    boid.optimizedFlock(boids);
  }
  for(let boid of boids){
    boid.update();
    boid.show();
  }
  
}