const { groupById } = require("./groupById");

//Method to generate single invoice Object
const generateInvoiceObject = (obj, startTime, endTime) => {
    let tempId = Number(Object.keys(obj)[0]);
    let invoiceObj = {
        tutor_details: {
            tutor_id: tempId,
            tutor_name: `${obj[Object.keys(obj)[0]][0].tutor_details[0].first_name} ${obj[Object.keys(obj)[0]][0].tutor_details[0].last_name}`
        },
        time_period: `${new Date(startTime)} to ${new Date(endTime)}`,
        classes: [],
        total_amount_payable: 0
    };

    let objectArray = groupById(obj[tempId], 'student_id');
    let totalHours = 0;
    let totalAmount = 0;
    let size = objectArray.length;
    for (let y = 0; y < objectArray.length; y++) {
        for (let x = 0; x < objectArray[y][Object.keys(objectArray[y])[0]].length; x++) {
            let temp2 = Object.keys(objectArray[y])[0];
            let tuitionHours = (Math.abs(new Date(objectArray[y][temp2][x].end_time).getTime() - new Date(objectArray[y][temp2][x].start_time).getTime())) / (60 * 60 * 1000);
            totalHours += tuitionHours;
            totalAmount += (objectArray[y][temp2][x].class_fee_per_hour) * (1 - (objectArray[y][temp2][x].discount_rate / 100)) * tuitionHours;
            invoiceObj.classes[y] = {
                student_name: `${objectArray[y][temp2][x].student_details[0].first_name} ${objectArray[y][temp2][x].student_details[0].last_name}`,
                total_tuition_hours: totalHours,
                calculated_amount: totalAmount
            };
            invoiceObj.total_amount_payable = (invoiceObj.classes[y].calculated_amount) * (0.92);

        }
    }

    return invoiceObj;
}

module.exports = {
    generateInvoiceObject
}