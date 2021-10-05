//Method to organize records as per tutors/students depending on keyField ip
const groupById = (ArrayOfObjects, keyField) => {
    let idArray = [];
    let typeArray = [];

    ArrayOfObjects.forEach(element => {
        if (idArray.indexOf(element[keyField]) === -1) {
            idArray.push(element[keyField]);
        }
    });


    for (let j = 0; j < idArray.length; j++) {
        typeArray[j] = {};
        typeArray[j][idArray[j]] = [];
        for (let i = 0; i < ArrayOfObjects.length; i++) {
            if (ArrayOfObjects[i][keyField] === idArray[j]) {
                typeArray[idArray.indexOf(idArray[j])][idArray[j]].push(ArrayOfObjects[i]);
            }
        }
    }

    return typeArray;
}

module.exports = {
    groupById
}