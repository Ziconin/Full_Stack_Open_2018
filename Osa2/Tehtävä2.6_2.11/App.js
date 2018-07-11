import React from 'react';
import FilterInput from './components/FilterInput'
import AddNewForm from './components/AddNewForm'
import Display from './components/Display'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({persons: response.data})
      })
  }

  handleFormSubmit = (persons) => {
    this.setState({
      persons: persons,
      newName: '',
      newNumber: ''
    })
  }

  handleNameChange = (newName) => {
    this.setState({newName: newName})
  }

  handleNumberChange = (newNumber) => {
    this.setState({newNumber: newNumber})
  }

  handleFilterChange = (newFilter) => {
    this.setState({filter: newFilter})
  }

  render() {
    return (
      <div>
        <FilterInput
          text="Rajaa näytettäviä: "
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />
        <AddNewForm
          name={this.state.newName}
          number={this.state.newNumber}
          persons={this.state.persons}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
          onSubmit={this.handleFormSubmit}
        />
        <Display
          persons={this.state.persons}
          filter={this.state.filter}
        />
      </div>
    )
  }
}

export default App
