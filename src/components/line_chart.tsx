import * as React from "react";
import {select,line,axisBottom,scaleLinear,axisLeft,curveCardinal,scaleTime,area} from 'd3'
import {FormGroup,Label,Input, Row} from "reactstrap"


interface Types{
  timeSeriseData:any
}

export const Line_chart:React.FC<Types> =({timeSeriseData})=>{
  const [data,setData] = React.useState(timeSeriseData);                                                                                                                                                                                              

  const svgRef = React.useRef();
  const svgcontainer = React.useRef();

  React.useEffect(()=>{
      const svg = select(svgRef.current)
      const xScale = scaleLinear().domain([1,100]).range([0,400]);
      const yScale = scaleLinear().domain([1,100]).range([250,0]);

      const yAxis =axisLeft(yScale)

            svg.select(".y-axis")
                .attr("transform","translate(30,10)")
                .call(yAxis);
      
      const xAxis =axisBottom(xScale)

            svg.select(".x-axis")
                .attr("transform","translate(30,260)")
                .call(xAxis);          

      const myLine = line<any>().x((d)=> {return xScale(d.time)})
                            .y((d)=>{return yScale(d.value)})
                            .curve(curveCardinal)

          timeSeriseData.forEach((element:any) => {
            console.log(element.key)
            createChecbox(element.key)
                svg.append('path')
                .attr('d', myLine(element.value))
                .attr('stroke', 'blue')
                .attr('stroke-width', 2)
                .attr("id",element.key)
                .attr("transform","translate(30,10)")
                .attr("opacity","0")
                .attr('fill', 'none'); 

          });
          
  })

  function opacityChange(id:string){
       var pathid = document.getElementById(id)
       if(pathid.getAttribute("opacity")==="0"){
        pathid.setAttribute("opacity","1")
      }else{
        pathid.setAttribute("opacity","0")
      }
  }
  function createChecbox(id:string){
    var div = document.getElementById("checkbox");
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = id;
      checkbox.className = 'pl-3';
      checkbox.onchange = ()=>{
        var lineid = document.getElementById(id);
        if(lineid.getAttribute("opacity")==="0"){
            lineid.setAttribute("opacity","1");
        }else{
            lineid.setAttribute("opacity","0");
        }
      }
    
      var label = document.createElement('label');
      label.className = 'pl-2';
      label.innerHTML = id;
      
     /// var br = document.createElement('br');
    
      div.appendChild(checkbox);
      div.appendChild(label);
    /// div.appendChild(br);
  }
         
 
    return(
      <React.Fragment>
        <div id ="svgcontainer"  className ="ml-3"ref={svgcontainer}>
          <svg id ="linechart" ref={svgRef} overflow="visible" height="300" width="400" fill="red" stroke="dark" >
            <g className ="y-axis"/>
            <g className ="x-axis"/>
            </svg>
            <Row id="checkbox" className ="ml-3"></Row>
        </div>
      </React.Fragment>
  )
}
