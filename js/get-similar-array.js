'use strict';
(function () {
  var similarAds = [];
  var adTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var adType = ['palace', 'flat', 'house', 'bungalo'];
  var adCheckin = ['12:00', '13:00', '14:00'];
  var adCheckout = ['12:00', '13:00', '14:00'];
  var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  window.getSimilarArray = function (colElementArray) {
    for (var i = 0; i < colElementArray; i++) {
      var randomArrayFeatures = window.getRandom.getRandomArray(adFeatures);
      var lineFuetures = window.getRandom.getLineRandom(randomArrayFeatures);
      var randomArrayPhotos = window.getRandom.getRandomArray(adPhotos);
      var locationX = Math.floor(Math.random() * (window.data.MAX_LOCATION_X - window.data.MIN_LOCATION_X) + window.data.MIN_LOCATION_X);
      var locationY = Math.floor(Math.random() * (window.data.MAX_LOCATION_Y - window.data.MIN_LOCATION_Y) + window.data.MIN_LOCATION_Y);
      var element = i + 1;
      window.similarAds[i] = {
        author: {
          avatar: 'img/avatars/user0' + element + '.png'
        },
        offer: {
          title: adTitle[i],
          address: locationX + ', ' + locationY,
          price: Math.floor(Math.random() * (window.data.MAX_PRICE - window.data.MIN_PRICE) + window.data.MIN_PRICE),
          type: adType[Math.floor(Math.random() * (adType.length - 1))],
          rooms: Math.floor(Math.random() * (window.data.MAX_ROOMS - window.data.MIN_ROOMS) + window.data.MIN_ROOMS),
          guests: Math.floor(Math.random() * (window.data.MAX_GUESTS - window.data.MIN_GUESTS) + window.data.MIN_GUESTS),
          checkin: adCheckin[Math.floor(Math.random() * (adCheckin.length - 1))],
          checkout: adCheckout[Math.floor(Math.random() * (adCheckout.length - 1))],
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
    return similarAds;
  };
})();
