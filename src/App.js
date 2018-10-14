import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCity } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.searchUser = this.searchUser.bind(this);
    this.state = {
      searchValue: null,
    }
  }

  searchUser(event) {
    this.setState({ searchValue: event.target.value}, () => {
      this.props.fetchCity(this.state.searchValue);
    })
  }

  render() {
    const { data, error, isLoading } = this.props.city;
    
    return (
      <div>
        <h2>Search a city:</h2>
        <input placeholder='Search your city' onChange={this.searchUser} />
        {data && 
          <div>
            <p>{data.name}</p>
            <img src={data.flag} alt='Not Found' width={500} />
          </div>
        }
        {this.state.searchValue && error && 
          <p>City not found.</p>
        }
        {isLoading && 
          <p>Loading...</p>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  city: state.city
});

const mapDispatchToProps = {
  fetchCity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
