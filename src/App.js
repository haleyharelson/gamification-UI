import React, { Component } from 'react';
import { Steps, Table } from "antd";
import './index.css';
import { TrophyOutlined, StarFilled } from '@ant-design/icons';

const { Step } = Steps;
const columns = [
  {
    title: 'Top Players This Week',
    dataIndex: 'weekname',
    align: 'center',
    colSpan: 2,
  },
  {
    title: '',
    colSpan: 0,
    dataIndex: 'weekpoints',
    align: 'center'
  },
  {
    title: 'Top Players This Month',
    dataIndex: 'monthname',
    align: 'center',
    colSpan: 2,
  },
  {
    title: '',
    colSpan: 0,
    dataIndex: 'monthpoints',
    align: 'center'
  }
];

const data = [
  {
    key: '1',
    weekname: 'John Brown', 
    monthname: 'John Brown',
    weekpoints: '200',
    monthpoints: '500',
  },
  {
    key: '2',
    weekname: 'Jim Green',
    monthname: 'John Brown',
    weekpoints: '200',
    monthpoints: '500',
  },
  {
    key: '3',
    weekname: 'Joe Black',
    monthname: 'John Brown',
    weekpoints: '200',
    monthpoints: '500',
  },
  {
    key: '4',
    weekname: 'Joe Black',
    monthname: 'John Brown',
    weekpoints: '200',
    monthpoints: '500',
  },
  {
    key: '5',
    weekname: 'Joe Black',
    monthname: 'John Brown',
    weekpoints: '200',
    monthpoints: '500',
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { Points: 0 };
  }

  componentDidMount() {
    this.fetchCRMData();
  }

  fetchCRMData() {
    // code for fetching data
    this.setPoints(125);
  }

  setPoints = (points) => {
    this.setState({
      Points : points
    });
  }

  handleChange = (e) => {
    var points = e.target.value;
    this.setPoints(points);
  }

  getCurrentLevel = () => {
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

  getLevelMax = () => {
    var levelMax;
    var currentLevel = this.getCurrentLevel();
    if (currentLevel === 0) {
      levelMax = 50;
    } else if (currentLevel === 1) {
      levelMax = 100;
    } else if (currentLevel >= 2) {
      levelMax = 150;
    }
    return levelMax;
  }

  getTotalPoints = () => {
    var totalPoints = this.state.Points;
    return totalPoints;
  }

  getDescription = () => {
    var levelMax = this.getLevelMax();
    var totalPoints = this.getTotalPoints();
    var pointsLeft = levelMax - totalPoints;
    var description = pointsLeft + " points to go!";
  
    return description.toString();
  }

  getPercentage = () => {
    var levelMax = this.getLevelMax();
    var totalPoints = this.getTotalPoints();

    var percent = (totalPoints / levelMax) * 100;
    if (totalPoints >= 50 && totalPoints < 100) {
      percent = ((totalPoints - 50) / 50) * 100;
    } else if (totalPoints >= 100 && totalPoints < 150) {
      percent = ((totalPoints - 100) / 50) * 100;
    }
    return percent;
  }

 render() {
   return(
    <div className="parent">
    <div className="sectionContainer">
      {this.getCurrentLevel() === 0 ? 
      <div className="firstSection">
      <div className="currentLevelSymbol"> 
      <StarFilled style={{ fontSize: '25px', color:'#FFD700'}}/> 
      <div className="pointsText"> {this.getTotalPoints()}/{this.getLevelMax()} </div>
      <div className="bottomText"> points </div>
      </div>
      </div>
      : null}
      {this.getCurrentLevel() === 1 ?
      <div className="secondSection">
      <div className="currentLevelSymbol"> 
      <StarFilled style={{ fontSize: '25px', color:'#FFD700'}}/> 
      <div className="pointsText"> {this.getTotalPoints()}/{this.getLevelMax()} </div>
      <div className="bottomText"> points </div>
      </div>
      </div>
      : null}
      {this.getCurrentLevel() === 2 ?
      <div className="thirdSection">
      <div className="currentLevelSymbol"> 
      <StarFilled style={{ fontSize: '25px', color:'#FFD700'}}/> 
      <div className="pointsText"> {this.getTotalPoints()}/{this.getLevelMax()} </div>
      <div className="bottomText"> points </div>
      </div>
      </div>
      : null}
      {this.getCurrentLevel() === 3 ?
      <div className="fourthSection">
      <div className="currentLevelSymbol"> 
      <StarFilled style={{ fontSize: '25px', color:'#FFD700'}}/> 
      <div className="pointsText"> {this.getTotalPoints()}/{this.getLevelMax()} </div>
      <div className="bottomText"> points </div>
      </div>  
      </div>
      : null}
    </div>
    <div className="stepsComponent">
    {this.getCurrentLevel() === 3 ?  
    <Steps current={this.getCurrentLevel()} direction={"vertical"}>
    {this.getCurrentLevel() === 0 ? <Step title="Level 1" description={this.getDescription()}/> : <Step title="Level 1" />}
    {this.getCurrentLevel() === 1 ? <Step title="Level 2" subTitle="50 points" description={this.getDescription()}/> : <Step title="Level 2" subTitle="50 points"/>}
    {this.getCurrentLevel() === 2 ? <Step title="Level 3" subTitle="100 points" description={this.getDescription()}/> : <Step title="Level 3" subTitle="100 points"/>}
    <Step title="Level 4" subTitle="150 points" icon={<TrophyOutlined/>}/> 
    </Steps>
    : 
    <Steps current={this.getCurrentLevel()} direction={"vertical"} percent={this.getPercentage()}>
    {this.getCurrentLevel() === 0 ? <Step title="Level 1" description={this.getDescription()}/> : <Step title="Level 1" />}
    {this.getCurrentLevel() === 1 ? <Step title="Level 2" subTitle="50 points" description={this.getDescription()}/> : <Step title="Level 2" subTitle="50 points"/>}
    {this.getCurrentLevel() === 2 ? <Step title="Level 3" subTitle="100 points" description={this.getDescription()}/> : <Step title="Level 3" subTitle="100 points"/>}
    <Step title="Level 4" subTitle="150 points" icon={<TrophyOutlined/>}/> 
    </Steps>
  }
  </div>
  <div className="leaderboardSection">
  <div className="rankIconColumn">
  <div className="rankIcon">
  <div className="rankText"> 1 </div>
  </div>
  <div className="rankIcon">
  <div className="rankText"> 2 </div>
  </div>
  <div className="rankIcon">
  <div className="rankText"> 3 </div>
  </div>
  <div className="rankIcon">
  <div className="rankText"> 4 </div>
  </div>
  <div className="rankIcon">
  <div className="rankText"> 5 </div>
  </div>
  </div>
  <div className="tableSection">
  <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={false}
  />
  </div>
  </div>
  </div>
   );
 }
}

export default App;