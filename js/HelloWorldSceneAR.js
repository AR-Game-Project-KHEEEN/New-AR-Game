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
  Viro3DObject,
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


  render() { 

    return ( 

      <ViroARScene onTrackingUpdated={this._onInitialized} > 
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> 
        <ViroAmbientLight color={"#aaaaaa"} /> 
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} 
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} /> 
        <ViroARPlaneSelector>
            <ViroNode position={[.5,-.5,-.5]}>
                <ViroQuad

                  position={[0.1, -.5, -.2]}

                  materials={["grid"]}

                  rotation={[-90, 0, 0]}

                  height={7}

                  width={7}

                  physicsBody={{

                  type: "Static",

                  mass:0,

                  }}

                />

                <ViroBox position={[0.1, -.4, -.2]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: false, loop: false}} dragType="FixedToWorld" onDrag= {() => {}}

                  physicsBody={{

                  type:'Dynamic', mass:10,

                  shape:{type:'Box', params:[0.4,0.4,0.2]},

                  force:{value:[0,0,10]},

                  torque:[0,0,0],

                  useGravity: true,

                  }}

                />

                <ViroBox position={[0.7, -.5, -.5]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: false, loop: false}}

                  physicsBody={{

                  type:'Dynamic', mass:10,

                  shape:{type:'Box', params:[0.4,0.4,0.2]},

                  force:{value:[0,0,10]},

                  torque:[0,0,0],

                  useGravity: true,

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
        text : "Hello World!"
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
  grid: {
    diffuseTexture: require('./res/guadalupe_360.jpg'),
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