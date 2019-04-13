class APIManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let cities = await $.get(`/cities`)
        this.cityData = cities
    }

    async getCityData(cityName) {
        let city = await $.get(`/city/:${cityName}`)
        city.new = true
        this.cityData.push(city)
    }

    saveCity(cityName) {
        let chosenCity
        for (let city of this.cityData) {
            if (city.name == cityName) {
                city.new = false
                chosenCity = city
            }
        }
        $.post(`/city/`, chosenCity, function (city) {
            console.log("city sent!")
        })
    }

    removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function () {

                console.log("city deleting!")
            }
        })
        for (let i in this.cityData){
            if(this.cityData[i].name == cityName){
                this.cityData.splice(i, 1)
            }
        }
    }

    async updateCity(cityName) {
        let chosenCity = await $.ajax({
            url: `/city/:${cityName}`,
            type: `PUT`,
            succes: function () {}
        })
        for (let cityIndex in this.cityData) {
            if (this.cityData[cityIndex].name == cityName) {
                if(this.cityData[cityIndex].new == true){
                    chosenCity.new = true
                }
                this.cityData[cityIndex] = chosenCity
                console.log("city: " + this.cityData[cityIndex].name + 
                " has updated at: " + this.cityData[cityIndex].updatedAt)
            }
        }
    }
}