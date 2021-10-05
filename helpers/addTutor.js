const axios = require("axios");

//Method to send tutor details from client to server 
const addTutor = (firstName, lastName, email) => {
    axios({
            method: 'post',
            url: 'http://localhost:8080/addTutor',
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

//addTutor("H C", "Verma", "hcverma@gmail.com");