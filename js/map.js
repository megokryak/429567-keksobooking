'use strict';
var COL_ELEMENT_ARRAY = 8;

var similarAds = [];
var adTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adType = ['palace', 'flat', 'house', 'bungalo'];
var adCheckin = ['12:00', '13:00', '14:00'];
var adCheckout = ['12:00', '13:00', '14:00'];
var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

var getLineRandom = function (arrLine, random) {
  var line = '';
  var count;
  if (random) {
    count = Math.floor(Math.random() * arrLine.length + 1);
  } else {
    count = arrLine.length;
  }
  for (var m = 0; m < count; m++) {
    if (m === count - 1) {
      line += arrLine[m];
    } else {
      line += arrLine[m] + ', ';
    }
  }
  return line;
};

var getSimilarArray = function (colElementArray) {
  var randomArrayFeatures = getRandomArray(adFeatures);
  var lineFuetures = getLineRandom(randomArrayFeatures, true);
  var randomArrayPhotos = getRandomArray(adPhotos);
  var linePhotos = getLineRandom(randomArrayPhotos, false);


  for (var i = 0; i < colElementArray; i++) {
    var locationX = Math.floor(Math.random() * (900 - 300) + 300);
    var locationY = Math.floor(Math.random() * (630 - 130) + 130);

    similarAds[i] = {
      avatar: 'img/avatars/user0' + i + '.png',
      offer: adTitle[i],
      address: locationX + ', ' + locationY,
      price: Math.floor(Math.random() * (1000000 - 1000) + 1000),
      type: adType[Math.floor(Math.random() * 3)],
      rooms: Math.floor(Math.random() * (5 - 1) + 1),
      guests: Math.floor(Math.random() * (5 - 1) + 1),
      checkin: adCheckin[Math.floor(Math.random() * 2)],
      checkout: adCheckout[Math.floor(Math.random() * 2)],
      features: lineFuetures,
      description: '',
      photos: linePhotos,
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
};

getSimilarArray(COL_ELEMENT_ARRAY);
document.querySelector('.map').classList.remove('map--faded');
