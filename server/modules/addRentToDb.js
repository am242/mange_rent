const rentModel = require('../model/rentModel');

const addRent = (teacher_name, lesson, qty, class_name) => {
    let newRent = new rentModel({
        teacher_name: teacher_name,
        class: class_name,
        lesson: lesson,
        qty: qty
    })

    try {
        newRent.save(function(err) {
            if (err) {
                console.log(err);
            }
            console.log(` ${class_name} Created successfully`);
        });
    } catch (error) {
        console.log(error);
    }

}
exports.addRent = addRent;