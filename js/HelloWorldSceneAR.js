'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ViroButton, ViroScene } from 'react-viro';
import { ViroFlexView } from 'react-viro';
import { ViroImage } from 'react-viro';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

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

    collisionEffect = () => {

      console.log("Törmäys onnistui");
 
    }

  render() { 

    return ( 

      <ViroARScene onTrackingUpdated={this._onInitialized} > 
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> 
        <ViroAmbientLight color={"#aaaaaa"} /> 
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} 
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        <ViroFlexView style={{flexDirection: 'row', padding: .1}} 
              width={5.0} height={5.0} 
              position={[-5.0, 0.0, -2.0]}
              rotation={[0, 45, 0]} >
        <ViroImage source={require('./res/button_base.jpg')} style={{flex: .5}} />
        </ViroFlexView>

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

                <ViroBox position={[0.1, -.4, -.2]} scale={[.3, .3, .1]} materials={["black"]} animation={{name: "rotate", run: false, loop: false}} dragType="FixedToWorld" onDrag= {() => {}}

                  physicsBody={{

                  type:'Dynamic', mass:10,

                  shape:{type:'Box', params:[0.4,0.4,0.2]},

                  force:{value:[0,0,10]},

                  torque:[0,0,0],

                  useGravity: true,

                  friction: 1,

                  }}

                />

                <ViroBox position={[0.7, -.5, -.5]} scale={[.3, .3, .1]} materials={["white"]} animation={{name: "rotate", run: false, loop: false}}

                  physicsBody={{

                  type:'Dynamic', mass:10,

                  shape:{type:'Box', params:[0.4,0.4,0.2]},

                  force:{value:[0,0,10]},

                  torque:[0,0,0],

                  useGravity: true,

                  friction: 0.5,

                  viroTag: "Box",

                  onCollision={collisionEffect}

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