var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

var width = 900,
    height = 500;

var y = d3.scale.linear().range([height, 0]);



var count = 0
d3.csv("../data/seasonality/winter_top25.csv", type, function(error, data) {
    y.domain([0, d3.max(data, function(d) {
        return d.value;
    })]);

    var barWidth = 20 //width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(" + i * barWidth + ",0)";
        });

    bar.append("rect")
        .attr("y", function(d) {
            return y(d.value);
        })
        .attr("height", function(d) {
            return height - y(d.value);
        })
        .attr("width", barWidth - 1);

    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) {
            return y(d.value) + 3;
        })
        .attr("dy", ".75em")
        .text(function(d) {
            return d.value;
        });


    // bar.selectAll("text")
    //     .data(data)
    //     .enter().append("text")
    //     .attr("x", barWidth/2)
    //     .attr("y", function(d) {
    //         return y(d.value);//y(d) + y.rangeBand() / 2; 
    //     })
    //     .attr("dx", -5)
    //     .attr("dy", ".36em")
    //     .attr("text-anchor", "end")
    //     .text(function(d){
    //         return d.value;
    //     });
});

function type(d) {
    d.value = +d.value;
    return d;
}
