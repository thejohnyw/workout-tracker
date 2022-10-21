import React, {Component} from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
  } from "react-vis";

class Graphs extends Component{

    constructor(props){
        super(props);
        this.state = {} // do num of workouts done in a day
    }
    

    render (){
        return (
            <div>
                <XYPlot xType="linear" width={300} height={300}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis title="X Axis" />
                    <YAxis title="Y Axis" />
                    <LineSeries data={this.props.chartData} />
                </XYPlot>
            </div>
        )
    }
    }
export default Graphs