/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

import HelloWorldSceneAR from './js/HelloWorldSceneAR';


import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { StatusBar } from 'react-native';

const GAME_STATES = {

  MENU: Symbol("Menu"),
  IN_GAME: Symbol("InGame"),
}


export default class ViroSample extends Component {

  state = {
    score: 0,
    gamestate: GAME_STATES.MENU
  }

  startGame = () => {

    this.setState({

      gamestate: GAME_STATES.IN_GAME
      
    })

  }

  backToMenu = () => {

    this.setState({
      score: 0,
      gamestate: GAME_STATES.MENU
    })
  }

  updateScore = () => {

    this.setState({
      score: this.state.score + 1
    })
  }

  render() {

    switch (this.state.gamestate) {

      case GAME_STATES.MENU:
        return this.renderUI()
      case GAME_STATES.IN_GAME:
        return this.renderGameView()
    }
  }


  renderUI() {

    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>Mölkkypeli</Text>
          <Text style={localStyles.titleText}>
            { this.state.gamestate === GAME_STATES.MENU ? "MAIN MENU" : "MÖLKKYPELI" }
          </Text>
          { this.state.gameState === GAME_STATES.MENU && 
            <Text style={localStyles.text}>
                How to play:
                1. Select a grey area in your environment
                2. Enjoy the game
            </Text>
          }

          <TouchableHighlight style={localStyles.buttons}
            onPress={this.startGame}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Start Game</Text>
          </TouchableHighlight>

        </View>
      </View>
      );
    }


    setGameReady = () => {

      this.setState({

        planeSelected: true

      })
    }


  renderGameView() {

    return(

      <View style={localStyles.flex}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator
            viroAppProps={{
            level: this.state.level,
            changeLevel: this.changeLevel,
            updateScore: this.updateScore,
            looseLive: this.looseLive,
            levelGUIRender: this.renderLevelStartGUI
            }}
            initialScene={{scene: HelloWorldSceneAR }}
        />

        <View style={localStyles.topMenu}>
          <TouchableHighlight style={localStyles.buttons}
            underlayColor={'#68a0ff'}
            onPress={this.backToMenu}>
              <Text style={localStyles.buttonText}>
                Back
              </Text>
          </TouchableHighlight>
          <TouchableHighlight style={localStyles.buttons}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>
              { this.state.score }
            </Text>
          </TouchableHighlight>

        </View>

      </View>
    
    );
  }
}

var localStyles = StyleSheet.create({
  viroContainer : {
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  topMenu: {
    width : '100%',
    position : 'absolute',
    top : 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex : {
    flex : 1,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },
});


module.exports = ViroSample