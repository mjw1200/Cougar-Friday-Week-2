var canvas = $("#canvas")[0]; // document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}

// ---------- The game board
// roundedRect(ctx, 12, 12, 150, 150, 15);
// roundedRect(ctx, 19, 19, 150, 150, 9);
// roundedRect(ctx, 53, 53, 49, 33, 10);
// roundedRect(ctx, 53, 119, 49, 16, 6);
// roundedRect(ctx, 135, 53, 49, 33, 10);
// roundedRect(ctx, 135, 119, 25, 49, 10);

// ---------- Dots and Pac-Man
// ctx.beginPath();
// ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
// ctx.lineTo(31, 37);
// ctx.fill();

// for (var i = 0; i < 8; i++) {
//   ctx.fillRect(51 + i * 16, 35, 4, 4);
// }

// for (i = 0; i < 6; i++) {
//   ctx.fillRect(115, 51 + i * 16, 4, 4);
// }

// for (i = 0; i < 8; i++) {
//   ctx.fillRect(51 + i * 16, 99, 4, 4);
// }

//-----------------------------------------------------------------------------
// eraseGhost
// Erase a basic ghost, with the lower-left corner at (x,y)
//-----------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------
// drawGhost
// Draws a basic ghost, with the lower-left corner at (x,y)
//-----------------------------------------------------------------------------
function drawGhost(x, y) {
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

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(x+18, y-14, 2, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x+6, y-14, 2, 0, Math.PI * 2, true);
  ctx.fill();
}

drawGhost(50, 100);