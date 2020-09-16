import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import DropDown from "./components/DropDown";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import "./App.css";

const API_KEY = "WNzh8sYZHvSXUTVYwmPKR3hwtOySWlfsM8I3gZ1a";
const API = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

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
  const [roverValue, setRoverValue] = useState(null);
  const [pageValue, setPageValue] = useState(null);
  const [showNoPhotosError, setShowNoPhotosError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    buttonPressed && axios.get(`${API}${roverValue}/photos?sol=${solValue}&camera=${cameraValue}&api_key=${API_KEY}`)
      .then(res => {
        const photosData = res.data.photos;
        if (photosData.length > 0) {
          setShowNoPhotosError(false)
          setPhotos(photosData);
        } else if (photosData.length === 0) {
          setShowNoPhotosError(true);
        }
        setButtonPressed(true);
      })
  }, [buttonPressed]);


  const roverOptions = [
    { value: "curiosity", label: "Curiosity" },
    { value: "opportunity", label: "Opportunity" },
    { value: "spirit", label: "Spirit" },
  ];

  const cameraOptions = [
    { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
    { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
    { value: "MAST", label: "Mast Camera" },
    { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
    { value: "MAHLI", label: "Mars Hand Lens Imager" },
    { value: "MARDI", label: "Mars Descent Imager" },
    { value: "NAVCAM", label: "Navigation Camera" },
    { value: "MINITES", label: "Miniature Thermal Emission Spectrometer (Mini-TES)" },
  ];

  // Methods
  const onSubmit = (e) => {
    e.preventDefault();
    setButtonPressed(true)
  }

  return (
    <div className="app">
      <div className="welcome">Welcome to Mars photo finder!</div>
      <div className="hint-text">Please select options below to begin:</div>
      <form onSubmit={(e) => onSubmit(e)}>
        <FormControl className={classes.formControl}>
          <DropDown
            required
            className="drop-down"
            label="Rover"
            id="rover"
            options={roverOptions}
            onClick={setRoverValue}
          />
          <DropDown
            required
            className="drop-down"
            label="Camera"
            id="age"
            options={cameraOptions}
            onClick={setCameraValue}
          />
          <TextField
            required
            id="standard-number"
            label="Number"
            type="number"
            className="text-field"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setSolValue(e.target.value)}
          />

          <Button className="submit-button" type="submit" style={{ margin: "20px" }} variant="contained">Search Photos</Button>
        </FormControl>
      </form>

      <div>
        {
          (typeof photos !== 'undefined' && photos.length > 0) &&
          <Grid container spacing={3}>
            {
              photos.map(({img_src}, index) => {
                return (
                  <img className="mars-image" key={index} src={img_src} alt="image of mars rover"/>
                );
              })}
          </Grid>
        }
        { showNoPhotosError &&
          <div className="no-photos">
            No photos for your request where found. Please try again with another options!
          </div>
        }
      </div>
    </div>
  );
}