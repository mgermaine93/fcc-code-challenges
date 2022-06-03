#! /bin/bash

# store the psql variable for later use
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

# print out welcome message
echo -e "\n~~~~~ Welcome to My Salon ~~~~~\n"

MAIN_MENU() {
  # get available services
  AVAILABLE_SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")

  # capture necessary service data
  echo "$AVAILABLE_SERVICES" | while read SERVICE_ID BAR SERVICE_NAME
  do
    # print out the service data in the desired format (not sure why this isn't currently passing the test)
    echo "$SERVICE_ID) $SERVICE_NAME"
  done

  # read in the user's desired service
  read $SELECTED_SERVICE_ID

  # if input is not a number
  # "^" indicates the start of the pattern
  # "[0-9]+" indicates one or more numbers
  # "$" indicates the end of the pattern
  if ! [[ $SELECTED_SERVICE_ID =~ ^[0-9]+$ ]]
  then
    echo "In not a number block"
    MAIN_MENU "Unfortunately, that service does not exist in our database."
  else
    echo "In yes number block"
    $SELECTED_SERVICE_ID_IN_DB=$($PSQL "SELECT service_id FROM services WHERE service_id=$SELECTED_SERVICE_ID")
    if [[ -z $SELECTED_SERVICE_ID ]]
    then
      echo "Empty!"
    else
      echo "Yay!"
    fi
  fi
}

MAIN_MENU