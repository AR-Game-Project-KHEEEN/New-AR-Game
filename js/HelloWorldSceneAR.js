'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';


import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroQuad,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations
} from 'react-viro';


export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);


    }



    collisionCalculate = () => {

      this.props.arSceneNavigator.viroAppProps.updateScore()

  }





  render() { 

    return ( 

      <ViroARScene onTrackingUpdated={this._onInitialized} > 
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> 
        <ViroAmbientLight color={"#aaaaaa"} /> 
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} 
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        <ViroARPlaneSelector>
            
            <ViroNode position={[0,-3,-2]}>
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

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Choose a place to start the game"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  black: {
    diffuseTexture: require('./res/black.jpg'),
  },
  white: {
    diffuseTexture: require('./res/white.jpg')
  },
  button: {
    diffuseTexture: require('./res/button_base.jpg')

  }
});

ViroMaterials.createMaterials({

  grid2: {

    diffuseTexture: require('./res/test-grid.png'),

  },

});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});


module.exports = HelloWorldSceneAR;