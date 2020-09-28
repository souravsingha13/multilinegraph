import * as React from "react";
import * as ReactDOM from "react-dom";
import { Line_chart } from "./components/line_chart";

var data =[{
    "key" : "hz",
     "value":[
          {"time":12,"value":10},
          {"time":13,"value":20},
          {"time":14,"value":30},
          {"time":15,"value":40},
          {"time":16,"value":50}]
        },{
        "key" : "hzz",
        "value":  [{"time":1,"value":10},
          {"time":2,"value":22},
          {"time":3,"value":24},
          {"time":4,"value":27},
          {"time":5,"value":38}]
        },{
          "key":"amp",
          "value":[{"time":1,"value":14},
          {"time":3,"value":19},
          {"time":4,"value":21},
          {"time":6,"value":19},
          {"time":10,"value":26}]}]


ReactDOM.render(
     <Line_chart timeSeriseData={data}/>,
    document.getElementById("container")
  );