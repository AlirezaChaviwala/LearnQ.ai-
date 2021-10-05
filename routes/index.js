var express = require("express");
var router = express.Router();

const { ObjectId } = require("mongodb");
const createError = require("http-errors");
//const { tutorIdArray, studentIdArray, classIdArray } = require('../helpers/randomNumberArray');
var randomNumGen = require("random-number");
var options = {
    min: 1000000,
    max: 9999999,
    integer: true,
};

const {
    tutorAuthSchema,
    studentAuthSchema,
    classAuthSchema,
    getClassRecordsAuthSchema,
} = require("../helpers/validation_schema");
const { Tutor, Student, Class } = require("../Models/Data.model");

/* GET home page. */
router.get("/", async(req, res, next) => {
    try {
        res.send(200);
    } catch (error) {
        console.log(error);
    }
});

//API end point to add tutors to DB
router.post("/addTutor", async(req, res, next) => {
    try {
        //Validates the tutor data sent by client in req.body
        const validCred = await tutorAuthSchema.validateAsync(req.body);

        //Checks in tutors collection in DB for exisiting record with same email
        let doesExist = await Tutor.findOne({ email: validCred.email });

        //If record exists, throws Conflict (409) error to avoid record duplication in DB
        if (doesExist)
            throw createError.Conflict(
                `Tutor with email:${validCred.email} has already been registered`
            );

        let tutor = new Tutor(validCred); //create new Tutor instance
        tutor.id = randomNumGen(options); //Add id to tutor instance
        await tutor.save(); //save tutor record in DB

        res.status(200).send({ message: "Tutor added successfully" });
    } catch (error) {
        //If tutorAuthSchema validation failed, throw Unprocessable entity(422) error
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
});

//API end point to add students to DB
router.post("/addStudent", async(req, res, next) => {
    try {
        //Validates the student data sent by client in req.body
        const validCred = await studentAuthSchema.validateAsync(req.body);

        //Checks in students collection in DB for exisiting record with same email
        let doesExist = await Student.findOne({ email: validCred.email });

        //If record exists, throws Conflict (409) error to avoid record duplication in DB
        if (doesExist)
            throw createError.Conflict(
                `Student with email:${validCred.email} has already been registered`
            );

        let student = new Student(validCred); //create new Student instance
        student.id = randomNumGen(options); //Add id to student instance
        await student.save(); //save student record in DB

        res.status(200).send({ message: "Student added successfully" });
    } catch (error) {
        //If studentAuthSchema validation failed, throw Unprocessable entity(422) error
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
});

//API end point to add classes to DB
router.post("/createClass", async(req, res, next) => {
    try {
        //Validates the class data sent by client in req.body
        const validCred = await classAuthSchema.validateAsync(req.body);

        //Checks in class-records collection in DB for exisiting record with same tutor,student and timing details
        let doesExist = await Class.findOne({
            tutor_id: validCred.tutor_id,
            student_id: validCred.student_id,
            start_time: new Date(validCred.start_time),
        });
        console.log(doesExist);
        //If record exists, throws Conflict (409) error to avoid record duplication in DB
        if (doesExist !== null)
            throw createError.Conflict(
                `Class at ${new Date(validCred.start_time)} has already been scheduled`
            );

        //Caste both time stamps into ISO format for querying purpose
        validCred.start_time = new Date(validCred.start_time);
        validCred.end_time = new Date(validCred.end_time);

        let newClass = new Class(validCred); //create new Class instance
        newClass.id = randomNumGen(options); //Add id to class instance
        await newClass.save(); //save student record in DB

        res.status(200).send({ message: "Class scheduled successfully" });
    } catch (error) {
        //If classAuthSchema validation failed, throw Unprocessable entity(422) error
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
});

//API end point to get class records from DB
router.get("/getClassRecords", async(req, res, next) => {
    try {
        //Validates the class data sent by client in req.body
        const validCred = await getClassRecordsAuthSchema.validateAsync(req.body);

        //Query for DB with start time stamp
        let queryString = {
            start_time: { $gte: new Date(validCred.start_time) },
        };

        //Checks in class-records collection in DB for classes fulfilling query filter
        let doesExist = await Class.find(queryString);

        //if no such class exist, send Not Found(404) response
        if (doesExist.length === 0) {
            res.status(404).send({ message: "No such class found" });
        } else {
            queryString = [{
                $lookup: {
                    from: Tutor.collection.name,
                    localField: "tutor_id",
                    foreignField: "id",
                    as: "tutor_details",
                },
            }, {
                $lookup: {
                    from: Student.collection.name,
                    localField: "student_id",
                    foreignField: "id",
                    as: "student_details",
                }
            }];

            //If optional tutor id provided by client, query for classes of given tutor only
            if (req.query.tutorId) {
                queryString.splice(0, 0, { $match: { tutor_id: req.query.tutorId } });
            }

            console.log(queryString);

            //Checks in class-records collection in DB for classes fulfilling query filter
            let recordResult = await Class.aggregate(queryString);
            res.status(200).send(recordResult);
        }
    } catch (error) {
        //If getClassRecordsAuthSchema validation failed, throw Unprocessable entity(422) error
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
});

module.exports = router;