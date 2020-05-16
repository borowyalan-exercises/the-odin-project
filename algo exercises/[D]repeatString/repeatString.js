const repeatString = function(str, num) {
    let newString = ''
    if(num < 0) return "ERROR"
    for (let index = 0; index < num; index++) {
        newString += str
    }
    return newString;
}

repeatString("try", 7);

module.exports = repeatString
