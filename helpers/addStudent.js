const axios = require("axios");

//Method to send student details from client to server 
const addStudent = (firstName, lastName, email) => {
    axios({
            method: 'post',
            url: 'http://localhost:8080/addStudent',
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
            },

        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
};

//addStudent("Arihant", "Shukla", "arihantshukla@gmail.com");