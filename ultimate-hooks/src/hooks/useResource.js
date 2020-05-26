import { useState, useEffect } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    const create = (resource) => {
      axios.post(baseUrl, resource)
      .then(res => {
        setResources([...resources, res.data]);
      })
    }

    useEffect(() => {
      axios.get(baseUrl)
      .then(res => {
        setResources(res.data)
      })
    }, [])
  
    const service = {
      create
    }
  
    return [ resources, service ]
  }