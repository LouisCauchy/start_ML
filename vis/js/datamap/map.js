// // var scaleValues = ['30 000','20 000', '15 000', '10 000','9000','5000','4000','3000',
// // '2000','1000','500','100']
// // var colorScale = d3.scale.linear()
// //         .domain([1,10])
// //         .range(['#0B3086','#CCD7F2'])

// //         var scaleElement = $('#scale-of-colors');
// //         // var namesOfColors = $('#name-of-colors');
// //         for(var i = 0; i < 12; i++){
// //          var container = $('<div></div>').addClass('scale-points-container')
// //             var rect = $('<div></div>').addClass('rect-color');
// //             var text = $('<span></span>').addClass('quantity')
// //             container.append(rect,text)
// //             scaleElement.append(container);
// //             //container.append(rect)
// //             //namesOfColors.append(text);
// //             rect.css({'background-color' : colorScale(i)})
// //             //console.log(rect)
// //         }
// //  $('.quantity').each(function(){
// //      for(var j = 0; j < scaleValues.length; j++){

// //      }
// //  })

// // TODO

// // Значения на шкале
// // console.log(onlyValues)

// // TODO
//     // ПОДХОДЯЩИЙ ФОРМАТ ТИПА ["USA", 70]
// //var map = new Datamap({element: document.getElementById('container')});

// var mincolor = '#A4CCDB' //'#CCD7F2'
// var maxcolor = '#5A8DA0' //'#0B3086'
// var defaultcolor = '#F5F5F5'
// var bordercolor = '#2e4137'
// var dataset = {};
// var select = window.parent.document.getElementById('selectCountries')
// //console.log(select)
// //function renderMap(series) {
//     var values_for_scale = []
//     var onlyValues = series.map(function(obj) {
//         return obj[1]; 
//     });
//     var minValue = Math.min.apply(null, onlyValues),
//         maxValue = Math.max.apply(null, onlyValues);
//     series.forEach(function(item) { //
//     var paletteScale = d3.scale.linear()
//         .domain([minValue, maxValue])
//         .range([mincolor, maxcolor]);
//          var iso = item[0],
//         value = item[1];
//         dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
//     });
//     new Datamap({
//         element: document.getElementById('container'),
//         projection: 'mercator', 
//         fills: { defaultFill: defaultcolor },
//         data: dataset,
//         geographyConfig: {
//             borderColor: '#DEDEDE',
//             highlightBorderWidth: 2,
//             highlightFillColor: function(geo) {
//                 return geo['fillColor'] || '#F5F5F5';
//             },
//             highlightBorderColor: bordercolor,
//             popupTemplate: function(geo, data) {
//                 if (!data) {
//                     return; }
//                 // tooltip content
//                 return ['<div class="hoverinfo">',
//                     '<strong>', geo.properties.name, '</strong>',
//                     '<br>Visits: <strong>', data.numberOfThings, '</strong>',
//                     '</div>'
//                 ].join('');
//             }
//         }
//     });
//     console.log(series)
// //}
// series = common
// renderMap(series)
//  $(select).onchange = function() {
//      console.log("selected")
//      if (this.value == "1") var series = rus; renderMap(series);
//      if (this.value == "3") var series = ukr; renderMap(series);
//      if (this.value == "2") var series = bel; renderMap(series);
//      if (this.value == "4") var series = kazah; renderMap(series);
//      if (this.value == "0") var series = common; renderMap(series);
//  }
// document.onload = function(){
//    console.log("loaded")
// }