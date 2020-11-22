var margin = {top: 30, right: 100, bottom: 70, left: 100},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("#barchart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var promise = d3.csv("../csv/CP.csv");
promise.then(function(data){
console.log(data)
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Answer; }))
  .padding(0.2);
    
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(5,0)rotate(0)")
    .style("text-anchor", "end")
    svg.append("g")
        .append("text")
        .text("Answer")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",width)
        .attr("y",margin.top+height+10);

var y = d3.scaleLinear()
  .domain([0, 20000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y))
    
    svg.append("g")
    .attr("transform","translate(-80,"+ 
              (margin.top+(height/2))+")")
        .append("text")
        .text("Number of Respondents")
        .classed("label",true)
        .attr("text-anchor","middle")
        //.attr("x",margin.left)
        //.attr("y",margin.top)
        .attr("transform","rotate(90)");

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Answer); })
    .attr("y", function(d) { return y(d.Value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.Value); })
    .attr("fill", "#69b3a2")
    .on("mouseover", function(d){
    var xPosition = d3.event.pageX;
    var yPosition = d3.event.pageY;
    /*var xPosition = parseFloat(d3.select(this).attr("x")) + x.bandwidth()/2;
    var yPosition = parseFloat(d3.select(this).attr("y"))/2 + height/2;
    */
    
    d3.select("#value")
    .text(d.Value);
    
    d3.select("#tooltip")
    .classed("hidden", false)
    .style("left", xPosition + "px")
    .style("top", yPosition + "px");
    
}) 
   .on("mouseout", function(){
    d3.select("#tooltip").classed("hidden", true);
})
 
        svg.append("g")
        .classed("labels",true)
        .append("text")
        .text("(Ask if Christian)How often do you speak or pray in tongues?")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margin.left+(width/2)-30)
        .attr("y",-10)
        
    })