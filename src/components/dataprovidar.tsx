import * as React from "react";
import { Row,Label,Input} from "reactstrap";
import { Line_chart } from "./line_chart";


interface IProps{
propsdata :any;
}
interface IState{
    data:any;
    
}
//timeglobal is a global variable.
//i create a object where time is a value which i want to increase gradually.
//so for this,instead of creating a function i make it global

var timeglobal = 4;

export class DataProvider extends React.Component<IProps,IState>{
    constructor(props:IProps){
        super(props);
        this.state = { data : this.props.propsdata}
        
        this.opacityChange = this.opacityChange.bind(this)
        
    }
    //The objective of creating this function is to change the opacity attribute.
    //Every line has it's initial opacity 0.
    //This function make the opacity 0 to 1. or 1 to 0.

    opacityChange(id:string){
        var pathid = document.getElementById(id)
        if(pathid.getAttribute("opacity")==="0"){
         pathid.setAttribute("opacity","1")
       }else{
         pathid.setAttribute("opacity","0")
       }
    }
    
    //objectGenerator create three object at a time
    // and push it in the main data set by calling dataUpdater.
           
     objectGenerator(context:any){
      const keyarr:Array<string> = ["HZ","VOLT","AMP"];
      var time = timeglobal++;

      //getRandomArbitrary function generate a number between two given number

        function getRandomArbitrary(min:number, max:number) {
          return Math.floor(Math.random() * (max - min) + min);
        }
      var obj1:{"time":number,"value":number} = {"time":time,"value": getRandomArbitrary(10,20)}
      console.log(obj1)
      context.dataUpdater(keyarr[0], obj1)
      var obj2:{"time":number,"value":number} = {"time":time,"value": getRandomArbitrary(50,60)}
      console.log(obj2)
      context.dataUpdater(keyarr[1], obj2)
      var obj3:{"time":number,"value":number} = {"time":time,"value": getRandomArbitrary(80,90)}
      console.log(obj3)
      context.dataUpdater(keyarr[2], obj3)
     
    }

    //dataUpdater function update the main data by pushing the object.

      dataUpdater(name:string,obj:{"time":number,"value":number}){
          if(this.state.data[name].value.length>=20){
            console.log("i am in");
            this.state.data[name].value.reverse();
            this.state.data[name].value.pop();
            this.state.data[name].value.reverse();
            this.state.data[name].value.push(obj);
            console.log(this.state.data[name].value);
            this.setState(this.state.data[name].value); 

          }else{
            this.state.data[name].value.push(obj);
          }

      }
    
    //i want to call objectGenerator function after every 1000ms after the first render
    //beacuse of continuouslly updating the main data 
    //and also send the "this" because after calling componentDidMount this function "this" is
    //not work.That's why i send the "this" as argument.
    
    componentDidMount(){
            setInterval(this.objectGenerator,1000, this);      
       }
       
    render(){
        
        return(
            <div id ="linecontainer">
                <Line_chart timeSeriseData ={this.state.data}/>
              
                <Row id="checkbox" className ="ml-3">
                {
                  // 
                Object.keys(this.props.propsdata).map(key =>(
                  <Label key={key.toString()}className="ml-5">
                     <Input type="checkbox"  onChange ={this.opacityChange.bind(this,key)}/>
                     {key}
                   </Label>
                ))
                }
                </Row>
            </div>
        )
    }

}