import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			good: 0,
			neutral: 0,
			bad: 0
		}
	}

	increment = (s) => {
		switch(s) {
			case "Good":
				return(() => this.setState({good: this.state.good+1}))
			case "Neutral":
				return(() => this.setState({neutral: this.state.neutral+1}))
			case "Bad":
				return(() => this.setState({bad: this.state.bad+1}))
			default:
				return(() => console.log("Failed click"))
		}
	}

	render() {
		return (
			<div>
				<h1>Anna palautetta</h1>
				<div>
					<Button handleClick={this.increment("Good")} text="Hyvä"/>
					<Button handleClick={this.increment("Neutral")} text="Neutraali"/>
					<Button handleClick={this.increment("Bad")} text="Huono"/>
				</div>
				<h1>Statistiikka</h1>
				<div>
					<Display counter={this.state.good} text="Hyvä" />
					<Display counter={this.state.neutral} text="Neutraali" />
					<Display counter={this.state.bad} text="Huono" />
				</div>
			</div>
		)
	}
}

const Display = ({counter, text}) => {
	return (
		<div>{text} {counter}</div>
	)
}

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

ReactDOM.render(<App />, document.getElementById('root'))
