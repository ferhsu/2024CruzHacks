const express = require('express');
const mongoose = require('mongoose');
const Model = require('../models/model');
const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {
    Model.user.countDocuments({name:req.body.name}).then(async function (count){
        if (count > 0) {
            console.log("we already anotha one");
            if (req.body.echo) {
                const data = new Model.echo({
                    _id: new mongoose.Types.ObjectId,
                    name: req.body.name,
                    date: req.body.date,
                    echo: req.body.echo
                })
                try {
                    const dataToSave = await data.save();
                    res.status(200).json(dataToSave)
                }
                catch (error) {
                    res.status(400).json({message: error.message})
                }
            }
            else {
                res.status(301).json({"message": "we alreayd here"})
            }
        }
        else {
            const data = new Model.user({
                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
                startdate: req.body.startdate
            })
            try {
                const dataToSave = await data.save();
                res.status(200).json(dataToSave)
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        }
    });
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/calendar/:name', async (req, res) => {
    try{
        const data = await Model.echo.find({name : req.params.name}).select('date echo');
        const jason = {};
        data.forEach(async (j) => {
            if (!(jason[j['date'].getFullYear()])) {
                jason[j['date'].getFullYear()] = {};
                jason[j['date'].getFullYear()][j['date'].getMonth()+1] = {};
                jason[j['date'].getFullYear()][j['date'].getMonth()+1][j['date'].getDate()] = [j['echo']];
            }
            else if (!(jason[j['date'].getFullYear()][j['date'].getMonth()+1])) {
                jason[j['date'].getFullYear()][j['date'].getMonth()+1] = {};
                jason[j['date'].getFullYear()][j['date'].getMonth()+1][j['date'].getDate()] = [j['echo']];
            }
            else if (!(jason[j['date'].getFullYear()][j['date'].getMonth()+1][j['date'].getDate()])) {
                jason[j['date'].getFullYear()][j['date'].getMonth()+1][j['date'].getDate()] = [j['echo']];
            }
            else {
                jason[j['date'].getFullYear()][j['date'].getMonth()+1][j['date'].getDate()].push(j['echo']);
            }
        });
        console.log(jason);
        res.json(jason)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;