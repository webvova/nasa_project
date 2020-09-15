import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import DropDown from "./components/DropDown";
import Button from "@material-ui/core/Button";
import axios from "axios";


const API_KEY = "WNzh8sYZHvSXUTVYwmPKR3hwtOySWlfsM8I3gZ1a";
const API = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function NativeSelects() {
  const classes = useStyles();

  const [solValue, setSolValue] = useState(null);
  const [cameraValue, setCameraValue] = useState(null);
  const [pageValue, setPageValue] = useState(null);
  const [photos, setPhotos] = useState([]);

  
  useEffect(() => {
    axios.get(`${API}?sol=1000&camera=fhaz&api_key=${API_KEY}`)
      .then(res => {
        const photosData = res.data.photos;
        setPhotos(photosData);
      })
  }, []);


  const solOptions = [
    { value: 10, label: "Ten" },
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
  ];

  const roverOptions = [
    { value: 10, label: "Car" },
    { value: 1, label: "Bus" },
    { value: 2, label: "Tramway" },
  ];

  const cameraOptions = [
    { value: "", label: "Fuji" },
    { value: 1, label: "Kodak" },
    { value: 2, label: "Minolta" },
  ];

  return (
    <div>
      <FormControl className={classes.formControl}>
        <DropDown label="Sol" id="sol" options={solOptions} onClick={setSolValue} />
        <DropDown label="Camera" id="age" options={cameraOptions} onClick={setCameraValue} />
        {/*<DropDown label="Rover" id="rover" options={roverOptions} />*/}
        <Button style={{ margin: "20px" }} variant="contained">Search Photos</Button>

        <div style={{ width: "300px", height: "300px" }}>
          {
            photos.length && photos.map(({ img_src }) => {
              return <img src={img_src} alt="image of mars rover" />
            })
          }
        </div>
      </FormControl>
    </div>
  );
}