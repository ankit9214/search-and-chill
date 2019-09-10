import React from 'react'
import {Component} from 'react'
import { Button } from 'reactstrap';


class Search extends Component {
    state = {
        search: '',
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        });

        console.log('Inside Handle Change : '+this.state.search);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.isFetchComplete(false);
        const search = this.state.search;
        search.length ?
        (
            fetch('https://vo10eml1c4.execute-api.us-east-1.amazonaws.com/latest/api/get_token', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({secret_key: 'QWERTYZXCVB'})
            })
            .then(response => response.json())
            .then(data => {
                    console.log('Before calling get movie : '+search);
                    console.log('data token'+data)
                    fetch('https://vo10eml1c4.execute-api.us-east-1.amazonaws.com/latest/api/get_movie?movie_name='+search, {
                    method: 'GET',
                    headers: {
                    Authorization : 'Bearer '+data.token,
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.props.getMovies(data.movies);
                    this.props.isFetchComplete(true)
                    if(data.movies.length===0){
                        this.props.isSearchSuccessful(false);
                    }
                    
                    
                })
            })

      )
      : this.props.isFetchComplete(true)
      
      this.setState({
          search : '',
      })
    }

    render(){
        return(
            <div className="container center">
                <h1 className="center blue-text"> Search & Chill</h1>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                                <input id="input_text" type="text" style={this.textStyle} onChange={this.handleChange} value={this.state.search}/>
                                <label htmlFor="input_text" id="input_label" className="active">Movie Name</label>
                                {this.state.search?<Button outline color="primary" onClick={this.handleSubmit}>Let's Go</Button>:''}
                        </div>
                     </div>
                </form>
            </div>

        )
    }

}

export default Search;