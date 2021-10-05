const { generateInvoiceObject } = require("./helpers/generateInvoiceObject");
const { getClassRecord } = require("./helpers/getClassRecord");
const { groupById } = require("./helpers/groupById");


//Generate tutorInvoice with optional tutorId
const getTutorInvoices = async(startTime, endTime, tutorId = undefined) => {
    let invoiceArray = [];
    let tutorArray = [];
    let resultArray = [];
    try {
        resultArray = await getClassRecord(startTime, endTime, tutorId);
        tutorArray = groupById(resultArray, 'tutor_id');

        for (let k = 0; k < tutorArray.length; k++) {
            invoiceArray[k] = generateInvoiceObject(tutorArray[k], startTime, endTime);
        }

        return invoiceArray;

    } catch (error) {
        console.log(error);
    }
};
let tutorInvoice = [];
let InvoicePromise = getTutorInvoices(new Date("2021-01-15T10:00:00Z"), new Date("2021-01-17T12:00:00Z"), 8040704);
InvoicePromise.then(invoice => {
    tutorInvoice = [...invoice]
    console.log(tutorInvoice);
});
//console.log(getTutorInvoices(new Date("2021-01-15T10:00:00Z"), new Date("2021-01-17T12:00:00Z"), 8040704));
//getTutorInvoices(new Date("2021-01-15T10:00:00Z"), new Date("2021-01-17T12:00:00Z"), 8040704)


//SAmple O/P
// [
//     {
//       tutor_details: { tutor_id: 8040704, tutor_name: 'HC Verma' },
//       time_period: 'Fri Jan 15 2021 15:30:00 GMT+0530 (India Standard Time) to Sun Jan 17 2021 17:30:00 GMT+0530 (India Standard Time)',
//       classes: [ [Object] ],
//       total_amount_payable: 680.8000000000001
//     }
//   ]
//   [
//     {
//       student_name: 'Arihant Shukla',
//       total_tuition_hours: 4,        
//       calculated_amount: 740
//     }
//   ]


module.exports = {
    getTutorInvoices
};