#! /bin/bash

# store the psql variable for later use
PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

# check if the user supplied any input
if ! [[ $1 ]]
then
  # print out an error message if no input is provided
  echo -e "Please provide an element as an argument."
else
  # capture the user input to be user later
  ELEMENT_CLUE=$1

  # check if the input is an atomic number
  if [[ $ELEMENT_CLUE =~ ^[0-9]+$ ]]
  then
    AVAILABLE_ELEMENT=$($PSQL "SELECT atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type FROM elements INNER JOIN properties USING (atomic_number) INNER JOIN types USING (type_id) WHERE atomic_number=$ELEMENT_CLUE;")
  
  # check if the input is an element symbol (any combination of letters less than or equal to length two, case-insensitive
  elif [[ $ELEMENT_CLUE =~ ^[a-zA-Z]+$ ]] && [[ ${#ELEMENT_CLUE} -le 2 ]]
  then
    AVAILABLE_ELEMENT=$($PSQL "SELECT atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type FROM elements INNER JOIN properties USING (atomic_number) INNER JOIN types USING (type_id) WHERE symbol='$ELEMENT_CLUE';")

  # check if the input is an element name (any combination of letters greater than length two, case-insensitive)
  elif [[ $ELEMENT_CLUE =~ ^[a-zA-Z]+$ ]] && [[ ${#ELEMENT_CLUE} -gt 2 ]]
  then
    AVAILABLE_ELEMENT=$($PSQL "SELECT atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type FROM elements INNER JOIN properties USING (atomic_number) INNER JOIN types USING (type_id) WHERE name='$ELEMENT_CLUE';")
  fi

  # check if the query returned any results
  if [[ -z $AVAILABLE_ELEMENT ]]
  then
    # if the query results are empty, return an error message
    echo "I could not find that element in the database."
  else
    # if there is a valid query result, construct the output
    echo "$AVAILABLE_ELEMENT" | while read ATOMIC_NUMBER BAR SYMBOL BAR NAME BAR ATOMIC_MASS BAR MELTING_POINT BAR BOILING_POINT BAR TYPE
    do
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
    done
  fi
fi
