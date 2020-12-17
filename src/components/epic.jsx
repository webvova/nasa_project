import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment'
import { Spinner } from 'react-bootstrap'
import "./epic.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = "WNzh8sYZHvSXUTVYwmPKR3hwtOySWlfsM8I3gZ1a";
const API = "https://api.nasa.gov/EPIC/api/natural/images";
const IMAGE_API = "https://api.nasa.gov/EPIC/archive/natural/";
const today = moment().format('YYYY/MM/DD')

const EPIC = () => {
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);

  // Making a request
  useEffect(() => {
    setLoading(true)
    axios.get(`${API}?&api_key=${API_KEY}`)
      .then(res => {
        if (res.data) {
          setData(res.data)
          setLoading(false)
        }
      })
  }, []);

  // Making a request of earth picture
  useEffect(() => {
    if (data) {
      setLoading(true)
      axios.get(`${IMAGE_API}2019/05/30/png/epic_1b_20190530011359.png?api_key=${API_KEY}`)
        .then(res => {
          if (res.data) {
            setPicture(res.data)
            setLoading(false)
          }
        })
    }
  }, [data]);

  if (loading === true) {
    return  (
      <div className='loading'>
        <div className="loading-text">Content is loading, please wait...</div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="apod">
      <h1 className="apod-title">Earth Polychromatic Imaging Camera</h1>
      {/*{picture && picture}*/}
    </div>
  );
};


export default EPIC;