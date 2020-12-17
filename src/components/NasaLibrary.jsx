import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./nasa-library.css";

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
          data && setData(res.data);
          data && setLoading(false)
        })
    }
  }, [searchText]);

  console.log(searchText, data)

  // Spinner
  const renderSpinner = () => (
    <div className='loading'>
      <div className="loading-text">Content is loading, please wait...</div>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )

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
    </div>
  );
};


export default Apod;