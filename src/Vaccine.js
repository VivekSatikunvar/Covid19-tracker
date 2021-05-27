import React, { useState, useEffect } from 'react';
import VaccineBox from './VaccineBox';
import {Link} from 'react-router-dom';


function Vaccine() {
    const [vaccines, setVaccines] = useState([]);
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/vaccine").then(response => response.json())
        .then(data => (
          setVaccines(data.data)
        //   console.log(data.data)
    ))
      },[])
    return (
        <div>
            <Link to={'/'} style={{ textDecoration: 'none' , color: '#fc3c3c',marginTop:'30px'}}>
                <h1 style={{marginTop:'30px'}}>COVID-19 TRACKER</h1>
            </Link>

            {vaccines.map((vaccine) => (
              <VaccineBox name={vaccine.candidate} effect={vaccine.mechanism} sponser={vaccine.sponsors} detail={vaccine.details}/>
            ))}

        </div>
    )
}

export default Vaccine
