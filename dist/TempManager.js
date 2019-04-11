
class APIManager{
    constructor(){
        this.cityData = []
    }

   async getDataFromDB(){
     let db = await $.get(`/cities`)
            this.cityData = db   
    }

    getCityData(cityName){
        $.get(`/city/:${cityName}`, function(city){
            this.cityData.push(city)
        })
    }

    saveCity(cityName){
        let chosenCity
        for(let city of cityData){
            if(city.name == cityName){
                chosenCity = city
            }
        }
        $.post(`/city/`, chosenCity, function(city){
            console.log("city sent!")
        })
    }

    removeCity(cityName){
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function(city){
            console.log("city deleting!")
        }})
    }
}