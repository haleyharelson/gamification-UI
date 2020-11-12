import React, { Component } from 'react';
import { Steps } from "antd";
import './index.css';

const { Step } = Steps;

// change to make this a functional component
// define a useState for getTotalPoints()
// get rid of getTotalPoints, and use useState value wherever that function is called

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { Points: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    var points = document.getElementById("points").value;
    this.setState({
      Points : points
    })
  }

  getCurrentLevel() {
    var currentLevel;
    var totalPoints = this.state.Points;
    if (totalPoints < 50) {
      currentLevel = 0; // level 1
    } else if (totalPoints >= 50 && totalPoints < 100) {
      currentLevel = 1; // level 2
    } else if (totalPoints >= 100 && totalPoints < 150) {
      currentLevel = 2; // level 3
    } else {
      currentLevel = 3; // level 4
    }
    return currentLevel;
  }

  getLevelMax() {
    var levelMax;
    var currentLevel = this.getCurrentLevel();
    if (currentLevel === 0) {
      levelMax = 50;
    } else if (currentLevel === 1) {
      levelMax = 100;
    } else if (currentLevel === 2) {
      levelMax = 150;
    }
    return levelMax;
  }

  getDescription() {
    var levelMax = this.getLevelMax();
    var totalPoints = this.state.Points;
    var pointsLeft = levelMax - totalPoints;
    var description = pointsLeft + " points until the next level!";
  
    return description.toString();
  }

 render(){
   return(
    <div className="App">
    <input type="text" id="points" onChange={this.handleChange}/>
    <Steps current={this.getCurrentLevel()} direction={"horizontal"}>
    {this.getCurrentLevel() === 0 ? <Step title="Level 1" description={this.getDescription()}/> : <Step title="Level 1" />}
    {this.getCurrentLevel() === 1 ? <Step title="Level 2" subTitle="50 points" description={this.getDescription()}/> : <Step title="Level 2" subTitle="50 points"/>}
    {this.getCurrentLevel() === 2 ? <Step title="Level 3" subTitle="100 points" description={this.getDescription()}/> : <Step title="Level 3" subTitle="100 points"/>}
    <Step title="Level 4" subTitle="150 points"/> 
    </Steps>
  </div>
   );
 }
}

export default App;