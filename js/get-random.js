'use strict';
(function () {
  window.getRandom = {
    getRandomArray: function (arr) {
      var newArr = arr.slice(0);
      for (var i = newArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
      }
      return newArr;
    },
    getLineRandom: function (arrLine) {
      var line = [];
      var count;
      count = Math.floor(Math.random() * arrLine.length + 1);
      for (var m = 0; m < count; m++) {
        line[m] = arrLine[m];
      }
      return line;
    }
  };
})();
