'use strict';
(function () {
  var listPin = document.querySelector('.map__pins');
  var listMap = document.querySelector('.map');
  // отрисовка карточки товара //
  var getTypeRoom = function (arrayType) {
    var typeRoom;
    if (arrayType === 'flat') {
      typeRoom = 'Квартира';
    } else if (arrayType === 'bungalo') {
      typeRoom = 'Бунгало';
    } else if (arrayType === 'house') {
      typeRoom = 'Дом';
    } else if (arrayType === 'palace') {
      typeRoom = 'Дворец';
    }
    return typeRoom;
  };

  var getOtherPhoto = function (templateForPhoto, arrayPhoto) {
    var templateDescriptionPhoto;
    templateDescriptionPhoto = templateForPhoto.querySelector('.popup__photos');
    templateDescriptionPhoto.querySelector('.popup__photo').src = arrayPhoto[0];
    for (var x = 1; x < arrayPhoto.length; x++) {
      var templatePhoto = templateDescriptionPhoto.querySelector('.popup__photo').cloneNode(true);
      templatePhoto.src = arrayPhoto[x];
      templateDescriptionPhoto.appendChild(templatePhoto);
    }
  };

  var getAllFeatures = function (templateForFeatures, arrayFeatures) {
    var templateDescriptionFeatures;
    var templateLiElement;
    templateDescriptionFeatures = templateForFeatures.querySelector('.popup__features');
    var liElement = templateDescriptionFeatures.querySelector('.popup__feature');
    liElement.classList.remove('popup__feature--wifi');
    while (templateDescriptionFeatures.firstChild) {
      templateDescriptionFeatures.removeChild(templateDescriptionFeatures.firstChild);
    }
    for (var z = 0; z < arrayFeatures.length; z++) {
      templateLiElement = liElement.cloneNode(true);
      templateLiElement.classList.add('popup__feature--' + arrayFeatures[z]);
      templateDescriptionFeatures.appendChild(templateLiElement);
    }
  };

  var getSimilarDescTemplateOnce = function (templateDesc, arrayTemplateDesc, listDesc) {
    var mapDesc = templateDesc.content.querySelector('.map__card');
    var typeAd;
    var templateDescription = mapDesc.cloneNode(true);
    templateDescription.querySelector('.popup__title').textContent = arrayTemplateDesc.offer.title;
    templateDescription.querySelector('.popup__text--address').textContent = arrayTemplateDesc.offer.address;
    templateDescription.querySelector('.popup__text--price').textContent = arrayTemplateDesc.offer.price + ' р/ночь';
    typeAd = getTypeRoom(arrayTemplateDesc.offer.type);
    templateDescription.querySelector('.popup__type').textContent = typeAd;
    templateDescription.querySelector('.popup__text--capacity').textContent = arrayTemplateDesc.offer.rooms + ' комнаты для ' + arrayTemplateDesc.offer.guests + ' гостей';
    templateDescription.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayTemplateDesc.offer.checkin + ', выезд до ' + arrayTemplateDesc.offer.checkout;
    templateDescription.querySelector('.popup__description').textContent = arrayTemplateDesc.offer.description;
    getOtherPhoto(templateDescription, arrayTemplateDesc.offer.photos);
    getAllFeatures(templateDescription, arrayTemplateDesc.offer.features);
    templateDescription.querySelector('.popup__avatar').src = arrayTemplateDesc.author.avatar;
    listDesc.appendChild(templateDescription);
  };

  var listPinClickHandle = function (clickEvt) {
    if (clickEvt.target.className === 'map__pin') {
      var srcImg = clickEvt.target.querySelector('img').getAttribute('src');
      for (var p = 0; p < window.similarAdsAll.length; p++) {
        if (srcImg === window.similarAdsAll[p].author.avatar) {
          getSimilarDescTemplateOnce(document.querySelector('template'), window.similarAdsAll[p], listMap);
        }
      }
    }
  };

  listPin.addEventListener('click', listPinClickHandle, true);
})();
