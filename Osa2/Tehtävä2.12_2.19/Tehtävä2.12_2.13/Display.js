import React from 'react'

const Display = (props) => {
  const countries = props.countries
  const result = countries.filter(
    (country) => country.name.toLowerCase().match(
      props.filter.toLowerCase()
    )
  )

  const handleClick = (name) => {
    props.onClick(name)
  }

  if(props.filter === "") {
    return (<div><p>Search countries by typing country name.</p></div>)
  }
  else if(result.length === 1) {
    return (
      <div>
        <h2>{result[0].name} {result[0].altSpellings[1]}</h2>
        <p>Capital: {result[0].capital}</p>
        <p>Population: {result[0].population}</p>
        <img src={result[0].flag} alt="Country Flag"></img>
      </div>
    )
  }
  else if(result.length > 10) {
    return (<div><p>Too many matches, specify another filter.</p></div>)
  }
  else if (result.length > 1) {
    return (
      <div>
        {result.map((country) =>
          <p key={country.name}
            onClick={() => handleClick(country.name)}
          >{country.name}</p>)}
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

export default Display
