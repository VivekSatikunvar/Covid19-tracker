import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent} from '@material-ui/core';
import './App.css';
import InfoBox from './Infobox';
import Map from './Map';
import Table from './Table';
import { prettyPrintStat, sortData } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import './InfoBox.css';
import Vaccine from './Vaccine';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState({lat:34.80746, lng:-40.4796});
  const [mapZoom,setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiFormControl: {
        // Name of the rule
        root: {
          // Some CSS
          minWidth:80,
        },
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "97%",
        marginTop: "20px",
        marginLeft:'10px'
      }
    },
    card: {
      borderRadius:'15px',
      boxShadow: '0 0 8px -4px rgba(0, 0, 0, 0.5)',
      border: '.5px solid rgb(218, 210, 210)',
      
    },
    MuiFormControlRoot:{
      margin:theme.spacing(1),
      minWidth: 80,
    }

  }));

  const classes = useStyles();
  
  


useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all").then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  })
},[])  

useEffect(()=>{
const getCountriesData = async () =>{
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then((response) => response.json()).then((data) =>{
    const countries = data.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2,
    }));
    
    const sortedData = sortData(data);
    setTableData(sortedData);
    setCountries(countries);
    setMapCountries(data);
  });
};
  getCountriesData();
}, []);


  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;
    const url =
      countryCode === 'worldwide'? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      
      await fetch(url).then((response) => response.json())
      .then((data) =>{
        setCountry(countryCode);
        setCountryInfo(data);

        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        countryCode === "worldwide" ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });

    };

    console.log('country ifno',countryInfo);

  return (

   
   

    <div className="app">

      <div className='app__left'>
      <div className='app__header'>

<Link to={'/'} style={{ textDecoration: 'none', color: '#fc3c3c' }}>
  
  <h1>COVID-19 TRACKER</h1>

</Link>

 
<ThemeProvider theme={theme}>
<FormControl  style={{backgroundColor:'white'}} classes={{root: 'app__dropDown'}} > 
  <Select
   onChange={onCountryChange}
   variant='outlined'
   value={country} 
   
  >
     <MenuItem value='worldwide'>WorldWide</MenuItem>
     {countries.map((country) => (
       <MenuItem value={country.value}>{country.name}</MenuItem>
      ))}
     
   </Select>
</FormControl>

</ThemeProvider>
</div>



 <div className='app__stats'>

   <InfoBox isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")}
   title="Coronavirus cases" total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)}/>
   
   <InfoBox active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")}
    title="Recovered" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>
   
   <InfoBox isRed active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")}
    title="Deaths"  total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)}/>    
   
   </div>  


   <Link to={'/vaccine'} style={{ textDecoration: 'unset', color: '#fc3c3c' }} >
   <div className={classes.root}>
      <Button  variant="outlined" color="secondary">
       GET ALL THE INFORMATION ABOUT COVID VACCINES
      </Button>
</div>
</Link>




  {/* map */}
  <Map 
  casesType={casesType}
  countries={mapCountries}
  center={mapCenter}
  zoom={mapZoom}
   />

    </div>

<Card className='app__right'>
      <CardContent className={classes.card}>
      
        <h3 >Live cases by Country</h3>
     
        <Table countries={tableData}/>
        
        <h3 className='app__graphTitle'>Worldwise new {casesType}</h3>
        <LineGraph className='app__graph' casesType={casesType}/>
      </CardContent>
    </Card>

     
    

  
    </div>
    );
     }

export default App;
