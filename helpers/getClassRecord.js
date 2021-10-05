const axios = require("axios");

//Method to fetch class records for given time stamps and optional tutorId
const getClassRecord = async(startTime, endTime, tutorId = undefined) => {
    let URL = 'http://localhost:8080/getClassRecords';
    let resultArray = [];
    if (tutorId !== undefined) {
        URL += `?tutorId=${tutorId}`

    }
    try {
        let response = await axios({
            method: 'get',
            url: URL,
            data: {
                start_time: startTime,
            }

        });
        for (let x of response.data) {
            if (new Date(x.end_time).getTime() <= endTime.getTime()) {
                resultArray.push(x);
            }
        }
        return resultArray;
    } catch (error) {
        console.log(error);
    }
};

//getClassRecord(new Date("2021-01-15T10:00:00Z"), new Date("2021-01-17T12:00:00Z"), 8040704);

module.exports = { getClassRecord };