const axios = require("axios");

//Method to send class details from client to server 
const createClass = (tutorId, studentId, startTime, endTime, classFeePerHour, discountRate = 0) => {

    axios({
            method: 'post',
            url: 'http://localhost:8080/createClass',
            data: {
                tutor_id: tutorId,
                student_id: studentId,
                start_time: startTime,
                end_time: endTime,
                class_fee_per_hour: classFeePerHour,
                discount_rate: discountRate
            },

        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
};

//createClass(6179433, 1427377, new Date("2021-01-20T16:00:00Z"), new Date("2021-01-20T18:00:00Z"), 500, 17.3);