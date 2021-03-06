import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import './App.css';

const particleOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800,
            }
        },
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5
            }
        }
    }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    } 

    loadUser = (data) => {
        this.setState({ user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,
        }})
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({ box: box });
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('https://smartbrains-backend.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then((response) => response.json())
        .then(response => {
            if (response) {
                fetch('https://smartbrains-backend.herokuapp.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then((response) => response.json())
                .then((count) => {
                    this.setState(Object.assign(this.state.user, { entries: count }))
                })
                .catch((error) => console.log(error))
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(error => console.log(error));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route });        
    }

    dothis = () => {
        const { imageUrl, route, box } = this.state;
        if (route === 'home') {
            return (
                <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <FaceRecognition box={box} imageUrl={imageUrl}/>
                </div>
            );
        } else if (route === 'signin' || route === 'signout') {
            return (<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>);
        } else if (this.state.route === 'register') {
            return(<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>);
        } else {
            console.log("FUCK ME");
            return null;
        }
    }

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particleOptions} />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
                {
                    this.dothis()
                }
            </div>
        );
    }
}

export default App;
