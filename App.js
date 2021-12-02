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

import GameScene from './js/GameScene';


import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { StatusBar } from 'react-native';


// Creating game states that define the current state of the game
//   When the player is in the menu, the game state is "Menu"
//   When the player is playing the actual game, the game state is "InGame"
const GAME_STATES = {
  MENU: Symbol("Menu"),
  IN_GAME: Symbol("InGame"),
}


export default class App extends Component {

  // In the beginning of the game (when the player is in the menu),
  // the current game state is "Menu", and the score variable is set to -55
  state = {
    score: -55,
    gamestate: GAME_STATES.MENU
  }

  // Creating a function startGame, which 
  // changes the game state into "InGame"
  startGame = () => {
    this.setState({
      gamestate: GAME_STATES.IN_GAME
    })
  }

  // Creating a function backToMenu, which is used
  // when the player wants to return from the actual
  // game into the main menu:
  // ---> The game state is changed to "Menu",
  //      and the score is set as -55
  backToMenu = () => {
    this.setState({
      score: -55,
      gamestate: GAME_STATES.MENU
    })
  }

  // Creating multiple updateScore functions that increase
  // the player's score during the actual gameplay:
  // ----> the score variable's value is increased by a number
  //       based on the target object's number (from 1 to 10)
  
  updateScore = (score) => {
    this.setState({
      score: this.state.score + score
    })
  }


  // Creating a render function, which
  // renders the right content based on
  // the current game state:
  // --> if the game state is "Menu", the content 
  //          of renderUI is shown on the screen
  // --> if the game state is "InGame", the content
  //          of renderGameView is shown on the screen
  render() {
    switch (this.state.gamestate) {
      case GAME_STATES.MENU:
        return this.renderUI()
      case GAME_STATES.IN_GAME:
        return this.renderGameView()
    }
  }


  // Creating a function renderUI, which is used to
  // to show the main menu screen when starting the game:
  // ---> The menu consists of different Text objects:
  //         1. The name of the game ("Mölkkypeli" for now...)
  //         2. The name of the current page (if game state is "Menu" -> Main Menu, otherwise MÖLKKYPELI)
  //         3. A set of instructions for the game (shown only when the game state is "Menu")
  // ---> The menu also consists of one TouchableHighlight object (screen button)
  //         1. Start Game --> a button that activates the function startGame
  renderUI() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>AR Block Throwing Game</Text>
          <Text style={localStyles.titleText}>
            { this.state.gamestate === GAME_STATES.MENU ? "MAIN MENU" : "MÖLKKYPELI" }
          </Text>
          { this.state.gamestate === GAME_STATES.MENU && 
            <Text style={localStyles.text}>
                How to play:
                Try to hit all the blocks
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


    // Creating a function setGameReady, which
    // does preparations for the upcoming game
    setGameReady = () => {
      this.setState({
        planeSelected: true
      })
    }

    // Creating a function renderGameView, which shows
    // the user interface screen during the gameplay:
    //  ---> first, there is ViroARSceneNavigator object,
    //       which enables the updateScore function and
    //       uses the GameScene file as the game's
    //       current scene (it becomes the content of the game)
    //  ---> next, there are two TouchableHighlight objects:
    //       1. Back = button that activates backToMenu function
    //       2. Score = text that shows the value of the score variable
  renderGameView() {
    return(
      <View style={localStyles.flex}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator
            viroAppProps={{
            updateScore: this.updateScore,
            }}
            initialScene={{ scene: GameScene }}
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


// Style definitions of this file
// --> Defines the look and alignment of
//     different texts, buttons etc.
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


module.exports = App