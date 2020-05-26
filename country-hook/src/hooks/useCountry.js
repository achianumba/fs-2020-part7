import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      setCountry(null);

      if (name !== '') {
        axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(res => {
        setCountry({
          data: res.data[0],
          found: true
        });
      })
      .catch(err => {
        setCountry({found: false})
      })
      }
    }, [name])
  
    return country
  }