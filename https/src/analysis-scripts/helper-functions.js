// TODO: Array functions dynamic length
function _combineTwoArrays (arrayOne, arrayTwo) {
  if(!arrayOne || !arrayTwo) return;
  var combinedArray = arrayOne.map((a, i) => Number(a) + Number(arrayTwo[i]));
  
  return combinedArray;
}

function _combineThreeArrays (arrayOne, arrayTwo, arrayThree) {
  if(!arrayOne || !arrayTwo) return;
  var combinedArray = arrayOne.map((a, i) => Number(a) + Number(arrayTwo[i]) + Number(arrayThree[i]));
  
  return combinedArray;
}

function _combineFiveArrays (arrayOne, arrayTwo, arrayThree, arrayFour, arrayFive) {
  if(!arrayOne || !arrayTwo || !arrayThree || !arrayFour || !arrayFive) return console.log(arrayOne, arrayTwo, arrayThree, arrayFour, arrayFive);
  var combinedArray = arrayOne.map((a, i) => Number(a) + Number(arrayTwo[i]) + Number(arrayThree[i]) + Number(arrayFour[i]) + Number(arrayFive[i]));
  
  return combinedArray;
}

function _combineSevenArrays (arrayOne, arrayTwo, arrayThree, arrayFour, arrayFive,arraySix,arraySeven) {
  if(!arrayOne || !arrayTwo || !arrayThree || !arrayFour || !arrayFive) return;
  var combinedArray = arrayOne.map((a, i) => Number(a) + Number(arrayTwo[i]) + Number(arrayThree[i]) + Number(arrayFour[i]) + Number(arrayFive[i]) + Number(arraySix[i]) + Number(arraySeven[i]));
  
  return combinedArray;
}

function _fillArrayWithSameNumber(number, length) {
  var filledArray = [];
  for (i = 0; i < length; i++) {
    filledArray.push(number);
  }
  return filledArray;
}

