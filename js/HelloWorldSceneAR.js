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
      text : "Initializing AR...",
      firework : false
    };
    // Activating onInialized (Look at the rows 43-53)
    this._onInitialized = this._onInitialized.bind(this);
    }

    // COLLIDE FUNCTIONS FOR EACH OBJECT:
    _onCollide1 = () => { this.props.arSceneNavigator.viroAppProps.updateScore1(); this.setState({firework: true});} 
    _onCollide2 = () => { this.props.arSceneNavigator.viroAppProps.updateScore2(); this.setState({firework: true});} 
    _onCollide3 = () => { this.props.arSceneNavigator.viroAppProps.updateScore3(); this.setState({firework: true});}
    _onCollide4 = () => { this.props.arSceneNavigator.viroAppProps.updateScore4(); this.setState({firework: true});} 
    _onCollide5 = () => { this.props.arSceneNavigator.viroAppProps.updateScore5(); this.setState({firework: true});}
    _onCollide6 = () => { this.props.arSceneNavigator.viroAppProps.updateScore6(); this.setState({firework: true});} 
    _onCollide7 = () => { this.props.arSceneNavigator.viroAppProps.updateScore7(); this.setState({firework: true});}
    _onCollide8 = () => { this.props.arSceneNavigator.viroAppProps.updateScore8(); this.setState({firework: true});} 
    _onCollide9 = () => { this.props.arSceneNavigator.viroAppProps.updateScore9(); this.setState({firework: true});}
    _onCollide10 = () => { this.props.arSceneNavigator.viroAppProps.updateScore10(); this.setState({firework: true});}



  // Creating the function _onInitialized, which
  // enables the AR's tracking mechanism and also
  // shows a text on the screen
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : ""
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  boxContent = ({ 
    type:'Dynamic', mass: 10,
    //shape:{type:'Box', params:[ .7, .7, .7]},
    force:{value:[0,0,10]},
    torque:[0,0,0],
    useGravity: true,
    friction: 1,
  })

  playerContent = ({
    type:'Dynamic', mass: 50,
    shape:{type:'Box', params:[1, 1, 1]},
    force:{value:[0,0,10]},
    torque:[0,0,0],
    useGravity: true,
    friction: 1,
  })


// PARTICLE CONTENTS:
// --> SOME OF THE PARTICLE EMITTER ATTRIBUTES IS PUT HERE
//     IN ORDER TO REDUCE THE AMOUNT OF CODE ROWS
//
// IMAGE CONTAINS THE SOURCE OF THE PARTICLE
    image= ({
      source:require("./res/white.png"),                 
      height:0.1,
      width:0.1,
      bloomThreshold:0.0
    })
    
// SPAWN BEHAVIOR DEFINES THE MOVEMENT OF PARTICLES
    spawnBehavior=({
      particleLifetime:[1200,1200],
      emissionRatePerSecond:[0, 0], 
      emissionBurst: [
        {time:0, min:300, max:350, cycles:0}
      ],
      spawnVolume:{shape:"sphere", params:[0.15], spawnOnSurface:true},
      maxParticles:1000
    })

// PARTICLE APPEARANCE DEFINES THE PRESENCE OF PARTICLES
    particleAppearance=({
      opacity:{
        initialRange:[1.0, 1.0],
        interpolation:[
          {endValue:0.0, interval:[800,1200]}
        ]
      },  
    })

