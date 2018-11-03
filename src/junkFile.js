                {
                    this.state.route === 'home'
                    ?   <div>
                            <Logo />
                            <Rank />
                            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
                        </div>
                    :   (
                            this.state.route === 'signin'
                            ? <Signin onRouteChange={this.onRouteChange}/>
                            : <Register onRouteChange={this.onRouteChange}/>
                        )
                }