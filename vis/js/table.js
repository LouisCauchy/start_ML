var tabulate = function (data,columns) {
  var table = d3.select('.main').append('table').attr({'class':'table-2000'})
	

	var thead = table.append('thead')
	var tbody = table.append('tbody')
	
	table.attr({'id':'table'})
	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
	    .text(function (d) { return d })

	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

	var cells = rows.selectAll('td')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { 
	    				column: column, 
	    				value: row[column] 
	    		}
	      })
      })
      .enter()
    .append('td')
    .attr({'class':'row'})
      .text(function (d) {
      		if(!(d.value.indexOf('https') + 1)){
      			return d.value
      		}
      })

      cells.filter(function(d) { return d.value.indexOf('https') + 1 })
      			//.innerHTML = '<p></p>'
				.append('img')
				.attr({"src": function(d) {
      					return d.value;
					},
					'class':'flag-img'
				});
  return table;
}

d3.csv('../data/2000/reviews2000_summer.csv',function (data) {
	var columns = ['countryName','Flag','date','country']
  	tabulate(data,columns)
})