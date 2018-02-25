'use strict';

var COUNT = 700;
var WIND = 10;

var canvas = document.querySelector('#field');
var ctx = canvas.getContext('2d');

var FieldSize = {
  WIDTH: 800,
  HEIGHT: 600
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Snowflake() {
  this.reset();
}

function renderSnowflake(snow) {
  clearSnowflake();

  snow.forEach(function (it) {
    it.render();
    it.update();
  });

  requestAnimationFrame(function () {
    renderSnowflake(snow);
  })
}

function clearSnowflake() {
  ctx.clearRect(0, 0, FieldSize.WIDTH, FieldSize.HEIGHT);
}

Snowflake.prototype.reset = function () {
  this.x = getRandomNumber(-FieldSize.WIDTH * 3, FieldSize.WIDTH * 3);
  this.y = getRandomNumber(0, -FieldSize.HEIGHT);
  this.size = getRandomNumber(1, 6);
};

Snowflake.prototype.render = function () {
  ctx.beginPath();
  ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, Math.PI * 2, false);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.closePath();
};

Snowflake.prototype.isOffScreen = function () {
  return this.y > FieldSize.HEIGHT + this.size || this.x > FieldSize.WIDTH + this.size || this.x < + -this.size;
};

Snowflake.prototype.update = function () {
  this.x += -this.size / WIND;
  this.y += this.size;

  if(this.isOffScreen()) {
    this.reset();
  }
};

function setup() {
  var snow =  new Array(COUNT).fill('').map(function () {
    return new Snowflake();
  });

  renderSnowflake(snow);
}
setup();
