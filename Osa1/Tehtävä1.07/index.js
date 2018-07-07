import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			good: 0,
			neutral: 0,
			bad: 0,
			values: [],
			all: []
		}
	}

	increment = (s) => {
		switch(s) {
			case "Good":
				return(() => this.setState({
					good: this.state.good+1,
					values: this.state.values.concat(1),
					all: this.state.all.concat('g')
				}))
			case "Neutral":
				return(() => this.setState({
					neutral: this.state.neutral+1,
					values: this.state.values.concat(0),
					all: this.state.all.concat('n')
				}))
			case "Bad":
				return(() => this.setState({
					bad: this.state.bad+1,
					values: this.state.values.concat(-1),
					all: this.state.all.concat('b')
				}))
			default:
				return(() => console.log("Failed click"))
		}
	}

	render() {
		const avg = this.state.values.reduce((a,b) => a + b, 0)/this.state.values.length
		const rounded_avg = Math.round(avg * 10) / 10

		const posit = this.state.all.filter(((char) => char === 'g')).length
		const posit_ratio = (posit / this.state.all.length) * 100
		const rounded_posit = Math.round(posit_ratio * 10) / 10
		const posit_ratio_str = rounded_posit.toString()

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
					<Display value={this.state.good} text="Hyvä" />
					<Display value={this.state.neutral} text="Neutraali" />
					<Display value={this.state.bad} text="Huono" />
					<Display value={rounded_avg} text="Keskiarvo" />
					<Display value={posit_ratio_str.concat(" %")} text="Positiivisia" />
				</div>
			</div>
		)
	}
}

const Display = ({value, text}) => {
	return (
		<div>{text} {value}</div>
	)
}

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

ReactDOM.render(<App />, document.getElementById('root'))
