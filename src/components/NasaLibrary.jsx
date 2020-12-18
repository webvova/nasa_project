import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./nasa-library.css";
import Grid from '@material-ui/core/Grid';

import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;

const API = "https://images-api.nasa.gov";

const Apod = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSearch = value => setSearchText(value);

  // Making a search request
  useEffect(() => {
    if (searchText) {
      setLoading(true)
      axios.get(`${API}/search?q=${searchText}`)
        .then(res => {
          res.data && setData(res.data.collection.items);
          res.data && setLoading(false)
        })
    }
  }, [searchText]);

  // Spinner
  const renderSpinner = () => (
    <div className='loading'>
      <div className="loading-text">Content is loading, please wait...</div>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )

  const renderContent = () => {
    return (
      <Grid container spacing={4}>
        {
          data?.map(({ links }) => {


            return links?.map(({ href }) => {
              return (
                <img className="mars-image" src={href} alt='img' />
              )
            })
          })
        }
      </Grid>
    )
  }

  return (
    <div className="apod">
      <h1 className="apod-title">NASA Image & Video Library</h1>
      <Search
        placeholder="Start typing to search various NASA images"
        allowClear
        onSearch={onSearch}
        style={{ width: 800, margin: '0 10px' }}
      />
      {loading && renderSpinner()}
      {data && <div className="nasa-library-wrapper">{renderContent()}</div>}
    </div>
  );
};


export default Apod;