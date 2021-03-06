const apiManager = new APIManager()
const renderer = new Renderer()


const loadPage = async function () {
    updateAll()
    await apiManager.getDataFromDB()
    renderer.render(apiManager.cityData)
}

const handleSearch = async function () {
    let cityName = $("#searchBar").find("input").val()
    if (cityName != "") {
        await apiManager.getCityData(cityName)
        renderer.render(apiManager.cityData)
        $("#searchBar").find("input").val("")
    }
}

$("#cities-container").on("click", ".updateButton", async function () {
    let cityName = $(this).siblings(".name").text()
    await apiManager.updateCity(cityName)
    renderer.render(apiManager.cityData)
})

$("#cities-container").on("click", ".fa-plus-circle", function () {
    let cityName = $(this).closest(".cityCard").find(".name").text()
    console.log("added " + cityName)
    $(this).attr("class", "fas fa-minus-circle")
    apiManager.saveCity(cityName)
})
$("#cities-container").on("click", ".fa-minus-circle", async function () {
    let cityName = $(this).closest(".cityCard").find(".name").text()
    console.log("deleted " + cityName)
    await apiManager.removeCity(cityName)
    $(this).closest(".cityCard").remove()
})

const updateAll = async function () {
    await apiManager.updateAll(new Date())
    

}

loadPage()