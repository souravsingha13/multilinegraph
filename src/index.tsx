import * as React from "react";
import * as ReactDOM from "react-dom";
import { DataProvider } from "./components/dataprovidar";
import { Line_chart } from "./components/line_chart";

//Main data which is representing in the graph.
var data:any = {
          "HZ":{
            "name" : "HZ",
            "value":[
                {"time":1,"value":10},
                {"time":2,"value":14},
                {"time":3,"value":17},
                {"time":4,"value":19}
              ]
              },
          "VOLT":{
            "name" : "VOLT",
            "value":  [
              {"time":1,"value":50},
              {"time":2,"value":54},
              {"time":3,"value":57},
              {"time":4,"value":53}]
          },
          "AMP":{
            "name":"AMP",
            "value":[{"time":1,"value":80},
            {"time":2,"value":89},
            {"time":3,"value":81},
            {"time":4,"value":85}]
          }
        }
      
            ReactDOM.render(
              <DataProvider propsdata ={data}/>,
             document.getElementById("container")
           );



