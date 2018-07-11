import React from 'react'

const Display = (props) => {
  const persons = props.persons
  const result = persons.filter(
    (person) => person.name.toLowerCase().startsWith(
      props.filter.toLowerCase()
    )
  )

  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {result.map(
            person => <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Display
