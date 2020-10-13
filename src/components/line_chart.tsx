import * as React from "react";
import {select,line,axisBottom,scaleLinear,axisLeft,curveCardinal,scaleTime,area,scaleOrdinal,schemeCategory10} from 'd3';
import {FormGroup,Label,Input, Row} from "reactstrap";


interface Types{
  timeSeriseData:any
}

export const Line_chart:React.FC<Types> =({timeSeriseData})=>{
  const [data,setData] = React.useState(timeSeriseData); 
  console.log(timeSeriseData)                                                                                                                                                                                             

  const svgRef = React.useRef();
  const svgcontainer = React.useRef();

  React.useEffect(()=>{
    //here i select svg element 
    const svg = select(svgRef.current)
    //defining the x scale where domain's first value is "HZ" array's first time value and
    //second value is "HZ" array's last value. 
    const xScale = scaleLinear().domain([data["HZ"].value[0].time,data["HZ"].value[data["HZ"].value.length-1].time]).range([0,400]);
    //defining the y scale.
    const yScale = scaleLinear().domain([1,100]).range([250,0]);
    //
    const yAxis =axisLeft(yScale)

          svg.select(".y-axis")
              .attr("transform","translate(30,10)")
              .call(yAxis);
      
    const xAxis =axisBottom(xScale)

          svg.select(".x-axis")
              .attr("transform","translate(30,260)")
              .call(xAxis); 

    var color = scaleOrdinal(schemeCategory10);

    //create a line generator function using d3 line() function which takes 
    // x co-ordinate value and y co-ordinate value.

    const myLine = line<any>().x((d)=> {return xScale(d.time)})
                          .y((d)=>{return yScale(d.value)})
                          .curve(curveCardinal)

    //gererating line depending on the key name and set some attribute 

    Object.keys(data).forEach(function(key) {
          svg.selectAll("."+data[key].name)
            .data(data[key].value)
            .attr('d', myLine(data[key].value))
            .attr('stroke', color(data[key].name))
            .attr('stroke-width', 2)
            .attr("id",data[key].name)
            .attr("transform","translate(30,10)")
            .attr('fill', 'none');
        }) 
          
  })
  
  return(
    <React.Fragment>
      <div id ="svgcontainer"  className ="ml-3"ref={svgcontainer}>
        <svg id ="linechart" ref={svgRef} overflow="visible" height="300" width="400" fill="red" stroke="dark" >
          <g className ="y-axis"/>
          <g className ="x-axis"/>
          <path className="HZ" opacity="0"></path>
          <path className="VOLT" opacity="0"></path>
          <path className="AMP" opacity="0"></path>
          </svg>
          <Row id="checkbox" className ="ml-3"></Row>
      </div>
    </React.Fragment>
  )
}
