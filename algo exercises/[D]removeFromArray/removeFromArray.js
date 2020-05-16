const removeFromArray = function (arr, ...nums) {
  let newArray = arr;
  nums.forEach((argument) => {
    newArray = newArray.filter((element) => {
      return element != argument;
    });
  });
  return newArray;
};

module.exports = removeFromArray;

// expect(removeFromArray([1, 2, 3, 4], 3)).toEqual([1, 2, 4]);
