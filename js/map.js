'use strict';
var COL_ELEMENT_ARRAY = 8;
var WIDTH_PIN = 65;
var HEIGHT_PIN = 65;
var HEIGTH_SHARP_END = 22;

var similarAds = [];
var adTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adType = ['palace', 'flat', 'house', 'bungalo'];
var adCheckin = ['12:00', '13:00', '14:00'];
var adCheckout = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var listPin = document.querySelector('.map__pins');
var listMap = document.querySelector('.map');
var map = document.querySelector('.map__pin--main'); // обработка события активации страницы
var flagValidPictureMap = false; // Флаг использую, чтобы повторно не отрисовывать карту
var optionType = document.querySelector('#type'); // измение при выборе типа жилья
var timeArrival = document.querySelector('#timein');
var timeCheckOut = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var colGuests = document.querySelector('#capacity');
var formActivation = document.querySelector('form.ad-form');

var getRandomArray = function (arr) {
  var newArr = arr.slice(0);
  for (var k = newArr.length - 1; k > 0; k--) {
    var j = Math.floor(Math.random() * (k + 1));
    var temp = newArr[k];
    newArr[k] = newArr[j];
    newArr[j] = temp;
  }
  return newArr;
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
  for (var i = 0; i < colElementArray; i++) {
    var randomArrayFeatures = getRandomArray(adFeatures);
    var lineFuetures = getLineRandom(randomArrayFeatures);
    var randomArrayPhotos = getRandomArray(adPhotos);
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

var getPositionPin = function () {
  var positionX = parseInt(map.style.left, 10) + WIDTH_PIN / 2;
  var positionY = parseInt(map.style.top, 10) + HEIGHT_PIN + HEIGTH_SHARP_END;
  document.querySelector('#address').value = positionX + ', ' + positionY;
};

// ==========События=========== //
// Событие вывода инфорамации
var getInfoAdHandler = function (clickEvt) {
  if (clickEvt.target.className === 'map__pin') {
    var srcImg = clickEvt.target.querySelector('img').getAttribute('src');
    for (var p = 0; p < similarAds.length; p++) {
      if (srcImg === similarAds[p].author.avatar) {
        getSimilarDescTemplateOnce(document.querySelector('template'), similarAds[p], listMap);
      }
    }
  }
};
// Собите активации карты
var activationMapHandler = function () {
  if (!flagValidPictureMap) {
    flagValidPictureMap = true;
    var formActivationFieldsets = formActivation.querySelectorAll('fieldset');
    document.querySelector('.map').classList.remove('map--faded');
    formActivation.classList.remove('ad-form--disabled');
    for (var m = 0; m < formActivationFieldsets.length; m++) {
      formActivationFieldsets[m].removeAttribute('disabled');
    }
    getPositionPin();
    getSimilarArray(COL_ELEMENT_ARRAY);
    getSimilarTemplate(document.querySelector('template'), similarAds, listPin);
  }
  listPin.addEventListener('click', getInfoAdHandler, true);
};

// ======= События валидности формы ====== //
var getValidOption = function () {
  var optionElement = document.querySelector('select#type');
  var optionSelectedIndex = optionElement.options.selectedIndex;
  var optionSelectedValue = optionElement.options[optionSelectedIndex].value;
  var priceRoom = document.querySelector('#price');
  if (optionSelectedValue === 'bungalo') {
    priceRoom.placeholder = '0';
    priceRoom.min = '0';
  } else if (optionSelectedValue === 'house') {
    priceRoom.placeholder = '5000';
    priceRoom.min = '5000';
  } else if (optionSelectedValue === 'flat') {
    priceRoom.placeholder = '1000';
    priceRoom.min = '1000';
  } else if (optionSelectedValue === 'palace') {
    priceRoom.placeholder = '10000';
    priceRoom.min = '10000';
  }
};

var getValidTime = function (timeEvt) {
  var timeElement = timeEvt.target.id;
  var timeElementIndex = timeEvt.target.options.selectedIndex;
  if (timeElement === 'timein') {
    timeCheckOut.options.selectedIndex = timeElementIndex;
  } else {
    timeArrival.options.selectedIndex = timeElementIndex;
  }
};

var getValidColGuests = function () {
  colGuests.setCustomValidity('');
  var valueRoom = parseInt(roomNumber.options[roomNumber.options.selectedIndex].value, 10);
  var colSelectedGuest = parseInt(colGuests.options[colGuests.options.selectedIndex].value, 10);
  if (valueRoom === 100 && colSelectedGuest !== 0) {
    colGuests.setCustomValidity('Для выбранного варианта нельзя приглашать');
  }
  if (valueRoom < colSelectedGuest) {
    colGuests.setCustomValidity('Для ' + valueRoom + ' комнат(ы) можно пригласить не более ' + valueRoom + ' гостей');
  }
  if (valueRoom !== 100 && colSelectedGuest === 0) {
    colGuests.setCustomValidity('Выберите кол-во гостей, так как этот вариант только для 100 комнат');
  }
};

// События
map.addEventListener('mouseup', activationMapHandler);
optionType.addEventListener('change', getValidOption);
timeArrival.addEventListener('change', getValidTime);
timeCheckOut.addEventListener('change', getValidTime);
formActivation.addEventListener('change', getValidColGuests);
