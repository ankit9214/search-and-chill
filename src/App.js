import React from 'react';
import Search from './components/Search'
import Movies from './components/Movies'
import {Component} from 'react'
import { Spinner } from 'reactstrap'
import './App.css'

class App extends Component {
  state = {
    movies: [],
    isFetchComplete: true,
    isSearchSuccessful : true
  }

  setIsFetchComplete = (value) => {
    this.setState({isFetchComplete: value}) 
  }

  setIsSearchSuccessful = (value) => {
    this.setState({isSearchSuccessful: value})
  }




  getMovies = (data) => {
     this.setState({
       movies: data
     })
  }

  render(){
    return (
      <div className="container App mt-5">
        <Search getMovies={this.getMovies} isFetchComplete = {this.setIsFetchComplete} isSearchSuccessful={this.setIsSearchSuccessful}/>
        {this.state.isFetchComplete ? <Movies movies={this.state.movies} searchSuccess={this.state.isSearchSuccessful}/> : <div className="container center"><Spinner color="primary" /></div> }
      </div>
    )
  }
}

export default App;
