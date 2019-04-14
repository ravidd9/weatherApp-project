const express = require('express')
const router = express.Router()
const request = require('request')
const mongoose = require('mongoose')
const City = require('../models/City')
const apikey = "84ee00dced304313b6175839191104"

router.get(`/city/:cityName`, function (req, res) {
    let cityName = req.params.cityName
    if (cityName) {
        request(`https://api.apixu.com/v1/current.json?key=${apikey}&q=${cityName}`, function (err, result) {
            let body = JSON.parse(result.body)
            if (body.location.name) {
                let newCity = new City({
                    name: body.location.name,
                    updatedAt: new Date(body.current.last_updated),
                    temperature: body.current.temp_c,
                    condition: body.current.condition.text,
                    conditionPic: body.current.condition.icon
                })
                res.send(newCity)
            }
        })
    }
})

router.put(`/city/:cityName`, function (req, res) {
    let cityName = req.params.cityName
    if (cityName) {
        request(`https://api.apixu.com/v1/current.json?key=${apikey}&q=${cityName}`, function (err, result) {
            let body = JSON.parse(result.body)
            if (body.location.name) {
                let newCity = new City({
                    name: body.location.name,
                    updatedAt: new Date(body.current.last_updated),
                    temperature: body.current.temp_c,
                    condition: body.current.condition.text,
                    conditionPic: body.current.condition.icon
                })
                console.log(newCity.updatedAt)
                City.findOneAndUpdate(
                    {name: cityName}, 
                    {updatedAt: body.current.last_updated,
                        temperature: body.current.temp_c,
                        condition: body.current.condition.text,
                        conditionPic: body.current.condition.icon},
                    {new: true}, 
                    function(err,res1){})
                res.send(newCity)
            }
        })
    }
})

router.get(`/cities`, function (req, res) {
    City.find({}).exec((err, cities) => {
        res.send(cities) //empty at first
    })
})

router.post(`/city`, function (req, res) {
    let body = req.body
    let city = new City(body)
    city.save()
})

router.delete(`/city/:cityName`, function (req, res) {
    let cityName = req.params.cityName
    City.findOneAndDelete({
        name: cityName
    }, () => {})
})


module.exports = router
