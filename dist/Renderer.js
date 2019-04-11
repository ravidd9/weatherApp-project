
class Renderer{
    render(citiesArr){
        console.log(citiesArr)
        let source = $('#city-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({citiesArr});
        $('#cities-container').empty().append(newHTML);
    }
}