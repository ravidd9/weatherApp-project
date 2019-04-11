
const apiManager = new APIManager()
const renderer = new Renderer()


const loadPage = async function(){
   await apiManager.getDataFromDB()
    renderer.render(apiManager.cityData)
  
}

const handleSearch = function(){
    let cityName = $(this).siblings("input").val()
    apiManager.getCityData(cityName)
    loadPage()

}

$("#cities-container").on("click", ".add", function(){
    let cityName = $(this).siblings(".name").text()
    if($(this).text() == '<i class="fas fa-plus-circle"></i>'){
        apiManager.saveCity(cityName)
        $(this).text() = '<i class="fas fa-minus-circle"></i>'
    }
    else{
        apiManager.removeCity(cityName)
        $(this).text() = '<i class="fas fa-plus-circle"></i>'
    
    }
})


loadPage()
