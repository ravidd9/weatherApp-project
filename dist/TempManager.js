
class APIManager{
    constructor(){
        this.cityData = []
    }

   async getDataFromDB(){
        let cities = await $.get(`/cities`)
        this.cityData = cities   
    }

    async getCityData(cityName){
        let city = await $.get(`/city/:${cityName}`)
        city.new = true
        this.cityData.push(city)
        }
    
    saveCity(cityName){
        let chosenCity
        for(let city of this.cityData){
            if(city.name == cityName){
                chosenCity = city
            }
        }
        $.post(`/city/`, chosenCity, function(city){
            console.log("city sent!")
        })
    }

    removeCity(cityName){
        this.cityData.findIndex() //trying to locate the add and delete bug
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function(){
               
            console.log("city deleting!")
        }})
    }
}