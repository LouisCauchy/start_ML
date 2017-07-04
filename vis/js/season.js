d3.csv("../data/seasonality/common/autumn_top10.csv", function(error, data) {
    buildChart(data)
});
$('body').delegate("#selectSeason", "change", function() {
    $('.season').empty().remove()
    var container = $('.container');
    console.log('container: ', container)
    var season = this.value;
    var newEl = $('<div class="season"></div>').addClass(season.toString())

    var fle_path = '../data/seasonality/common'
    var fle_name = season.toString() + "_top10.csv"

    getData(fle_path + fle_name)

    container.append(newEl)
})

function getData(file){
    console.log(file)
    d3.csv(file, function(error, data) {
        buildChart(data)
        console.log(data)
    });
}

function buildChart(data) {
    var onlyValues = data.map(function(d) {
        return +d.value;
    })
    var onlyCountries = data.map(function(d) {
        return d.country;
    })

    var chart, width = 600,
        bar_height = 20,
        height = bar_height * onlyCountries.length;

    var gap = 2,
        yRangeBand;
    yRangeBand = bar_height + 2 * gap;

    var x;
    x = d3.scale.linear()
        .domain([0, d3.max(onlyValues)])
        .range([0, width]);

    var y = function(i) {
        return yRangeBand * i; };

    var left_width = 100;

    var chart = d3.select(".season")
        .append('svg')
        .attr('class', 'chart')
        .attr('width', width + left_width + 40)
        .attr('height', (bar_height + gap * 2) * onlyCountries.length + 30)
        .append('g')
        .attr("transform", "translate(10, 20)");

    chart.selectAll("line")
        .data(x.ticks(d3.max(onlyValues)))
        .enter().append("line")
        .attr("x1", function(d) {
            return x(d) + left_width; })
        .attr("x2", function(d) {
            return x(d) + left_width; })
        .attr("y1", 0)
        .attr("y2", (bar_height + gap * 2) * onlyCountries.length);

    chart.selectAll("rect")
        .data(onlyValues)
        .enter().append("rect")
        .attr("x", left_width)
        .attr("y", function(d, i) {
            return y(i) + gap; })
        .attr("width", x)
        .attr("height", bar_height);

    chart.selectAll("text.score")
        .data(onlyValues)
        .enter().append("text")
        .attr("x", function(d) {
            return x(d) + left_width; })
        .attr("y", function(d, i) {
            return y(i) + yRangeBand / 2; })
        .attr("dx", -5)
        .attr("dy", ".36em")
        .attr("text-anchor", "end")
        .attr('class', 'score')
        .text(String);

    chart.selectAll("text.name")
        .data(onlyCountries)
        .enter().append("text")
        .attr("x", left_width / 2)
        .attr("y", function(d, i) {
            return y(i) + yRangeBand / 2; })
        .attr("dy", ".36em")
        .attr("text-anchor", "middle")
        .attr('class', 'name')
        .text(String);
}

