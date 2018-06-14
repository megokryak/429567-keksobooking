'use strict';
var COL_ELEMENT_ARRAY = 8;

var similarAds = [];
var adTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adType = ['palace', 'flat', 'house', 'bungalo'];
var adCheckin = ['12:00', '13:00', '14:00'];
var adCheckout = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var listPin = document.querySelector('.map__pins');
var listMap = document.querySelector('.map');

var getRandomArray = function (arr) {
  var j;
  var temp;
  for (var k = arr.length - 1; k > 0; k--) {
    j = Math.floor(Math.random() * (k + 1));
    temp = arr[j];
    arr[j] = arr[k];
    arr[k] = temp;
  }
  return arr;
};

var getLineRandom = function (arrLine) {
  var line = [];
  var count;
  count = Math.floor(Math.random() * arrLine.length + 1);
  for (var m = 0; m < count; m++) {
    line[m] = arrLine[m];
  }
  return line;
};

var getSimilarArray = function (colElementArray) {
  var randomArrayFeatures = getRandomArray(adFeatures);
  var lineFuetures = getLineRandom(randomArrayFeatures);
  var randomArrayPhotos = getRandomArray(adPhotos);


  for (var i = 0; i < colElementArray; i++) {
    var locationX = Math.floor(Math.random() * (900 - 300) + 300);
    var locationY = Math.floor(Math.random() * (630 - 130) + 130);
    var element = i + 1;
    similarAds[i] = {
      author: {
        avatar: 'img/avatars/user0' + element + '.png'
      },
      offer: {
        title: adTitle[i],
        address: locationX + ', ' + locationY,
        price: Math.floor(Math.random() * (1000000 - 1000) + 1000),
        type: adType[Math.floor(Math.random() * 3)],
        rooms: Math.floor(Math.random() * (5 - 1) + 1),
        guests: Math.floor(Math.random() * (5 - 1) + 1),
        checkin: adCheckin[Math.floor(Math.random() * 2)],
        checkout: adCheckout[Math.floor(Math.random() * 2)],
        features: lineFuetures,
        description: '',
        photos: randomArrayPhotos
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
};

var getSimilarTemplate = function (template, arrayTemplate, list) {
  var mapPin = template.content.querySelector('.map__pin');
  for (var o = 0; o < arrayTemplate.length; o++) {
    var templateMapPin = mapPin.cloneNode(true);
    templateMapPin.style.left = arrayTemplate[o].location.x - 25 + 'px';
    templateMapPin.style.top = arrayTemplate[o].location.y - 70 + 'px';
    templateMapPin.firstElementChild.src = arrayTemplate[o].author.avatar;
    templateMapPin.firstElementChild.alt = arrayTemplate[o].offer.title;
    list.appendChild(templateMapPin);
  }
};

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

var getSimilarDescTemplate = function (templateDesc, arrayTemplateDesc, listDesc) {
  var mapDesc = templateDesc.content.querySelector('.map__card');
  var typeAd;
  for (var l = 0; l < arrayTemplateDesc.length; l++) {
    var templateDescription = mapDesc.cloneNode(true);
    templateDescription.querySelector('.popup__title').textContent = arrayTemplateDesc[l].offer.title;
    templateDescription.querySelector('.popup__text--address').textContent = arrayTemplateDesc[l].offer.address;
    templateDescription.querySelector('.popup__text--price').textContent = arrayTemplateDesc[l].offer.price + ' р/ночь';
    typeAd = getTypeRoom(arrayTemplateDesc[l].offer.type);
    templateDescription.querySelector('.popup__type').textContent = typeAd;
    templateDescription.querySelector('.popup__text--capacity').textContent = arrayTemplateDesc[l].offer.rooms + ' комнаты для ' + arrayTemplateDesc[l].offer.guests + ' гостей';
    templateDescription.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayTemplateDesc[l].offer.checkin + ', выезд до ' + arrayTemplateDesc[l].offer.checkout;
    templateDescription.querySelector('.popup__description').textContent = arrayTemplateDesc[l].offer.description;
    getOtherPhoto(templateDescription, arrayTemplateDesc[l].offer.photos);
    getAllFeatures(templateDescription, arrayTemplateDesc[l].offer.features);
    templateDescription.querySelector('.popup__avatar').src = arrayTemplateDesc[l].author.avatar;
    listDesc.appendChild(templateDescription);
  }
};

getSimilarArray(COL_ELEMENT_ARRAY);
document.querySelector('.map').classList.remove('map--faded');
getSimilarTemplate(document.querySelector('template'), similarAds, listPin);
getSimilarDescTemplate(document.querySelector('template'), similarAds, listMap);
