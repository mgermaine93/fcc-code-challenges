#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

### TEAMS TABLE ###

# Script to insert data from games.csv into the worldcup database
PSQL="psql -X --username=freecodecamp --dbname=worldcup --no-align --tuples-only -c"

# Removes data from the tables if there is any data already there
echo $($PSQL "TRUNCATE teams, games")

# Helper function used below
does_team_exist () {
  if [[ "$($PSQL "SELECT * FROM teams WHERE name='$1'")" ]];
  then
    return 0
  else
    return 1
  fi
}

# Ensures that the values read are comma-separated
cat games.csv | while IFS="," read _ _ WINNER OPPONENT _ _

do
  # avoid print the column names to the data tables themselves
  if [[ $WINNER !=  winner]]
  then
    # get winner ID
    WINNER_ID=$($PSQL "SELECT winner_id FROM teams WHERE name='$WINNER'")

  fi

done

# avoid print the column names to data tables themselves
# if [[ $ ]]



### GAMES TABLE ###

# TBD
