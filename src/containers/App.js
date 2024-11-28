import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'; 

import { setSearchfield } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: (event) => dispatch(setSearchfield(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchField: '',
      count: 0
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => {
      console.log(response);
      return response.json();
    }).then(users => {
      console.log(users)
      this.setState({robots: users})
    })
  }

  onSearchChange = (event) => {
    this.setState({searchField: event.target.value})
  }

  render() {
    let filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    })
    return !this.state.robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        {/* <button onClick={() => setCount(count + 1)}>Click Me!</button> */}
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }

}


// function App () {
//   const [robots, setRobots] = useState([]);
//   const [searchfield, setSearchfield] = useState('');
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response=> response.json())
//     .then(users => {setRobots(users)});
//     console.log(count);
//   }, [count])

//   const onSearchChange = (event) => {
//      setSearchfield(event.target.value)
//   }

//   const filteredRobots = robots.filter(robot =>{
//     return robot.name.toLowerCase().includes(searchfield.toLowerCase());
//   })

//   return !robots.length ?
//     <h1>Loading</h1> :
//     (
//       <div className='tc'>
//         <h1 className='f1'>RoboFriends</h1>
//         <button onClick={() => setCount(count + 1)}>Click Me!</button>
//         <SearchBox searchChange={onSearchChange}/>
//         <Scroll>
//           <CardList robots={filteredRobots} />
//         </Scroll>
//       </div>
//     );
// }

export default connect(mapStateToProps, mapDispatchToProps)(App);