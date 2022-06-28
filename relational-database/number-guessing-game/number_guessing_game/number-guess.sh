#! /bin/bash

# store the psql variable for later use
PSQL="psql --username=freecodecamp --dbname=number_guessing_game -t --no-align -c"

NUMBER_GUESSING_GAME() {

  # ask the user for their username
  echo -e "Enter your username:"

  # read in the user-input username
  read -r USERNAME

  # check if the user already exists in the database
  USERNAME_RESULT=$($PSQL "SELECT username FROM users WHERE username='$USERNAME';")

  if [[ -z $USERNAME_RESULT ]]
  then
    # greet the new user
    echo -e "Welcome, $USERNAME! It looks like this is your first time here."
    # add the new user to the users database
    INSERT_USER_RESULT=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME');")
  else
    # retrieve the number of games played by the existing user
    GAMES_PLAYED=$($PSQL "SELECT COUNT(*) FROM users JOIN games USING (user_id) WHERE username='$USERNAME';")
    # retrieve the best game played by the existing user
    BEST_GAME=$($PSQL "SELECT MIN(num_guesses) FROM games JOIN users USING (user_id) WHERE username='$USERNAME';")
    # greet the existing user
    echo -e "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  fi

  # secret number generation
  # thanks to https://stackoverflow.com/questions/1194882/how-to-generate-random-number-in-bash
  SECRET_NUMBER=$(( $RANDOM % 1000 + 1 ))
  # echo $SECRET_NUMBER

  # actual number guessing part begins here
  echo -e "Guess the secret number between 1 and 1000:"
  read -r GUESS

  NUM_GUESSES=0

  while [[ $GUESS != $RANDOM_NUMBER ]]
  do
    # increment the number of guesses
    ((NUM_GUESSES+=1))

    # thanks to https://stackoverflow.com/questions/4542732/how-do-i-negate-a-test-with-regular-expressions-in-a-bash-script
    # "not an integer" block
    if ! [[ $GUESS =~ ^[0-9]+$ ]]
    then
      echo -e "That is not an integer, guess again:"
      read -r GUESS

    # "less than" block
    elif [[ $GUESS -lt $SECRET_NUMBER ]]
    then
      echo -e "It's higher than that, guess again:"
      read -r GUESS

    # "greater than" block
    elif [[ $GUESS -gt $SECRET_NUMBER ]]
    then
      echo -e "It's lower than that, guess again:"
      read -r GUESS
    
    # "success" block
    elif [[ $GUESS -eq $SECRET_NUMBER ]]
    then
      echo -e "You guessed it in $NUM_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"

      # get the user's information
      USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME';")

      # generate the game_id to save to the database
      # thanks to https://stackoverflow.com/questions/6348902/how-can-i-add-numbers-in-a-bash-script
      MAX_GAME_ID=$($PSQL "SELECT MAX(game_id) FROM games;")
      CURRENT_GAME_ID=$(($MAX_GAME_ID + 1))

      # save the game to the database
      INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(game_id, user_id, num_guesses) VALUES($CURRENT_GAME_ID, $USER_ID, $NUM_GUESSES);")
      
      # break out of the loop
      break
    fi
  done

}

NUMBER_GUESSING_GAME
