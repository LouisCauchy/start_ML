var sets = sets_rus;

document.querySelector('.select-country').onchange = function() {
    // if (this.value == "Russia"){ console.log('bla')};
    if (this.value == "Russia") sets = sets_rus;
    if (this.value == "Belarus") sets = sets_bel;
    if (this.value == "No country") sets = sets_non;
    if (this.value == "Kazachstan") sets = sets_kazah;
    if (this.value == "Common") sets = sets_common;

    build_venn(div)
}

function build_venn(div) {
    var chart = venn.VennDiagram()
    div.datum(sets).call(chart);
    div.datum(sets).call(venn.VennDiagram());
    // add a tooltip
}
var div = d3.select("#venn")
build_venn(div)
var tooltip = d3.select("body").append("div")
        .attr("class", "venntooltip");
div.selectAll("g")
        .on("mouseover", function(d, i) {
            // sort all the areas relative to the current item
            venn.sortAreas(div, d);
            // Display a tooltip with the current size
            tooltip.transition().duration(400).style("opacity", .9);
            console.log(d.size)
            tooltip.text(d.size + " hotels");
            var selection = d3.select(this).transition("tooltip").duration(400);
            selection.select("path")
                .style("stroke-width", 3)
                .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
                .style("stroke-opacity", 1);
        })

    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 0)
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });