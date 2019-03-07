//---------------------------------------------------------------------------------------
// drawPac
// Draws Pac-Man at (x,y)
//---------------------------------------------------------------------------------------
function drawPac(x, y, mouth) {
  debuggingOutput("Erasing Pac at (" + pacX + "," + pacY + "); redrawing at (" + x + "," + y + ")");
  erasePac(pacX, pacY);

  pacX = x;
  pacY = y;

  ctx.fillStyle = pacColor;
  
  ctx.translate(pacX, pacY);
  
  if (mouth === down)
    ctx.rotate(1.571);
  else if (mouth === left)
    ctx.rotate(3.142);
  else if (mouth === up)
    ctx.rotate(4.712);

  ctx.beginPath();
  ctx.arc(0, 0, pacDiameter, onePiFour, sevenPieFour, false)
  ctx.lineTo(0,0);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

//---------------------------------------------------------------------------------------
// erasePac
// Erases Pac-Man at (x,y)
//---------------------------------------------------------------------------------------
function erasePac(x, y) {
  ctx.fillStyle = 'white';
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
    moveGhost(up);
  }
  else if (event.keyCode === down) {
    moveGhost(down);
  }
  else if (event.keyCode === right) {
    moveGhost(right);
  }
  else if (event.keyCode === left) {
    moveGhost(left);
  }
});

x = Math.floor(Math.random()*((maxCharacterX-15)-(minCharacterX+16))+minCharacterX+15);
y = Math.floor(Math.random()*((maxCharacterY+15)-(minCharacterY+16))+minCharacterY+15);
drawPac(x, y, left);

