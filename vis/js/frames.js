// var mincolor = '#D46A6A'//'#A4CCDB' //'#CCD7F2'
// var maxcolor = '#801515'//'#5A8DA0' //'#0B3086'
var defaultcolor = '#F5F5F5'
var bordercolor = '#2e4137'

var series = common
console.log(series)
var dataset = refreshDataset(series)

$(".item-list.countries").click(function() {
    var data_select = ["Общие", 'Россия', "Беларусь", "Украина", "Казахстан", "Не указали"]
    var h4 = $("<h4></h4>").addClass("most-popular-countries")
        .html('Самые популярные страны')
    var s = $("<select id=\"selectCountries\" name=\"selectCountries\" />");
    var caption = $("<div></div>").addClass("caption");
    for (var val in data_select) {
        $("<option />", { value: val, text: data_select[val] }).appendTo(s);
    }
    $(".main-content").append(s)
    $(".main-content").append(caption)
    $(".main-content").append(h4)
    $(".text").hide()

    renderMap(dataset)
});

$('body').delegate("#selectCountries", "change", function() {
    $('.map').empty().remove()
    $('#container').empty().remove()
    $('.countries-frame').empty().remove()

    if (this.value == "1") {
        dataset = refreshDataset(rus)
        console.log(rus)
    };
    if (this.value == "3") {
        dataset = {}
        dataset = refreshDataset(ukr)
        renderMap(dataset);
    };
    if (this.value == "2") {
        dataset = refreshDataset(bel)
        console.log(bel)
    };
    if (this.value == "4") {
        dataset = refreshDataset(kaz)
        console.log(kaz)
    };
    if (this.value == "0") {
        dataset = refreshDataset(common)
        console.log(common)
    };
    if (this.value == "5") {
        dataset = refreshDataset(non)
        console.log(common)
    };
    renderMap(dataset);
});

function refreshDataset(nat) {

    dataset = {}
    series = nat
    var onlyValues = series.map(function(obj) {
            return obj[1];
    });
    var minValue = Math.min.apply(null, onlyValues),maxValue = Math.max.apply(null, onlyValues);
 
 // COLORFILL
    series.forEach(function(item,item_number) { 
        var iso = item[0],value = item[1];
        dataset[iso] = { 
            numberOfThings: value, 
            fillColor: paletteScale(series, item_number) };
    });   
    return dataset   
}

function paletteScale(series,item_number){
    var r, g, b;
    var colors = []
    for (var i = 0, count = series.length; i < count; i++) {
        r = 255 - i * 3;
        g = 255 - i * 10;
        b = 255 - i * 25;
        colorFill = "rgb(" + r + ", " + g + ", " + b + ")";
        colors.push(colorFill)
    } 
    colors = colors.reverse()
    return colors[item_number]
}

    //$("div").eq(i).css("background", "rgb(" + r + ", " + g + ", " + b + ")");


function renderMap(dataset) {
    $('.map').empty().remove()
    $('#container').empty().remove()
    $('.countries-frame').empty().remove()
    var div = $("<div></div>").addClass("countries-frame")

    var map = $('<div></div>').addClass('map')
    var container = document.createElement('div')
    container.id = 'container'

    $(container).attr({
        'style': 'position:relative; margin:auto',
        'width': '900',
        'height': '600'
    })

    $(map).append(container)
    $(div).append(map)

    $(".main-content").append(div)

    var mymap = new Datamap({
        element: document.getElementById('container'),
        projection: 'mercator',
        fills: { defaultFill: defaultcolor },
        data: dataset,
        geographyConfig: {
            borderColor: '#DEDEDE',
            highlightBorderWidth: 1,
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#F5F5F5';
            },
            highlightBorderColor: bordercolor,
            popupTemplate: function(geo, data) {
                if (!data) {
                    return;
                }
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br><strong>Visits: ', data.numberOfThings, '</strong>',
                    '</div>'
                ].join('');
            }
        }
    });
}
