const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    teacher_name: String,
    class: String,
    lesson: String,
    qty: Number,
    comments: [{ body: String, date: Date }],
    date_rent: { type: Date },
    return: Boolean,
});

const RentModel = mongoose.model("rent", rentSchema);

module.exports = RentModel;