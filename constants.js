const debugging = true;

const left = 37;
const up = 38;
const right = 39;
const down = 40;
const minCharacterX = 0;
const maxCharacterX = 1175;
const minCharacterY = 25;
const maxCharacterY = 550;
const pacDiameter = 13;

const onePiFour = Math.PI/4;
const threePieFour = 3*onePiFour; // 3*(Math.PI/4)
const fivePieFour = 5*onePiFour;  // 5*(Math.PI/4)
const sevenPieFour = 7*onePiFour; // 7*(Math.PI/4)

var characterSpeed = 10;
var ghostY = 100;
var ghostX = 50;
var pacY = 100;
var pacX = 50;

var pacColor = 'black';
var collision = false;
