import React, { Component } from 'react';
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

const returnClarifaiJSONRequestOptions = (imageUrl) => {
  const PAT = "aeaa2f3f15a04e2eaf05ac651bdf382d";
  const USER_ID = "ma2421hip";
  const APP_ID = "my-first-application";
  const MODEL_ID = "face-detection";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      },
    };
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButonSubmit = () => {
    this.setState({imageUrl: this.state.input});

   fetch(
      "https://api.clarifai.com/v2/models/" +
      "face-detection" +
      "/outputs",
      returnClarifaiJSONRequestOptions(this.state.input)
   )
    .then((response) => response.json())
    .then((response) => console.log("2nd resp", response.outputs[0].data.regions[0].region_info.bounding_box))
    .catch();
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type='fountain' bg={true}/>

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButonSubmit={this.onButonSubmit}
        />
        <FaceRecognition 
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;