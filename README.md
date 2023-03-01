# Hangman

simple Hangman game using JavaScript.
<br>

In this project I used the Fetch API to retrieve words from the JSONs that I made.
This time I also used strict mode, deconstruction of objects and the spread operator.
I had a bug for a while causing somehow unexpected losses at the start of the game, which was caused by adding multiple EventListeners to the same HTML element.
I also had a problem where I would always perform a fetch operation whenever I switched the difficulty/topic or pressed restart. I fixed it by loading the JSONs initially and then returning them on request.

## Features:
- functional Hangman game
- 3 categories
- 3 difficulties
- ASCII Hangman art
- On-screen Keyboard

## Preview Images:

