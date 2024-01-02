import React, { useState, useEffect, useRef } from "react";
import ColorThief from '../node_modules/colorthief/dist/color-thief.umd'
import axios from "axios";
import StartPage from './components/StartPage';
import Quote from './components/Quote';
import Socials from "./components/Socials";
import './assets/styles/App.css';

export default function App() {

  const [ domColor, setDomColor ] = useState("rgb(255,255,255)"); 
  const [ category, setCategory ] = useState("city,night");
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ isStarted, setIsStarted ] = useState(false);

  const appRef = useRef(null);

  useEffect(() => {

    const updateBackground = async () => {

      // Oh god, thank you Igor Grange for this part of code, damn
      // Convert the image to base64 to avoid duplicate request of the colorthief and background image
      const image = await axios.get(`https://source.unsplash.com/random/1400x1024/?${category}`, {
        responseType: "arraybuffer"
      })
      const imageBuffer = btoa(
        new Uint8Array(image.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      const imageBase64 = `data:${image.headers['content-type'].toLowerCase()};base64,${imageBuffer}`;

      const img = new Image();

      img.crossOrigin = "Anonymous"
      img.src = imageBase64
      await img.decode();
      
      appRef.current.style.backgroundImage = `url(${img.src})`;
      
      const ct = new ColorThief();
      const palatte = await ct.getPalette(img)
      
      const filterLightColor = palatte.filter(color => {
        const r = color[0], g = color[1], b = color[2]
        const average = (r + g + b) / 3
        if(average >= 120) {
          return true;
        }
        return false;
      })

      const pickColor = Math.floor(Math.random() * filterLightColor.length)
      const pickedColor = filterLightColor.length != 0 ? filterLightColor[pickColor] : [240, 240, 240]; // Dont make it much lighter

      const [ r, g, b ] = pickedColor;
      setDomColor(`rgb(${r}, ${g}, ${b})`)
      setIsLoaded(true)
    }

    updateBackground()
  }, [ category ])

  return (
    <div className="App" ref={appRef}>
      {
        !isStarted
        ? <StartPage 
            domColor={domColor}
            setCategory={setCategory}
            setIsStarted={setIsStarted}
          />
        : <Quote 
            domColor={domColor}
            isLoaded={isLoaded}
            setCategory={setCategory}
            setIsLoaded={setIsLoaded}
          />
      }
      <Socials domColor={domColor} />
    </div>
  );
}