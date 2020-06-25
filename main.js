var model = {};
var view = {};
var handlers = {};

model.state = {
  imgSrcs: ['images/banner_large.jpg', 'images/img.png', 'images/duck.jpg'],
  numImgs: 0,
  transitionSpeed: 500,
  imgTransSpeed: 5000
};

model.next = function () {
  var imgSrcs = model.state.imgSrcs;
  var i = model.state.numImgs % imgSrcs.length;

  view.drawImg(model.state.imgSrcs[i]);
  view.colorDot(i);
  model.state.numImgs += 1;
};

model.previous = function () {
  var imgSrcs = model.state.imgSrcs;
  var i = model.state.numImgs % imgSrcs.length;

  if (model.state.numImgs < 0) {
    i += imgSrcs.length;
    i %= imgSrcs.length;
  }

  view.drawImg(model.state.imgSrcs[i]);
  view.colorDot(i);
  model.state.numImgs -= 1;
};

view.drawDots = function () {
  var i;
  var imgSrcs = model.state.imgSrcs;
  var $nav = $('#nav');
  var $dots = $(document.createDocumentFragment());
  var dot;
  for (i = 0; i < imgSrcs.length; i += 1) {
    dot = $('<li><div class="dots"></div></li>');
    dot.attr('id', i);
    dot.css({ "margin-right": "3rem" });
    $dots.append(dot);
  }
  $nav.append($dots);
  $('#' + (imgSrcs.length - 1)).css({ "margin-right": 0 });
};

view.drawImg = function (src) {
  var transSpeed = model.state.transitionSpeed;
  $('#carousel-wrapper').css({ "background-image": "url(" + src + ")" }).hide().fadeIn(transSpeed);
};

view.colorDot = function (i) {
  $('.dots').removeClass('active');
  $('#' + i + ' .dots').addClass('active');
};

handlers.mouseOnArrows = function () {
  var drawArrows = function () {
    $('.arrows i').fadeIn(500);
  };
  var hideArrows = function () {
    $('.arrows i').fadeOut(400);
  };

  hideArrows();
  $('#carousel-wrapper').on('mouseleave', hideArrows);
  $('.arrows').on('mouseover', drawArrows);
};

handlers.imgSlide = function () {
  var imgTransSpeed = model.state.imgTransSpeed;
  model.next();
  setInterval(model.next, imgTransSpeed);
};

handlers.clickDot = function () {
  var dotClicked = function (e) {
    model.state.numImgs = parseInt(e.target.parentNode.id, 10);
    view.drawImg(model.state.imgSrcs[model.state.numImgs]);
    view.colorDot(model.state.numImgs);
  };

  $('#nav .dots').on('click', dotClicked);
};

handlers.clickNext = function () {
  $('#right i').on('click', model.next);
};

handlers.clickPrev = function () {
  $('#left i').on('click', model.previous);
};

$(document).ready(function () {
  view.drawDots();
  handlers.mouseOnArrows();
  handlers.imgSlide();
  handlers.clickNext();
  handlers.clickPrev();
  handlers.clickDot();
});