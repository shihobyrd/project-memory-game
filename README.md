# Memory Game Project

This is one of the projects that I worked on to complete Front-End Web Developer Nanodegree Program on Udacity. A HTML file, a CSS file, and a JavaScript file were provided from Udacity. Also, a shuffle function which will be mentioned below in the dependencies section, numerous helpful comments and directions were written in the JavaScript file. I coded most of the JavaScript functions and edited some elements and classes in the HTML file and CSS file as well. Since I created the game responsive, this game should work on any devices.

## Dependencies
The shuffle function was provided by Udacity which they from the following website:
 :http://stackoverflow.com/a/2450976

## Overview

First you will see 16 black cards on a deck when you open this game. There are 8 matching symbols on those cards and the player has to click on those cards to flip it over. The player should click on other card which is not opened yet. When the symbol of the 2 open cards are matching, the color of those matching cards will turn from #02b3e4 to  #02ccba. If the symbol of the 2 open cards are not matching, they will be flipped over and turn to black again.

On top of the screen, the following is displayed:

  1. The numbers of moves - selecting matching cards are not consider as move, which means it is 0 move.
  2. The numbers of stars: 
   * when the game is completed within 0 to 10 moves, 3 stars will be displayed.
   * when the game is completed within 11 to 15 moves, 2 stars will be displayed.
   * when the game is completed more than 15 moves, 1 stars will be displayed.
  3. A timer - starts when the first card is clicked and it stops when the last matching cards are found.
  4. A reset button - shuffles the cards and create a new deck to start a new game, resets the number of moves and stars and timer, when it is clicked.
  
When all the matching cards all found, the modal window pops up and the following will be displayed:

  * the numbers of moves
  * the numbers of stars
  * how much time it took
  * exit button - closes the modal window.
  * new game button - creates a new game.
