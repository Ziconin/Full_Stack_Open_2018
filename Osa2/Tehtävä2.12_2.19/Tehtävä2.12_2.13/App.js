import React from 'react';
import FilterInput from './components/FilterInput'
import Display from './components/Display'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }

  handleFilterChange = (newFilter) => {
    this.setState({filter: newFilter})
  }

  render() {
    return (
      <div>
        <FilterInput
          text="Find countries: "
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <Display
            countries={this.state.countries}
            filter={this.state.filter}
            onClick={this.handleFilterChange}
          />
      </div>
    )
  }
}

export default App
