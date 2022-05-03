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
echo $($PSQL "TRUNCATE teams, games RESTART IDENTITY;")

# Helper function used below
does_team_exist () {
  TEAM_RESULT="$($PSQL "SELECT * FROM teams WHERE name='$1'")"
  if [[ -z $TEAM_RESULT ]];
  then
    # 1 is returned if the team does NOT exist in the table
    echo 1
    return 1
  else
    # 0 is returned if the team DOES exist in the table
    echo 0
    return 0
  fi
}

# Ensures that the values read are comma-separated
cat games.csv | while IFS="," read _ _ WINNER OPPONENT _ _

do
  # check if either the winner or the opponent are already in the table
  # avoid adding the column names to the data tables themselves
  if [[ $WINNER != winner ]] && [[ $OPPONENT != opponent ]]
  then
    WINNER_TEAM_EXISTS=$(does_team_exist "$WINNER")
    # if the winning team does not exist in the table using the function above...
    if [[ $WINNER_TEAM_EXISTS -eq 1 ]]
    then
      # insert winning team
      INSERT_WINNER_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")
      if [[ $INSERT_WINNER_TEAM_RESULT == 'INSERT 0 1' ]]
      then
        echo "Inserted into teams, $WINNER"
      fi
    fi
    OPPONENT_TEAM_EXISTS=$(does_team_exist "$OPPONENT")
    if [[ $OPPONENT_TEAM_EXISTS -eq 1 ]]
    then
      # insert opponent team
      INSERT_OPPONENT_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")
      if [[ $INSERT_OPPONENT_TEAM_RESULT == 'INSERT 0 1' ]]
      then
        echo "Inserted into teams, $OPPONENT"
      fi
    fi
  fi
done

### GAMES TABLE ###
# this will be a little bit trickier to do...

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS

do
  # insert each row as-is from the games.csv file
  # but replace the team names with the team_ids

  # avoid adding the column names to the data tables themselves
  if [[ $YEAR != year ]] && [[ $ROUND != round ]] && [[ $WINNER != winner ]] && [[ $OPPONENT != opponent ]] && [[ $WINNER_GOALS != WINNER_GOALS ]] && [[ $OPPONENT_GOALS != OPPONENT_GOALS ]]
  then
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")
    # insert winning team
    INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES('$YEAR', '$ROUND', '$WINNER_ID', '$OPPONENT_ID', '$WINNER_GOALS', '$OPPONENT_GOALS')")
    if [[ $INSERT_GAME_RESULT == 'INSERT 0 1' ]]
    then
      echo "Inserted into games: $YEAR', '$ROUND', '$WINNER_ID', '$OPPONENT_ID', '$WINNER_GOALS', '$OPPONENT_GOALS'"
    fi
  fi

done

