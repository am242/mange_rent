const express = require('express');
const app = express();
var cors = require('cors');
const port = 3001;
const rentModel = require('./model/rentModel.js');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const mongoose = require('mongoose');
try {
    mongoose.connect(
        "mongodb+srv://arielma:Ammaam123@amcluster-i2aqg.mongodb.net/rents_computers?retryWrites=true&w=majority", {
            collection: "rents_computers"
        }
    );

    mongoose.connection.on("error", () => {
        throw new Error(`unable to connect to database`);
    });
    mongoose.connection.on("connected", () => {
        console.log(`Connected to database:`);
    });

} catch (error) {
    console.log(error)
}


const agendaDay = [{
    houer: "09:00 - 10:00",
    name: "David",
    qty: 20
}, {
    houer: "13:00 - 14:00",
    name: "Issac",
    qty: 20
}, {
    houer: "11:00 - 12:00",
    name: "Israel",
    qty: 20
}];
app.post('/getDayAgenda', async(req, res) => {
    console.log(req.body)
    const result = await rentModel.find({
        date_rent: req.body.date,
        lesson: req.body.hour
    });
    res.send(result)
});
app.post('/getDayAgendaByDate', async(req, res) => {
    const dateArray = req.body.date.split("/");
    const dateReq = new Date(Number(dateArray[2]), Number(dateArray[1]), Number(dateArray[0]));
    console.log(dateReq);

    const result = await rentModel.find({
        date_rent: dateReq

    });
    console.log(result)
    res.send(result);

});
app.post('/addRentNew', async(req, res) => {
    console.log(req.body.date_input, req.body.hour, req.body.teacher_select, req.body.hour, req.body.grade);
    const result = await rentModel.findOne({
        date_rent: req.body.date_input,
        lesson: req.body.hour,
        teacher_name: req.body.teacher_select
    });
    console.log(result);
    if (result) {
        result.qty += Number(req.body.comp_qty);
        await result.save();
        res.send('added sucsessful!!')
    } else {
        let rentResult = new rentModel({
            teacher_name: req.body.teacher_select,
            lesson: req.body.hour,
            qty: req.body.comp_qty,
            date_rent: req.body.date_input,
            class: req.body.grade
        });

        rentResult.save()
            .then(doc => {
                console.log(doc)
            })
            .catch(err => {
                console.error(err)
            })
        res.send(rentResult);
    }

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))