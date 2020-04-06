# word-guess-game
This project uses HTML, CSS and Javascript to create a word guessing game based on a theme.

This project utilizes image files from external source: Sea and Sky - Fair Use: Educational/Not for Profit use
This project utilizes a sound file from online game: Mabinogi - Fair Use: Educational/Not for Profit use

The bulk of this project lays in the use of Javascript.
Important notes:
* 1. The name in the array directly corelates to the name of the picture in the assets/images directory. Changing the name in the array will therefore break the picture display afterwards unless the picture or the element in the array is renamed.
* 2. Items can be added easily into the arrray by adding them at any point in the array. Please add a picture into the associated images file.
* 3. This project uses a modified Object Oriented approach. The Game class may be removed and placed into linked file for clarity.
* 4. Javascript notes have been added. Please refer to them when looking at the code.
* 5. Project includes link to external repository -- This is my personal portfolio.

Quick Explanations:
* 1. You will notice that I created a nested input reader function. This was done to add the start introduction screen. Make sure you retain the removal of the first input reader, as if you don't remove it, issues begin to crop up. These input readers didn't want to behave in the class itself, so I left them on the bottom as the instantiation of the Game itself.
* 2. I have 2 global variables, the victories are per time the page is open, so it made sense to be outside of the Game class, and I felt it would be less intensive on the browser if it only had to load the array a single time. I have 4 class variables, and each of these were important variables that needed to be accessible by multiple functions, typically my updateFields function. The individual functions may include additional variables as per necessary for keeping track of internal variables.
* 3. I chose to use the class structure for this program in order to ensure that no variables or data bled over outside of the victories. By creating a new game I was able to ensure that all of the old data could be erased and overwritten. In addition, despite some initial difficulties with functions, by wrapping all of the functions necessary inside the program, I was able to keep the class itself running most of the show.
