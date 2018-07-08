'use strict';
(function () {
  var optionType = document.querySelector('#type'); // измение при выборе типа жилья
  var timeArrival = document.querySelector('#timein');
  var timeCheckOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var colGuests = document.querySelector('#capacity');
  var formActivation = document.querySelector('form.ad-form');

  // ==========События=========== //

  // ======= События валидности формы ====== //
  var getValidOption = function () {
    var optionElement = document.querySelector('select#type');
    var optionSelectedIndex = optionElement.options.selectedIndex;
    var optionSelectedValue = optionElement.options[optionSelectedIndex].value;
    var priceRoom = document.querySelector('#price');
    if (optionSelectedValue === 'bungalo') {
      priceRoom.placeholder = window.initialData.MIN_PRICE_BUNGALO;
      priceRoom.min = window.initialData.MIN_PRICE_BUNGALO;
    } else if (optionSelectedValue === 'house') {
      priceRoom.placeholder = window.initialData.MIN_PRICE_HOUSE;
      priceRoom.min = window.initialData.MIN_PRICE_HOUSE;
    } else if (optionSelectedValue === 'flat') {
      priceRoom.placeholder = window.initialData.MIN_PRICE_FLAT;
      priceRoom.min = window.initialData.MIN_PRICE_FLAT;
    } else if (optionSelectedValue === 'palace') {
      priceRoom.placeholder = window.initialData.MIN_PRICE_PALACE;
      priceRoom.min = window.initialData.MIN_PRICE_PALACE;
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
    if (valueRoom === window.initialData.VALID_PALACE && colSelectedGuest !== window.initialData.NOT_GUESTS) {
      colGuests.setCustomValidity('Для выбранного варианта нельзя приглашать гостей');
    }
    if (valueRoom < colSelectedGuest) {
      colGuests.setCustomValidity('Для ' + valueRoom + ' комнат(ы) можно пригласить не более ' + valueRoom + ' гостей');
    }
    if (valueRoom !== window.initialData.VALID_PALACE && colSelectedGuest === window.initialData.NOT_GUESTS) {
      colGuests.setCustomValidity('Выберите кол-во гостей, так как этот вариант только для 100 комнат');
    }
  };
  optionType.addEventListener('change', getValidOption);
  timeArrival.addEventListener('change', getValidTime);
  timeCheckOut.addEventListener('change', getValidTime);
  formActivation.addEventListener('change', getValidColGuests);
})();
