'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroQuad,
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
        <ViroNode position={[.5,-.5,-.5]} dragType="FixedToWorld" onDrag={()=>{}} > 
          <Viro3DObject 
            source={require('./res/emoji_smile/emoji_smile.vrx')} 
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'), 
                require('./res/emoji_smile/emoji_smile_normal.png'), 
                require('./res/emoji_smile/emoji_smile_specular.png')]} 
            position={[0, .15, 0]} 
            scale={[.3, .3, .3]} 
            type="VRX" /> 
        </ViroNode> 
        <ViroNode position={[.5,-.5,-.5]} dragType="FixedToWorld" onDrag={()=>{}} >  
            <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: false, loop: false}} dragType="FixedToWorld" onDrag= {() => {}} 
              physicsBody={{ 
              type:'dynamic', mass:1, 
              force:{value:[0,0,1]}, 
              torque:[0,30,0], 
              velocity: [0,-1,0], 
              }} 
              /> 
              <ViroQuad 
                position={[0, -.5, -1]} 
                materials={["grid"]} 
                rotation={[-90, 0, 0]} 
                height={2} 
                width={2} 
                physicsBody={{ 
                type: "Kinematic", 
                mass:0, 
                }} 
                /> 
        </ViroNode> 
        <ViroARPlaneSelector>
            <ViroNode position={[.5,-.5,-.5]} dragType="FixedToWorld" onDrag={()=>{}} >
              <Viro3DObject
                  source={require('./res/emoji_smile/emoji_smile.vrx')}
                  resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                      require('./res/emoji_smile/emoji_smile_normal.png'),
                      require('./res/emoji_smile/emoji_smile_specular.png')]}
                  position={[0, .15, 0]}
                  scale={[.3, .3, .3]}
                  type="VRX" />
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