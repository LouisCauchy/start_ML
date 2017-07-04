// Шкала для создания размера радиуса

var min_visit = 1
var max_visit = 205
var rad = [10, 20]

var sizeScale = d3.scale.linear()
    .domain([min_visit, max_visit])
    .range(rad);


var ukrQuan = 915
var rusQuan = 1068
var belQuan = 309
var kazQuan = 266
var nonQuan = 705

var selected_coord = [36.44948, 32.12818]

var coordinates = {
    "side": [36.82095, 31.30033],
    "bodrum": [37.14192, 27.35053],
    "alanya": [36.44948, 32.12818],
    "antalya": [36.85595, 30.91298],
    "kemer": [36.73618, 30.55878],
    "mermeris": [36.7996, 28.23111],
    "istanbul": [41.0069, 28.97348]
}

buildMap(selected_coord)

document.querySelector('#selectCity').onchange = function() {
    var selected_city = coordinates[this.value]
    //mymap.remove()
    $('#mapid').remove()
    $('.hotel-details').remove()
    buildMap(selected_city)
}


function buildMap(selected_coord) {
    var latlng = L.latLng(selected_coord) // Alanya //L.latLng(39.55,32.50) // координаты географического центра турции
    var zoom = 15
        // создаём карту
    var container = document.createElement('div')
    container.id = 'mapid'
    $('.main').append(container)

    var details = document.createElement('div')
    $(details).addClass('hotel-details')
    $('.main').append(details)

    var mymap = L.map('mapid').setView(latlng, zoom);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    // Наносим все отели на карту всей страны (или города. зависит от того, что задано в latLng)
    d3.csv("../../../data/COUNT_NATIONAL_IN_HOTEL/Turkey/common.csv", function(data) {
        data.forEach(function(item) {
            var coord = L.latLng(item.latitude, item.longitude)

            var others = parseFloat(item.non) + parseFloat(item.kaz) + parseFloat(item.bel)

            var marker = L.piechartMarker(coord, {
                data: [
                    { name: "Ukraine", value: item.ukr, style: { fillStyle: 'rgba(255, 246, 19, 0.81)', strokeStyle: 'rgba(255,0,0,0)', lineWidth: 0 } }, // yellow
                    { name: "Russia", value: item.rus, style: { fillStyle: 'rgba(255, 0, 102, 0.81)', strokeStyle: 'rgba(255,0,0,0)', lineWidth: 0 } }, //red
                    //{name: 3, value: item.bel, style: { fillStyle: 'rgba(4, 149, 226, 0.81)',strokeStyle: 'rgba(255,0,0,0)',lineWidth: 0}},//blue
                    { name: "Others", value: others, style: { fillStyle: 'rgba(4, 226, 21, 0.81)', strokeStyle: 'rgba(255,0,0,0)', lineWidth: 0 } } //green
                ],
                radius: sizeScale(item.common)
            })
            marker.addTo(mymap);
            var popup_text = '<div id=hotel_title>' + item.title + '</div>' + "<div id=stars>Количество звёзд: " + item.stars + '</div>' + "<div id=count_visited>Отель посетили: " + parseInt(item.common) + " человек</div>" +
            // "<a class=details>Подробнее</a>" +
                '<i class=hotel_id>' + item.id_hotel + '</i>' + 
                '<div>Украинцы: '+ item.ukr +'</div>'+
                '<div>Русские: '+ item.rus +'</div>' +
                '<div>Белорусы: '+ item.bel +'</div>'+
                '<div>Другие: '+ item.non +'</div>'
            marker.bindPopup(popup_text)

        })
    });
}


$('body').delegate("a.details", "click", function(event) {
    $('.hotel-details').html('')
    var txt = $(event.target).parent().html()
    var child = document.createElement('div')
    child.innerHTML = txt
    var title = child.children[0]
    var stars = child.children[1]
    var id = child.children[4].innerText

    var title_elem = document.createElement('div')
    $(title_elem).addClass('hotel-title').html(title)

    $('.hotel-details').append(title_elem)
    $('.hotel-details').append(stars)
    $('.hotel-details').append('<div class=line-graph></div>')
   // buildLineGraph(id)
});

// график посещения отеля

// var margin = { top: 30, right: 20, bottom: 30, left: 20 },
//     width = 350 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%Y").parse;

// var x = d3.time.scale().range([0, width]);
// var y = d3.scale.linear().range([height, 0]);

// var xAxis = d3.svg.axis().scale(x)
//     .orient("bottom").ticks(5);

// var yAxis = d3.svg.axis().scale(y)
//     .orient("left").ticks(5);

// function buildLineGraph(id) {
//     //console.log(typeof id)
//     //console.log(parseInt(id))
//     var valueline = d3.svg.line()
//         .x(function(d) {
//             return x(d.date);
//         })
//         .y(function(d) {
//             return y(d.count_of_visits);
//         });

//     var svg = d3.select(".line-graph")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
   
//     d3.csv("../../../data/hotels_data/countAll.csv", function(error, data) {
//         //console.log(data[0])
//         data.forEach(function(d) {
//             //console.log(d.id_hotel)
//             //console.log(typeof d.id_hotel)
//             if (parseInt(d.id_hotel) == parseInt(id)) {
//                 console.log('true')
//                 console.log(d.date)
//                 d.date = parseDate(d.date.split('.')[0]);
//                 d.count_of_visits = +d.count_of_visits;
//                 return
//             }

//         });
//         x.domain(d3.extent(data, function(d) {
//             return d.date;
//         }));
//         y.domain([0, d3.max(data, function(d) {
//             return d.count_of_visits;
//         })]);

//         // Add the valueline path.
//         svg.append("path")
//             .attr("class", "line")
//             .attr("d", valueline(data));

//         // Add the X Axis
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis);

//         // Add the Y Axis
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis);

//     });
// }
