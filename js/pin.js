'use strict';
(function () {
  window.getSimilarTemplate = function (template, arrayTemplate, list) {
    var mapPin = template.content.querySelector('.map__pin');
    for (var o = 0; o < arrayTemplate.length; o++) {
      var templateMapPin = mapPin.cloneNode(true);
      templateMapPin.style.left = arrayTemplate[o].location.x - window.initialData.WIDTH_PIN_ADS / 2 + 'px';
      templateMapPin.style.top = arrayTemplate[o].location.y - window.initialData.HEIGHT_PIN_ADS + 'px';
      templateMapPin.firstElementChild.src = arrayTemplate[o].author.avatar;
      templateMapPin.firstElementChild.alt = arrayTemplate[o].offer.title;
      list.appendChild(templateMapPin);
    }
  };
})();
