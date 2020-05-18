const vibrate = () => window.navigator.vibrate(5);

const getLastValue = (array) => array[array.length - 1];

const endsWithOperator = (displayValue) =>
  getLastValue(displayValue) !== 0 && !parseFloat(getLastValue(displayValue));
