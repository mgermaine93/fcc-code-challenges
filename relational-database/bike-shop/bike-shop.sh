#!/bin/bash

# dump database with "pg_dump -cC --inserts -U freecodecamp universe > universe.sql"

# sets the psql variable so it can be used to query the database later
PSQL="psql -X --username=freecodecamp --dbname=bikes --tuples-only -c"

echo -e "\n~~~~~ Bike Rental Shop ~~~~~\n"

# main function
MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  echo "How may I help you?"
  echo -e "\n1. Rent a bike\n2. Return a bike\n3. Exit"
  read MAIN_MENU_SELECTION
  case $MAIN_MENU_SELECTION in
    1) RENT_MENU ;;
    2) RETURN_MENU ;;
    3) EXIT ;;
    *) MAIN_MENU "Please enter a valid option." ;;
  esac
}

RENT_MENU() {
  # get available bikes
  AVAILABLE_BIKES=$($PSQL "SELECT bike_id, type, size FROM bikes WHERE available='true' ORDER BY bike_id;")
  # if no bikes available
  if [[ -z $AVAILABLE_BIKES ]]
  then
    # send to main menu
    MAIN_MENU -e "\nSorry, we don't have any bikes available right now.\n"
  else
    # display available bikes
    echo -e "\nHere are the bikes we have available:"
    echo "$AVAILABLE_BIKES" | while read BIKE_ID BAR TYPE BAR SIZE
    do
      echo "$BIKE_ID) $SIZE\" $TYPE Bike"
    done
    # ask for bike to rent
    echo -e "\nWhich one would you like to rent?"
    read BIKE_ID_TO_RENT
    # if input is not a number
      # "!" means "not"
      # "=~" means "compare"
      # "^" means the start, "$" means the end
      # "[0-9]+" means "at least one number from 0-9"
    if [[ ! $BIKE_ID_TO_RENT =~ ^[0-9]+$ ]]
    then
      # send to main menu
      MAIN_MENU "That is not a valid bike number."
    else
      # get bike availability
      # if not available
      # send to main menu
    fi
  fi
}

RETURN_MENU() {
  echo "Return Menu"
}

EXIT() {
  echo -e "\nThank you for stopping in.\n"
}

MAIN_MENU
