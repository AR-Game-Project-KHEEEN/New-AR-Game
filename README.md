# New-AR-Game
This is a new repository of a group project for the course "Software Project II"

<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">AR Block Throwing Game</h3>

  <p align="center">
    AR Game Project by AR-Game-Project-KHEEEN <br/>
    A Student Group Project of Haaga-Helia University of Applied Sciences <br/>
    Made with Viro React <br/>
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
    .
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="js/res/molkkyVideo.gif">

<p>The game is called AR Block Throwing Game. It was inspired by finnish outdoors game called "Mölkky".</br>
This is an augmented reality game where you throw one wooden block at other wooden blocks to knock them down and get points.</br></br>
You play the game through your phones camera view.</p>

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description`



### Built With

* [React.js](https://reactjs.org/)
* [ViroMedia](https://viromedia.com/)



<!-- GETTING STARTED -->
## Getting Started

Game operates on Android and iOS devices.

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Install if you don't already have Node, Python2 (https://www.python.org/downloads/) and JDK
2. Install React Native CLI
   ```sh
   npm install -g react-native-cli
   ```
3. Install ViroMedia app to your phone
   ```sh
   https://play.google.com/store/apps/details?id=com.viromedia.viromedia&hl=fi&gl=US
   ```
4. Clone this repository to your PC
   ```sh
   https://github.com/AR-Game-Project-KHEEEN/New-AR-Game
   ```
5. Unzip node_modules and move the node_modules folder to your root of the project

6. Start the program
  ```sh
  npm start
  ```
  Connect your phone to the same WiFi with your PC</br>
  Start the ViroMedia in your phone</br>
  Choose </> Enter Testbed in the menu from top left corner</br>
  Enter your computers IPv4-address</br>
  Press Go</br>

Known issues in installation:

Installation Issue #1:
If you get this error:

<a>
    <img src="js/res/errorInstalling.png" alt="error">
</a>

node_modules/metro-config/src/defaults/blacklist.js</br> 
Change row 14 in</br></br>
  var sharedBlackList</br> 
  to</br></br>
  var sharedBlacklist = [   

  /node_modules[\/\\]react[\/\\]dist[\/\\].*/, 

  /website\/node_modules\/.*/, 

  /heapCapture\/bundle\.js/, 

  /.*\/__tests__\/.*/ 

  ]; 

<a>
    <img src="js/res/blacklistImage.png" alt="error">
</a>

After that restart the program with npm start

Installation Issue #2:
If you get this error:

Error: Unable to resolve module fbjs/lib/invariant from</br>
C:\ViroSample\node_modules\react-viro\components\Material\ViroMaterials.js: fbjs/lib/nvariant</br> 
could not be found within the project or in these directories: 

  node_modules 

  ..\node_modules 

You need to install fbjs
  ```sh
  npm install fbjs
  ```

After that you might get this error:

Error: Unable to resolve module create-react-class from</br>
C:\ViroSample\node_modules\react-viro\components\ViroMaterialVideo.js:</br> create-react-class could not be found within the project or in these directories: </br>

  node_modules 

  ..\node_modules 

You need to install create-react-class
  ```sh
  npm install create-react-class
  ```

If you get this error:

Console.error: React Native version mismatch. 

JavaScript version: 0.65.1 

Native version: 0.59.9 

Go to package.json and in dependencies-table change "react-native" -version to "^0.59.3"

If you still get an error about not being able to connect to Node server:
Failed to load bundle, could not connect to development server

Check your firewall settings. Choose "Allow an app through firewall". Press Change Setup and press check on every thing that reads Node.js: Server-side Javascript.

If you get the following error: “Error connecting to package server”, double check that your phone and computer are in the same wifi.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] Feature 1
- [] Feature 2
- [] Feature 3
    - [] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.




<!-- AUTHORS -->
## Authors

* [Alhroth Kasper](https://github.com/kasperahlroth)
* [Friman Henry](https://github.com/hffriman)
* [Haikka Essi](https://github.com/haikess)
* [Heikonen Emilia](https://github.com/emiliaheikonenkoulu)
* [Ruuska Eetu](https://github.com/eeturuus)
* [Rytkönen Noora](https://github.com/NooraRytkonen)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AR-Game-Project-KHEEEN/New-AR-Game.svg?style=for-the-badge
[contributors-url]: https://github.com/AR-Game-Project-KHEEEN/New-AR-Game/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AR-Game-Project-KHEEEN/New-AR-Game.svg?style=for-the-badge
[forks-url]: https://github.com/AR-Game-Project-KHEEEN/New-AR-Game/network/members
[stars-shield]: https://img.shields.io/github/stars/AR-Game-Project-KHEEEN/New-AR-Game.svg?style=for-the-badge
[stars-url]: https://github.com/AR-Game-Project-KHEEEN/New-AR-Game/stargazers
[issues-shield]: https://img.shields.io/github/issues/AR-Game-Project-KHEEEN/New-AR-Game.svg?style=for-the-badge
[issues-url]: https://github.com/AR-Game-Project-KHEEEN/New-AR-Game/issues
[license-shield]: https://img.shields.io/github/license/AR-Game-Project-KHEEEN/New-AR-Game.svg?style=for-the-badge
[license-url]: https://github.com/AR-Game-Project-KHEEEN/New-AR-Game/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
