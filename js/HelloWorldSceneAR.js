'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';


import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroQuad,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroConstants
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

    // Creating a function that activates the updateScore function
    // (is used when the player object collides with target objects)
    collisionCalculate = () => {
      this.props.arSceneNavigator.viroAppProps.updateScore()
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
            <ViroNode position={[0,-3,-2]}>
            
            {/* CONTENTS OF VIRONODE: */}

            {/* 1. ViroQuad 
                --> the "floor" of the game */}
                <ViroQuad
                  position={[0, -3, -2]}
                  materials={["grid2"]}
                  rotation={[-90, 0, 0]}
                  height={8}
                  width={8}
                  physicsBody={{
                  type: "Static",
                  mass:0,
                  }}
                />
                
            {/* 2. Player's ViroBox 
                --> The player object that can be dragged and thrown in the environment
                --> Has dynamic rigidbody and uses gravity in order to follow the physics
                --> Also uses friction in order to control the sliding */}
                <ViroBox position={[0.1, -.4, -.2]} scale={[.3, .3, .1]} materials={["black"]} dragType="FixedToWorld" onDrag= {() => {}}
                  viroTag="player"
                  key="player"
                  physicsBody={{
                  type:'Dynamic', mass:10,
                  shape:{type:'Box', params:[ .4, .4, .2 ]},
                  force:{value:[0,0,10]},
                  torque:[0,0,0],
                  useGravity: true,
                  friction: 1,
                  }}
                />

            {/* 3. Target ViroBox
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <ViroBox position={[0.7, -.5, -.5]} scale={[.3, .3, .1]} materials={["white"]}
                  viroTag="box"
                  key="box"
                  onCollision={this.collisionCalculate}
                  physicsBody={{
                  type:'Dynamic', mass:10,
                  shape:{type:'Box', params:[ .4, .4, .2]},
                  force:{value:[0,0,10]},
                  torque:[0,0,0],
                  useGravity: true,
                  friction: 0.5,
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
});

// Defining the material for the ViroQuad (the "floor")
ViroMaterials.createMaterials({
  grid2: {
    diffuseTexture: require('./res/test-grid.png'),
  },
});


module.exports = HelloWorldSceneAR;