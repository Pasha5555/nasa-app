import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getPhotos } from './api'
import { Input } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { NativeSelect, InputLabel, Card, CardActionArea, CardContent } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 300,
    backgroundColor: 'grey'
  },
  card: {
    backgroundColor: 'rgba(94, 7, 194, 0.1)',
    borderRadius: 10,
  }
});

const PrettoSlider = withStyles({
  root: {
    color: '#095f77',
    height: 15,
  },
  thumb: {
    height: 36,
    width: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '3px solid #095f77',
    borderRadius: '5px',
    // marginTop: -8,
    // marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 18px)',
  },
  track: {
    height: 24,
    borderRadius: 4,
    opacity: 0.5,

  },
  rail: {
    height: 20,
    border: '3px solid #095f77',
    backgroundColor: 'transparent',
    borderRadius: 4,
    opacity: 0.9,
  },
})(Slider);


function App() {
  const classes = useStyles();
  const [photos, setPhotos] = useState([])
  const [solValue, setSolValue] = useState(0);
  const [camera, setCamera] = useState('');

  useEffect((prev)=>{
      if (solValue && camera) {
        setTimeout(()=>{
          getPhotos(solValue, camera)
            .then(photos => setPhotos(photos.photos))
        }, 5000)
      }
      console.log(prev)
  }, [camera])

  const handleChange = (event, newValue) => {
    setSolValue(newValue);
  };

  console.log(solValue, camera, photos)
  return (
    <div className="App">
      <Card className={classes.card + " app__card-range"}>
        <CardContent>
          <Typography id="range-slider" gutterBottom>
            Range
          </Typography>
          <PrettoSlider
            value={solValue}
            className={classes.range + " range"}
            min={0}
            max={1000}
            onChange={handleChange}
            valueLabelDisplay="auto"
            // aria-labelledby="range-slider"
            aria-labelledby="non-linear-slider"
          />
        </CardContent>
    </Card>
      <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <InputLabel htmlFor="select">Cameras</InputLabel>
            <NativeSelect 
              id="select"
              className="select"
              value={camera}
              onChange={({target}) => setCamera(target.value)}
            >
              <option value="fhaz">FHAZ</option>
              <option value="rhaz">RHAZ</option>
            </NativeSelect>
        </CardContent>
      </CardActionArea>
    </Card>
       <div>
        Photo:
        {
          photos && photos.map(photo => (
            <img 
              width="500px" 
              height='500px' 
              src={photo.img_src}  
              alt="photo"
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
