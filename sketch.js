// day–night cycle
let timeCycle = 16000;
function getTimeProgress() {
  let phase = (millis() % timeCycle) / timeCycle;
  return phase < 0.5 ? map(phase, 0, 0.5, 1, 0) : map(phase, 0.5, 1, 0, 1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  drawSky();

  drawWater();

  drawBridge();

  drawBGPeople();

  drawScreamingPeople();
}

function drawSky() {
  let t = getTimeProgress();

  for (let i = 0; i < height * 0.4; i += 15) {
    let wave = sin(i * 0.05) * 50;
    let wave2 = cos(i * 0.08) * 30;

    // original warm colour base
    let baseR = 255 - i * 0.2 + sin(i * 0.1) * 20;
    let baseG = 150 + i * 0.3 + cos(i * 0.15) * 15;
    let baseB = 0;

    // night deep blue
    let nightR = 20, nightG = 40, nightB = 120;

    let r = lerp(nightR, baseR, t);
    let g = lerp(nightG, baseG, t);
    let b = lerp(nightB, baseB, t);

    fill(r, g, b, 180);
    noStroke();

    for (let x = 0; x < width; x += 5) {
      let y =
        i +
        sin(x * 0.01 + i * 0.05) * 30 +
        sin(x * 0.02 + i * 0.1) * 20 +
        wave +
        wave2;

      rect(x, y, 5, 20);
    }
  }
}

function drawWater() {
  let t = getTimeProgress();

  for (let i = height * 0.4; i < height * 0.7; i += 12) {
    let wave = sin(i * 0.1) * 40;
    let wave2 = cos(i * 0.15) * 30;

    // original day colour
    let dayR = 20 + sin(i * 0.2) * 10;
    let dayG = 30 + i * 0.3 + cos(i * 0.25) * 15;
    let dayB = 60 + i * 0.2 + sin(i * 0.3) * 20;

    // night ink green
    let nightR = 25, nightG = 55, nightB = 35;

    let r = lerp(nightR, dayR, t);
    let g = lerp(nightG, dayG, t);
    let b = lerp(nightB, dayB, t);

    fill(r, g, b, 160);
    noStroke();

    for (let x = 0; x < width; x += 3) {
      let y =
        i +
        sin(x * 0.02 + i * 0.1) * 25 +
        sin(x * 0.03 + i * 0.2) * 15 +
        cos(x * 0.015 + i * 0.12) * 10 +
        wave +
        wave2;

      rect(x, y, 3, height - y);
    }
  }
}


function getBridgeWhiteColor() {
  let t = getTimeProgress();
  return lerp(120, 255, t); 
}

function drawBridge() {
  // Bridge from left middle to bottom middle
  let startX = 0;
  let startY = height * 0.4;
  let endX = width * 0.8;
  let endY = height;
  
  // Calculate distance and angle
  let bridgeLength = dist(startX, startY, endX, endY);
  let angle = atan2(endY - startY, endX - startX);
  
  push();
  translate(startX, startY);
  rotate(angle);
  
  // Bridge surface
  fill(80, 40, 20, 200);
  noStroke();
  rect(10, 10, bridgeLength, 500);
  rect(-100, -50, bridgeLength + 300, 30);
  rect(-100, 50, bridgeLength + 300, 30);
  rect(-100, 150, bridgeLength + 300, 30);
  rect(-100, 250, bridgeLength + 300, 30);

  // Bridge railings
  stroke(100, 50, 30);
  strokeWeight(4);
  for (let x = 0; x < bridgeLength; x += 20) {
    line(x, 10, x, -20);
  }

  let bridgeWhite = getBridgeWhiteColor();
  fill(bridgeWhite);
  rect(-100, 100, bridgeLength + 300, 30);
  rect(-100, 200, bridgeLength + 300, 30);
  rect(-100, -40, bridgeLength + 300, 10);
  pop();
}


function drawBGPeople() {

  fill(20, 30, 50);
  noStroke();

  // First people
  let fig1X = width * 0.1;
  let fig1Y = height * 0.5 + (height * 0.5) * 0.2;
  ellipse(fig1X, fig1Y, 40, 80);
  ellipse(fig1X, fig1Y - 40, 30, 40); 
  ellipse(fig1X, fig1Y - 45, 50, 10); 
  ellipse(fig1X - 8, fig1Y + 40, 10, 60); 
  ellipse(fig1X + 6, fig1Y + 40, 10, 60); 
  
  // Second people
  let fig2X = width * 0.05;
  let fig2Y = height * 0.5 + (height * 0.5) * 0.1;
  ellipse(fig2X, fig2Y, 35, 75);
  ellipse(fig2X, fig2Y - 35, 28, 38);
  ellipse(fig2X, fig2Y - 40, 48, 8);
  ellipse(fig2X - 5, fig2Y + 35, 8, 50);
  ellipse(fig2X + 5, fig2Y + 35, 8, 50);
}


function drawWobblyRing(cx, cy, baseRad) {
  let steps = 180;
  let wobble = 8;
  let noiseScale = 0.6;

  let ox = map(noise(frameCount * 0.003, 0), 0, 1, -3, 3);
  let oy = map(noise(frameCount * 0.003, 10), 0, 1, -3, 3);

  beginShape();
  for (let i = 0; i <= steps; i++) {
    let a = (TWO_PI * i) / steps;

    let nx = cos(a) * noiseScale + frameCount * 0.005;
    let ny = sin(a) * noiseScale + frameCount * 0.005;
    let n = noise(nx, ny);

    let r = baseRad + map(n, 0, 1, -wobble, wobble);
    curveVertex(cx + ox + cos(a) * r, cy + oy + sin(a) * r);
  }
  endShape(CLOSE);
}

function drawScreamingPeople() {
  push();
  translate(width * 0.5, height * 0.85);

  // scream rings
  let t = getTimeProgress();
  let dayR = 80, nightR = 150;
  let base = lerp(nightR, dayR, t);

  let c1 = color(255, 200, 100, 150);
  let c2 = color(220, 140, 80, 220);
  let ringCol = lerpColor(c2, c1, t);

  stroke(ringCol);
  strokeWeight(3);
  noFill();

  let layers = 5;
  let gap = 20;
  for (let i = 0; i < layers; i++) {
    drawWobblyRing(0, -60, base + i * gap);
  }

  // Body
  fill(30, 40, 60);
  noStroke();
  ellipse(0, 20, 80, 200);

 // head
  let faceDay = [200, 220, 150];
  let faceNight = [60, 90, 70];
  let f = getCharacterColor(faceDay, faceNight);
  fill(f);
  ellipse(0, -60, 70, 90);

  // hands
  let handDay = [200, 220, 150];
  let handNight = [60, 90, 70];
  let h = getCharacterColor(handDay, handNight);
  fill(h);
  ellipse(-45, -75, 25, 40);
  ellipse(45, -75, 25, 40);
  
  // Eyes
  fill(20);
  ellipse(-15, -70, 12, 15);
  ellipse(15, -70, 12, 15);
  
  // Mouth
  fill(40, 30, 20);
  ellipse(0, -40, 35, 50);
  
  pop();
}

// colour interpolation for head/hands
function getCharacterColor(day, night) {
  let t = getTimeProgress();
  return color(
    lerp(night[0], day[0], t),
    lerp(night[1], day[1], t),
    lerp(night[2], day[2], t)
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}