
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    updatedAt: Date,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model("City", citySchema, "cities")

// let c1 = new City({
//     name: "Paris",
//     updatedAt: "2019-04-11 09:45",
//     temperature: 6,
//     condition: "Sunny",
//     conditionPic: "//cdn.apixu.com/weather/64x64/day/113.png"
// })
// c1.save()


module.exports = City