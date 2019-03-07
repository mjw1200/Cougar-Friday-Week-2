//---------------------------------------------------------------------------------------
// drawPac
// Draws Pac-Man at (x,y)
//---------------------------------------------------------------------------------------
function drawPac(x, y, mouthDirection, mouthState) {
  debuggingOutput("Erasing Pac at (" + pacX + "," + pacY + "); redrawing at (" + x + "," + y + ")");
  erasePac(pacX, pacY);
  var actualBottomJaw = 0;
  var actualTopJaw = 0;
  pacX = x;
  pacY = y;
  pacMouthDirection = mouthDirection;

  ctx.fillStyle = 'black';
  ctx.fillRect(pacX-pacDiameter, pacY-pacDiameter, pacDiameter*2, pacDiameter*2);
  ctx.fillStyle = '#FFFD38';
  
  ctx.translate(pacX, pacY);
  
  if (mouthDirection === down)
    ctx.rotate(1.571);
  else if (mouthDirection === left)
    ctx.rotate(3.142);
  else if (mouthDirection === up)
    ctx.rotate(4.712);

  actualBottomJaw = bottomJaw;
  actualTopJaw = topJaw;

  if (mouthState === "half") {
    actualBottomJaw = bottomJaw - closeInterval;
    actualTopJaw = topJaw + closeInterval;
  }
  if (mouthState === "closed") {
    actualBottomJaw = bottomJaw - closeInterval*2;
    actualTopJaw = topJaw + closeInterval*2;
  }
      
  ctx.beginPath();
  ctx.arc(0, 0, pacDiameter, actualBottomJaw, actualTopJaw, false)
  ctx.lineTo(0,0);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

//---------------------------------------------------------------------------------------
// erasePac
// Erases Pac-Man at (x,y)
//---------------------------------------------------------------------------------------
function erasePac(x, y) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x-pacDiameter,y-pacDiameter);
  ctx.lineTo(x-pacDiameter, y+pacDiameter);
  ctx.lineTo(x+pacDiameter, y+pacDiameter);
  ctx.lineTo(x+pacDiameter, y-pacDiameter);
  ctx.fill();
}

//---------------------------------------------------------------------------------------
// movePac
// Moves Pac-Man up, down, left, or right by "speed" pixels
//---------------------------------------------------------------------------------------
function movePac(direction) {
  var mouth = 0;
  var x = pacX;
  var y = pacY;

  if (direction === up) {
    if (y-characterSpeed >= minCharacterY) {
      y -= characterSpeed;
      mouth = up;
    }
  }
  else if (direction === down) {
    if (y+characterSpeed <= maxCharacterY) {
      y += characterSpeed;
      mouth = down;
    }
  }
  else if (direction === right) {
    if (x+characterSpeed <= maxCharacterX) {
      x += characterSpeed;
      mouth = right;
    }
  }
  else if (direction === left) {
    if (x-characterSpeed >= minCharacterX) {
      x -= characterSpeed;
      mouth = left;
    }
  }

  if (mouth !== 0) {
    drawPac(x, y, mouth);
  }
}

//---------------------------------------------------------------------------------------
// Handle arrow key presses
//
// SGMS Cougar Friday students: this handler doesn't do anything. What changes would you
// make so that it does something useful? TODO: Strip this function before go-live.
//---------------------------------------------------------------------------------------
$("#canvas").keydown(function (event) {
  debuggingOutput("Keydown detected, keyCode is " + spellDirection(event.keyCode));

  if (event.keyCode === up) {
    movePac(up);
  }
  else if (event.keyCode === down) {
    movePac(down);
  }
  else if (event.keyCode === right) {
    movePac(right);
  }
  else if (event.keyCode === left) {
    movePac(left);
  }
});

x = Math.floor(Math.random()*((maxCharacterX-15)-(minCharacterX+16))+minCharacterX+15);
y = Math.floor(Math.random()*((maxCharacterY+15)-(minCharacterY+16))+minCharacterY+15);
drawPac(x, y, left);

setInterval(function() {
  var mouthstate = "open";
  counter++;
  if (counter % 4 === 0)
      mouthstate = "half";
  else if (counter % 4 === 1)
      mouthstate = "closed";
  else if (counter % 4 === 2)
      mouthstate = "half";
  else if (counter % 4 === 3)
      mouthstate = "open";
  
  drawPac(pacX, pacY, pacMouthDirection, mouthstate);
}, 150)

