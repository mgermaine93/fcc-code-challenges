#! /bin/bash

# store the psql variable for later use
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

# print out welcome message
echo -e "\n~~~~~ Welcome to My Salon ~~~~~\n"
echo -e "How can I help you?\n"

# the main function
MAIN_MENU() {

  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  # get available services
  AVAILABLE_SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")

  # capture necessary service data
  echo "$AVAILABLE_SERVICES" | while read SERVICE_ID BAR SERVICE_NAME
  do
    # print out the service data in the desired format (not sure why this isn't currently passing the test)
    echo "$SERVICE_ID) $SERVICE_NAME"
  done

  # read in the user's desired service
  read SELECTED_SERVICE_ID

  # if input is not a number
  # "^" indicates the start of the pattern
  # "[0-9]+" indicates one or more numbers
  # "$" indicates the end of the pattern
  if [[ ! $SELECTED_SERVICE_ID =~ ^[0-9]+$ ]]
  then
    # echo "In not a number block"
    # if the service isn't a number, send the user back to the main menu 
    MAIN_MENU "Unfortunately, that service doesn't exist. What would you like today?\n"
  else
    # echo "In yes number block"
    # check if the service is in the database
    SELECTED_SERVICE_ID_IN_DB=$($PSQL "SELECT service_id FROM services WHERE service_id=$SELECTED_SERVICE_ID")
    if [[ -z $SELECTED_SERVICE_ID_IN_DB ]]
    then
      # if the service isn't in the database, send the user back to the main menu
      MAIN_MENU "Unfortunately, we do not offer that service.  What would you like today?\n"
    else
      # if the service is in the database, continue with booking an appointment...
      echo "Yay!"
      # to be continued...
    fi
  fi
}

# actually calls the function so it starts
MAIN_MENU