var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");

canvas.focus();

var characterSpeed = 5;
var ghostY = 100;
var ghostX = 50;
var pacY = 100;
var pacX = 50;

//--------------------------------------------------------------------------------------
// eraseGhost
// Erases a 28x28 pixel ghost, whose lower-left corner is at (x,y)
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
//---------------------------------------------------------------------------------------
function eraseGhost(x,y) {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x+28, y);
  ctx.lineTo(x+28, y-28);
  ctx.lineTo(x, y-28);
  ctx.lineTo(x,y);
  ctx.fill();
}

//---------------------------------------------------------------------------------------
// drawGhost
// Draws a 28x28 pixel ghost, whose lower-left corner is at (x,y)
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
//---------------------------------------------------------------------------------------
function drawGhost(x, y, eyes) {
  var eyeX = 0;
  var eyeY = 0;
  
  eraseGhost(ghostX, ghostY);

  x = rangeCheckX(x);
  y = rangeCheckY(y);

  ghostX = x;
  ghostY = y;

  // Ghost body
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y-4);
  ctx.bezierCurveTo(x,y-22, x+6,y-28,x+14,y-28);
  ctx.bezierCurveTo(x+22,y-28,x+28,y-22,x+28,y-14);
  ctx.lineTo(x+28, y);
  ctx.lineTo(x+23.333,y-4.667);
  ctx.lineTo(x+18.666, y);
  ctx.lineTo(x+14,y-4.667);
  ctx.lineTo(x+9.333, y);
  ctx.lineTo(x+4.666, y-4.667);
  ctx.lineTo(x, y);
  ctx.fill();

  // Whites of eyes
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(x+8, y-20);
  ctx.bezierCurveTo(x+5,y-20,x+4,y-17,x+4,y-15);
  ctx.bezierCurveTo(x+4,y-13,x+5,y-10,x+8,y-10);
  ctx.bezierCurveTo(x+11,y-10,x+12,y-13,x+12,y-15);
  ctx.bezierCurveTo(x+12,y-17,x+11,y-20,x+8,y-20);
  ctx.moveTo(x+20, y-20);
  ctx.bezierCurveTo(x+17,y-20,x+16,y-17,x+16,y-15);
  ctx.bezierCurveTo(x+16,y-13,x+17,y-10,x+20,y-10);
  ctx.bezierCurveTo(x+23,y-10,x+24,y-13,x+24,y-15);
  ctx.bezierCurveTo(x+24,y-17,x+23,y-20,x+20,y-20);
  ctx.fill();

  // Pupils
  ctx.fillStyle = 'black';

  // Right
  ctx.beginPath();
  if (eyes === up) {
    eyeX = x+20;
    eyeY = y-18;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Right pupil, looking up: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === down) {
    eyeX = x+20;
    eyeY = y-12;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Right pupil, looking down: (" + eyeX + "," + eyeY + ")");
  }
  if (eyes === left || eyes === undefined) {
    eyeX = x+18;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Right pupil, looking left: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === right) {
    eyeX = x+22;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Right pupil, looking right: (" + eyeX + "," + eyeY + ")");
  }
  ctx.fill();

  // Left pupil
  ctx.beginPath();
  if (eyes === up) {
    eyeX = x+8;
    eyeY = y-18;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Left pupil, looking up: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === down) {
    eyeX = x+8;
    eyeY = y-12;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Left pupil, looking down: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === left || eyes === undefined) {
    eyeX = x+6;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Left pupil, looking left: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === right) {
    eyeX = x+10;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    debuggingOutput("Left pupil, looking right: (" + eyeX + "," + eyeY + ")");
  }
  ctx.fill();

  canvas.focus();
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
// drawPac
// Draws Pac-Man at (x,y)
//---------------------------------------------------------------------------------------
function drawPac(x, y, mouth) {
  debuggingOutput("Erasing Pac at (" + pacX + "," + pacY + "); redrawing at (" + x + "," + y + ")");
  erasePac(pacX, pacY);

  pacX = x;
  pacY = y;

  ctx.fillStyle = 'black';
  ctx.beginPath();

  if (mouth === right || mouth === undefined) {
    ctx.arc(x, y, pacDiameter, onePiFour, sevenPieFour, false)
  }
  else if (mouth === down) {
    ctx.arc(x, y, pacDiameter, threePieFour, onePiFour, false)
  }
  else if (mouth === left) {
    ctx.arc(x, y, pacDiameter, fivePieFour, threePieFour, false)
  }
  else if (mouth === up) {
    ctx.arc(x, y, pacDiameter, sevenPieFour, fivePieFour, false)
  }

  ctx.lineTo(x,y);
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
// moveGhost
// Moves a ghost up, down, left, or right by "speed" pixels
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
//---------------------------------------------------------------------------------------
function moveGhost(direction) {
  debuggingOutput("Moving ghost " + spellDirection(direction) + " from (" + ghostX + "," + ghostY + ")");

  var eyes = 0;
  var x = ghostX;
  var y = ghostY;

  if (direction === up) {
    if (y-characterSpeed >= minCharacterY) {
      y -= characterSpeed;
      eyes = up;
    }
  }
  else if (direction === down) {
    if (y+characterSpeed <= maxCharacterY) {
      y += characterSpeed;
      eyes = down;
    }
  }
  else if (direction === right) {
    if (x+characterSpeed <= maxCharacterX) {
      x += characterSpeed;
      eyes = right;
    }
  }
  else if (direction === left) {
    if (x-characterSpeed >= minCharacterX) {
      x -= characterSpeed;
      eyes = left;
    }
  }

  if (eyes !== 0) {
    drawGhost(x, y, eyes);
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

// drawGhost(ghostX, ghostY, left);

// function roundedRect(ctx, x, y, width, height, radius) {
//   ctx.beginPath();
//   ctx.moveTo(x, y + radius);
//   ctx.lineTo(x, y + height - radius);
//   ctx.arcTo(x, y + height, x + radius, y + height, radius);
//   ctx.lineTo(x + width - radius, y + height);
//   ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
//   ctx.lineTo(x + width, y + radius);
//   ctx.arcTo(x + width, y, x + width - radius, y, radius);
//   ctx.lineTo(x + radius, y);
//   ctx.arcTo(x, y, x, y + radius, radius);
//   ctx.stroke();
// }

// ---------- The game board
// roundedRect(ctx, 12, 12, 150, 150, 15);
// roundedRect(ctx, 19, 19, 150, 150, 9);
// roundedRect(ctx, 53, 53, 49, 33, 10);
// roundedRect(ctx, 53, 119, 49, 16, 6);
// roundedRect(ctx, 135, 53, 49, 33, 10);
// roundedRect(ctx, 135, 119, 25, 49, 10);

// ---------- Dots
// for (var i = 0; i < 8; i++) {
//   ctx.fillRect(51 + i * 16, 35, 4, 4);
// }

// for (i = 0; i < 6; i++) {
//   ctx.fillRect(115, 51 + i * 16, 4, 4);
// }

// for (i = 0; i < 8; i++) {
//   ctx.fillRect(51 + i * 16, 99, 4, 4);
// }


