import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Spinner } from 'react-bootstrap'
import "./apod.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = "WNzh8sYZHvSXUTVYwmPKR3hwtOySWlfsM8I3gZ1a";
const API = "https://api.nasa.gov/planetary/apod";

const Apod = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Making a request
  useEffect(() => {
    setLoading(true)
    axios.get(`${API}?&api_key=${API_KEY}`)
      .then(res => {
        data && setData(res.data);
        data && setLoading(false)
      })
  }, []);

  // Render data
  const renderData = () => {
    const {
      date,
      explanation,
      media_type,
      title,
      url,
    } = data

    let media = null

    if (media_type === 'image') {
      media = <img src={url} alt=""/>
    }

    if (media_type === 'video') {
      media = (
          <iframe
            width="900"
            height="600"
            src={url}
          >
          </iframe>
      )
    }

    return (
      <>
        <div className="apod-data-title">{title}</div>
        <div className="apod-data-media">{media}</div>
        <div className="apod-data-date">
          <b>Date:</b>
          <i>{date}</i>
        </div>
        <div className="apod-data-explanation">{explanation}</div>
      </>
    )
  }


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
      <h1 className="apod-title">Astronomy Picture of the Day</h1>
      {renderData()}
    </div>
  );
};


export default Apod;