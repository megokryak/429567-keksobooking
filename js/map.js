var ad = [];
var adTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var adType = ['palace', 'flat', 'house', 'bungalo'];

for (var i = 0; i < 8; i++) {
  ad[i] = {
    avatar: 'img/avatars/user0' + i + '.png';
    offer: adTitle[i],
    address: Math.floor(Math.random() * 100) + ', ' + Math.floor(Math.random()*100),
    price: Math.floor(Math.random() * (1000000 - 1000) + 1000)),
    type: adType[Math.floor(Math.random() * (3-0) + 0)],

}
