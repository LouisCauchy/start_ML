function createGradient (map) {

  var m = map.getPanes().overlayPane

  var svg = map.getPanes().overlayPane.firstChild;
  console.log(svg)
  var doc = document.implementation.createDocument(null, null, null);

  var svgDef = doc.createElementNS('http://www.w3.org/2000/svg','defs');

  var svgGradient = doc.createElementNS('http://www.w3.org/2000/svg',"radialGradient");
  var svgStart = doc.createElementNS('http://www.w3.org/2000/svg','stop');
  var svgStop = doc.createElementNS('http://www.w3.org/2000/svg','stop');

  svgGradient.setAttribute('id', 'gradient');

  svgStart.setAttribute('offset', '0%');
  svgStop.setAttribute('offset', '100%');
  svgStart.setAttribute('class', 'circle-start');
  svgStop.setAttribute('class', 'circle-stop');

  svgGradient.appendChild(svgStart);
  svgGradient.appendChild(svgStop);

  svgDef.appendChild(svgGradient);

  svg.appendChild(svgDef);
}

createGradient(mymap)