// PARTICLE PHYSICS DEFINES THE PHYSICS OF THE PARTICLE 
    particlePhysics=({
      velocity:{
      initialRange:[[-2,-.5,0], [2,-3.5,0]]}
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
        
        
        {/* When the player has selected the game area, all the 
               objects inside the ViroNode are rendered: */}
            <ViroNode position={[0, -3, -2]}>
            
            {/* CONTENTS OF VIRONODE: */}

            {/* 1. ViroQuad 
                --> the "floor" of the game */}
                <ViroQuad position={[0, -8, -2]} materials={["grid2"]} rotation={[-90, 0, 0]} height={40} width={40}
                  physicsBody={{
                  type: "Static",
                  mass:0,
                  }}
                />
                
            {/* 2. Player's ViroBox 
                --> The player object that can be dragged and thrown in the environment
                --> Has dynamic rigidbody and uses gravity in order to follow the physics
                --> Also uses friction in order to control the sliding */}
                <Viro3DObject position={[0.1, -2, -2]} scale={[0.7, 0.7, 0.7]} rotation={[0, -90, 0]} materials={["molkkyheitto"]} dragType="FixedToWorld" onDrag= {() => {}}                  
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
                <Viro3DObject position={[-2, -2, -8]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky1.glb')}
                  type="GLB" 
                  viroTag="Box1"
                  onCollision={this._onCollide1}
                  physicsBody={this.boxContent}
                />
           
              {/* 4. Target 2
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[2, -2, -8]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky2.glb')}
                  type="GLB" 
                  viroTag="Box2"
                  onCollision={this._onCollide2}
                  physicsBody={this.boxContent}
                />
                 

                {/* 5. Target 3
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[-4, -2, -10]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky3.glb')}
                  type="GLB" 
                  viroTag="Box3"
                  onCollision={this._onCollide3}
                  physicsBody={this.boxContent}
                />


                {/* 6. Target 4
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[4, -2, -10]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky4.glb')}
                  type="GLB" 
                  viroTag="Box4"
                  onCollision={this._onCollide4}
                  physicsBody={this.boxContent}
                />
                  

                {/* 7. Target 5
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[-6, -2, -12]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky5.glb')}
                  type="GLB" 
                  viroTag="Box5"
                  onCollision={this._onCollide5}
                  physicsBody={this.boxContent}
                />
                  

                {/* 8. Target 6
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[6, -2, -12]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky6.glb')}
                  type="GLB" 
                  viroTag="Box6"
                  onCollision={this._onCollide6}
                  physicsBody={this.boxContent}
                />
                

                 {/* 9. Target 7
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[-4, -2, -14]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky7.glb')}
                  type="GLB" 
                  viroTag="Box7"
                  onCollision={this._onCollide7}
                  physicsBody={this.boxContent}
                />
                  

                {/* 10. Target 8
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[4, -2, -14]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky8.glb')}
                  type="GLB" 
                  viroTag="Box8"
                  onCollision={this._onCollide8}
                  physicsBody={this.boxContent}
                />
                  
                {/* 11. Target 9
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[-2, -2, -16]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky9.glb')}
                  type="GLB" 
                  viroTag="Box9"
                  onCollision={this._onCollide9}
                  physicsBody={this.boxContent}
                />


                {/* 12. Target 10
                 --> The target object that the player must hit with their player object
                 --> Activates collisionCalculate when is hit by the player object (-> increases score)
                 --> Has dynamic rigidbody and uses gravity and the friction (like the player object) */}
                <Viro3DObject position={[2, -2, -16]} scale={[1, 1, 1]}
                  source={require('./res/molkky/molkky10.glb')}
                  type="GLB" 
                  viroTag="Box10"
                  onCollision={this._onCollide10}
                  physicsBody={this.boxContent}
                />

                {/* 13. Particle Emitter 
                  --> Creates the Firework effect every time the target objects are hit
                  --> Effect animation is launched inside Target objects' onCollision functions
                */}
                  <ViroParticleEmitter 
                    position={[0, 2, -8]} 
                    duration={500} 
                    visible={true} 
                    delay={0} 
                    run={true} 
                    loop={this.state.firework} 
                    fixedToEmitter={true}
                    image={this.image}
                    spawnBehavior={this.spawnBehavior}
                    particleAppearance={this.particleAppearance}
                    particlePhysics={this.particlePhysics}
                    />

              </ViroNode>          
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