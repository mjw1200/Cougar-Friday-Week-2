const debugging = false;

const left = 37;
const up = 38;
const right = 39;
const down = 40;
const pacRadius = 20;
const pacDiameter = pacRadius*2;
const minCharacterX = pacRadius;
const maxCharacterX = 1208-pacRadius;
const minCharacterY = pacRadius-5;
const maxCharacterY = 555-pacRadius;

const closeInterval = Math.PI/8;
const bottomJaw = Math.PI/4;
const topJaw = 7*Math.PI/4;

var characterSpeed = 10;
var ghostY = 100;
var ghostX = 50;
var pacY = 100;
var pacX = 50;
var counter = 0;
var pacMouthDirection = right;

var pacColor = 'FFFD38';
var collision = false;
