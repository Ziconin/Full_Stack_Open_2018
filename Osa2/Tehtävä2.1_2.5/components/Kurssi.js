import React from 'react'

const Kurssi = (props) => {
  return (
    <div>
      <h1>Opetusohjelma</h1>
      {props.kurssit.map(kurssi =>
        <Osio key={kurssi.id} nimi={kurssi.nimi} osat={kurssi.osat} />
      )}
    </div>
  )
}

const Osio = (props) => {
  return (
    <div>
      <h1>{props.nimi}</h1>
      <Sisalto osat={props.osat} />
      <Yhteensa osat={props.osat}/>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      {props.osat.map(
        osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />
      )}
    </div>
  )
}

const Osa = (props) => {
  return (
    <p>{props.nimi} {props.tehtavia}</p>
  )
}

const Yhteensa = (props) => {
  const osat = props.osat
  const result = osat.map(osa => osa.tehtavia)

  return (
    <p>Yhteensä {result.reduce((a,b) => a + b)} tehtävää.</p>
  )
}

export default Kurssi
