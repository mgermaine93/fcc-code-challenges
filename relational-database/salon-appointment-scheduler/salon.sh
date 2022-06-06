#! /bin/bash

# store the psql variable for later use
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

# print out welcome message
echo -e "\n~~~~~ Welcome to My Salon ~~~~~\n"

# the main function
MAIN_MENU() {

  # prints out any additional arguments/messages that the user/script may have supplied (errors, etc.)
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  echo -e "\nWhat service would you like?\n"

  # get available services
  AVAILABLE_SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")

  # capture necessary service data
  echo "$AVAILABLE_SERVICES" | while read SERVICE_ID BAR SERVICE_NAME
  do
    # print out the service data in the desired format (not sure why this isn't currently passing the test)
    echo "$SERVICE_ID) $SERVICE_NAME"
  done

  # INPUT:  read in the user's desired service
  read SERVICE_ID_SELECTED

  # if input is not a number
  # "^" indicates the start of the pattern
  # "[0-9]+" indicates one or more numbers
  # "$" indicates the end of the pattern
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    # echo "In not a number block"
    # if the service isn't a number, send the user back to the main menu 
    MAIN_MENU "Unfortunately, that service doesn't exist. What would you like today?\n"
  else
    # echo "In yes number block"
    # check if the service is in the database
    SERVICE_ID_RESULT=$($PSQL "SELECT service_id FROM services WHERE service_id=$SERVICE_ID_SELECTED")
    if [[ -z $SERVICE_ID_RESULT ]]
    then
      # if the service isn't in the database, send the user back to the main menu
      MAIN_MENU "Unfortunately, we do not currently offer that service.\n"
    else

      # get the name of the service, to use below
      SERVICE_NAME_SELECTED=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED")
      FORMATTED_SERVICE_NAME_SELECTED=$(echo $SERVICE_NAME_SELECTED | sed 's/ |//')
      # if the service is in the database, continue with booking an appointment...
      # get the customer's information
      echo -e "\nWhat's your phone number?"
      # INPUT:  read in the user's phone number
      read CUSTOMER_PHONE

      # check if the customer is already in the datbase
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")

      # if the customer doesn't currently exist in the database...
      if [[ -z $CUSTOMER_NAME ]]
      then
        # ... get the customer's name
        echo -e "\nWhat's your name?"
        # INPUT:  read in the user's name
        read CUSTOMER_NAME
        # insert the new customer into the database
        # insert new customer
        INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')") 
      fi
      
      # format the customer's name
      FORMATTED_CUSTOMER_NAME=$(echo $CUSTOMER_NAME | sed 's/ |//')

      # ask for the customer's preferred time
      echo -e "\nWhen would you like to schedule that $FORMATTED_SERVICE_NAME_SELECTED appointment, $FORMATTED_CUSTOMER_NAME?"

      # INPUT:  read in the customer's preferred time
      read SERVICE_TIME

      # get the customer's id
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
      echo -e $CUSTOMER_ID

      # insert the appointment with the pertinent information
      INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
      
      # send success message (but don't return to main menu, because the tests will fail)
      echo -e "\nI have put you down for a $FORMATTED_SERVICE_NAME_SELECTED at $SERVICE_TIME, $FORMATTED_CUSTOMER_NAME."
    fi
  fi
}

# actually calls the function so it starts
MAIN_MENU