'use strict';
var listPin = document.querySelector('.map__pins');
var listMap = document.querySelector('.map');
var map = document.querySelector('.map__pin--main'); // обработка события активации страницы
var flagValidPictureMap = false; // Флаг использую, чтобы повторно не отрисовывать карту
var formActivation = document.querySelector('form.ad-form');

var mapMouseDownHandle = function (mouseDownEvt) {
  mouseDownEvt.preventDefault();
  var startCoordinates = {
    x: mouseDownEvt.clientX,
    y: mouseDownEvt.clientY
  };
  var flagMove = false;

  var mapMouseMoveHandle = function (mouseMoveEvt) {
    flagMove = true;
    document.querySelector('.map').classList.remove('map--faded');
    formActivation.classList.remove('ad-form--disabled');
    var endCoordinates = {
      x: startCoordinates.x - mouseMoveEvt.clientX,
      y: startCoordinates.y - mouseMoveEvt.clientY
    };
    var coordinatYLimit = map.offsetTop + window.initialData.HEIGHT_PIN + window.initialData.HEIGTH_SHARP_END - endCoordinates.y;
    var coordinatXLimit = map.offsetLeft - endCoordinates.x;
    if (coordinatYLimit < window.initialData.MIN_LOCATION_Y) {
      map.style.top = (window.initialData.MIN_LOCATION_Y - window.initialData.HEIGHT_PIN - window.initialData.HEIGTH_SHARP_END) + 'px';
    } else if (coordinatYLimit > window.initialData.MAX_LOCATION_Y) {
      map.style.top = (window.initialData.MAX_LOCATION_Y - window.initialData.WIDTH_PIN - window.initialData.HEIGTH_SHARP_END) + 'px';
    } else {
      map.style.top = (map.offsetTop - endCoordinates.y) + 'px';
    }
    if (coordinatXLimit <= 0) {
      map.style.left = 0 + 'px';
    } else if (coordinatXLimit + window.initialData.WIDTH_PIN >= listMap.offsetWidth) {
      map.style.left = coordinatXLimit + window.initialData.WIDTH_PIN;
    } else {
      map.style.left = (coordinatXLimit) + 'px';
    }
    startCoordinates.x = mouseMoveEvt.clientX;
    startCoordinates.y = mouseMoveEvt.clientY;
  };

  var getPositionPin = function () {
    var positionX = parseInt(map.style.left, 10) + window.initialData.WIDTH_PIN / 2;
    var positionY = parseInt(map.style.top, 10) + window.initialData.HEIGHT_PIN + window.initialData.HEIGTH_SHARP_END;
    document.querySelector('#address').value = positionX + ', ' + positionY;
  };

  var errorHandle = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandle = function (adsInfo) {
    window.similarAdsAll = adsInfo;
    window.getSimilarTemplate(document.querySelector('template'), window.similarAdsAll, listPin);
  };

  // Собите активации карты
  var mapMouseUoHandler = function () {
    if (!flagValidPictureMap) {
      flagValidPictureMap = true;
      if (!flagMove) {
        document.querySelector('.map').classList.remove('map--faded');
        formActivation.classList.remove('ad-form--disabled');
      }
      var formActivationFieldsets = formActivation.querySelectorAll('fieldset');
      for (var m = 0; m < formActivationFieldsets.length; m++) {
        formActivationFieldsets[m].removeAttribute('disabled');
      }
      getPositionPin();
      window.backend.load(successHandle, errorHandle);
    }
    map.removeEventListener('mousemove', mapMouseMoveHandle);
    map.removeEventListener('mouseup', mapMouseUoHandler);
  };
  map.addEventListener('mousemove', mapMouseMoveHandle);
  map.addEventListener('mouseup', mapMouseUoHandler);
};

// События
map.addEventListener('mousedown', mapMouseDownHandle);

