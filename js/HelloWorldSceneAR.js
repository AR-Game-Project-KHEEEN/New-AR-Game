'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';


import {
  ViroARScene,
  ViroText,
  ViroQuad,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroConstants,
  Viro3DObject,
  ViroParticleEmitter
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

// Creating a constructor for the HelloWorldSceneAR object
  constructor() {
    super();
    // Set initial state here
    // (The text below appears right after the actual gameplay starts)
    this.state = {
      text : "Initializing AR..."
    };
    // Activating onInialized (Look at the rows 43-53)
    this._onInitialized = this._onInitialized.bind(this);
    }

// HERE ARE ALL THE FUNCTIONS RELATED TO EACH TARGET OBJECT:

    // OBJECT 1
    _onCollide1 = () => {
        this.props.arSceneNavigator.viroAppProps.updateScore1();
}

  // OBJECT 2
    _onCollide2 = () => {
        this.props.arSceneNavigator.viroAppProps.updateScore2()
} 


  // Creating the function _onInitialized, which
  // enables the AR's tracking mechanism and also
  // shows a text on the screen
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Choose a place to start the game"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  boxContent = ({ 
    type:'Dynamic', mass:50,
    //shape:{type:'Box', params:[ .7, .7, .7]},
    force:{value:[0,0,10]},
    torque:[0,0,0],
    useGravity: true,
    friction: 1,
  })

  playerContent = ({
    type:'Dynamic', mass: 50,
    //shape:{type:'Box', params:[ .7, .7, .7]},
    force:{value:[0,0,10]},
    torque:[0,0,0],
    useGravity: true,
    friction: 1,
  })



// Creating a render function that shows the actual game objects
  render() { 

    return ( 
      // First, the ViroARScene is activated:
      // --> contains the whole content of the game scene
      <ViroARScene onTrackingUpdated={this._onInitialized} >

        {/* The state of the onInitialized is shown
            --> Asks the player to put a ViroARPlaneSelector*/}
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> 

        {/* The other definitions for the game environment --> The color and lighting of the game scene */}
        <ViroAmbientLight color={"#aaaaaa"} /> 
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} 
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        
        {/* Before the player can play the game, they need to decide where
            to put the objects of the game scene --> this is done with ViroARPlaneSelector */}
        <ViroARPlaneSelector>
        
        {/* When the player has selected the game area, all the 
               objects inside the ViroNode are rendered: */}
            <ViroNode position={[0, -3, -4]}>
            
            {/* CONTENTS OF VIRONODE: */}

            {/* 1. ViroQuad 
                --> the "floor" of the game */}
                <ViroQuad position={[0, -3, -4]} materials={["grid2"]} rotation={[-90, 0, 0]} height={20} width={20}
                  physicsBody={{
                  type: "Static",
                  mass:0,
                  }}
                />
                
            {/* 2. Player's ViroBox 
                --> The player object that can be dragged and thrown in the environment
                --> Has dynamic rigidbody and uses gravity in order to follow the physics
                --> Also uses friction in order to control the sliding */}
                <Viro3DObject position={[0.1, -2, -.1]} scale={[.7, .7, .7]} materials={["molkkyheitto"]} dragType="FixedToWorld" onDrag= {() => {}}                  
                  source={require('./res/molkky/molkkyHeitto.glb')}
                  type="GLB"
                  viroTag="Player"
                  key="player"
                  physicsBody={this.playerContent}
                />

            {/* 3. Target 1
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[4, -2, -4]} scale={[.7, .7, .7]}
                  source={require('./res/molkky/molkky.glb')}
                  type="GLB" 
                  viroTag="Box1"
                  onCollision={this._onCollide1}
                  physicsBody={this.boxContent}
                />

           
              {/* 4. Target 2
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[4, -2, -.5]} scale={[.7, .7, .7]}
                  source={require('./res/molkky/molkky.glb')}
                  type="GLB" 
                  viroTag="Box2"
                  onCollision={this._onCollide2}
                  physicsBody={{
                  type:'Dynamic', mass:10,
                  shape:{type:'Box', params:[ .3, .3, .8 ]},
                  force:{value:[0,0,10]},
                  torque:[0,0,0],
                  useGravity: true,
                  friction: 5,
                  }}
                />

              <ViroParticleEmitter
                  position={[4, -2, -4]}
                  duration={500}
                  visible={true}
                  delay={0}
                  run={true}
                  loop={false}
                  fixedToEmitter={true}

                  image={{
                    source:require("./res/white.png"),                 
                    height:0.1,
                    width:0.1,
                    bloomThreshold:0.0
                  }}

                  spawnBehavior={{
                    particleLifetime:[1200,1200],
                    emissionRatePerSecond:[0, 0], 
                    emissionBurst: [
                      {time:0, min:300, max:350, cycles:1}
                    ],
                    spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:true},
                    maxParticles:1000
                  }}
  
                  particleAppearance={{
                    opacity:{
                      initialRange:[1.0, 1.0],
                      factor:"time",
                      interpolation:[
                        {endValue:0.0, interval:[800,1200]}
                      ]
                    },  
                  }}
    
                  particlePhysics={{
                    velocity:{
                    initialRange:[[-2,-.5,0], [2,-3.5,0]]}
                  }}
                />

              </ViroNode>
          </ViroARPlaneSelector>
        </ViroARScene>
    ); 
  }
}


// Defining the style of the file
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

// Defining the materials for the 3D objects
// ---> each material name has different texture image
ViroMaterials.createMaterials({
  black: {
    diffuseTexture: require('./res/black.jpg'),
  },
  white: {
    diffuseTexture: require('./res/white.jpg')
  },
  molkky: {
    diffuseTexture: require('./res/molkky/1texture.png')
  },
  molkky2: {
    diffuseTexture: require('./res/molkky/2texture.png')
  },
  molkkyheitto: {
    diffuseTexture: require('./res/molkky/darkwood.jpg')
  }
});

// Defining the material for the ViroQuad (the "floor")
ViroMaterials.createMaterials({
  grid2: {
    diffuseTexture: require('./res/test-grid.png'),
  },
});


module.exports = HelloWorldSceneAR;