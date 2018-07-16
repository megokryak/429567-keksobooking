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

  var formSubmitHandle = function () {
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#address').value = '0, 0';
    document.querySelector('#room_number').selectedIndex = 0;
    document.querySelector('#type').selectedIndex = 1;
    document.querySelector('#capacity').selectedIndex = 0;
    document.querySelector('#timein').selectedIndex = 0;
    document.querySelector('#timeout').selectedIndex = 1;
    document.querySelector('#feature-wifi').checked = false;
    document.querySelector('#feature-dishwasher').checked = false;
    document.querySelector('#feature-parking').checked = false;
    document.querySelector('#feature-washer').checked = false;
    document.querySelector('#feature-elevator').checked = false;
    document.querySelector('#feature-conditioner').checked = false;
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

  optionType.addEventListener('change', getValidOption);
  timeArrival.addEventListener('change', getValidTime);
  timeCheckOut.addEventListener('change', getValidTime);
  formActivation.addEventListener('change', getValidColGuests);
  formActivation.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formActivation), formSubmitHandle, errorHandle);
  });
})();
