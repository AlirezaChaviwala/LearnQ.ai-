const mongoose = require('mongoose');
const castAggregation = require('mongoose-cast-aggregation');

mongoose.plugin(castAggregation);

const tutorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
})

const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
})


const classSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    tutor_id: {
        type: Number,
        required: true,
    },
    student_id: {
        type: Number,
        required: true,
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    class_fee_per_hour: {
        type: Number,
        required: true
    },
    discount_rate: {
        type: Number,
        required: true
    }
})



// UserSchema.pre('save', async function(next) {
//     try {
//         let salt = await bcrypt.genSalt(10);
//         let hash = await bcrypt.hash(this.password, salt);
//         this.password = hash;
//         next();
//     } catch (err) {
//         next(err);
//     }
// })

// UserSchema.methods.verifyPassword = async function(password) {
//     try {
//         return await bcrypt.compare(password, this.password);
//     } catch (err) {
//         throw err
//     }
// }


const Tutor = mongoose.model('tutors', tutorSchema);
const Student = mongoose.model('students', studentSchema);
const Class = mongoose.model('class-records', classSchema);

module.exports = { Tutor, Student, Class };