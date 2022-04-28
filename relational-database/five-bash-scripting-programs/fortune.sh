#!/bin/bash

# Program to tell a person's fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=(
  "Yes"
  "No"
  "Maybe"
  "Outlook good"
  "Don't count on it"
  "Ask again later"
)

GET_FORTUNE() {
  if [[ ! $1 ]]
  then
    echo "Ask a yes or no question:"
  else
    echo "Try again. Make sure it ends with a question mark:"
  fi
  read QUESTION
}

GET_FORTUNE

# checks to see if the user input ends in a question mark
until [[ $QUESTION =~ \?$ ]]
do
  GET_FORTUNE again
done

N=$((RANDOM % 6))
echo -e "\n${RESPONSES[$N]}"