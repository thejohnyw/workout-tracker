// graph component of React Frontend (class component)

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
                <XYPlot xType="linear" width={400} height={400}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis title="X Axis" />
                    <YAxis title="Y Axis" />
                    <LineSeries data={this.props.chartData} style={{ fill: 'none' }}/>
                </XYPlot>
            </div>
        )
    }
    }
export default Graphs