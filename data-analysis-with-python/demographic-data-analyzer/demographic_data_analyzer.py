# this version is passing 7 of the 10 tests

import pandas as pd

# What country has the highest percentage of people that earn >50K and what is that percentage?
# Identify the most popular occupation for those who earn >50K in India.
# Use the starter code in the file demographic_data_anaylizer. Update the code so all variables set to "None" are set to the appropriate calculation or code. Round all decimals to the nearest tenth.


def calculate_demographic_data(print_data=True):
    # Read data from file
    # (Make sure to run main.py from the project directory... otherwise full path name is needed)
    df = pd.read_csv('adult.data.csv')

    # How many of each race are represented in this dataset? This should be a Pandas series with race names as the index labels.
    race_count = df['race'].value_counts()

    # What is the average age of men?
    average_age_men = round((df.loc[df.sex == 'Male', 'age']).mean(), 1)
    # average_age_men = None

    # What is the percentage of people who have a Bachelor's degree?
    # percentage_bachelors = [df.education == "Bachelors"].value_counts(normalize=True) * 100
    count_of_bachelors = df.loc[df["education"] == "Bachelors"].shape[0]
    count_of_everyone = df.shape[0]
    percentage_bachelors = round(
        ((count_of_bachelors / count_of_everyone) * 100), 1)

    # What percentage of people with advanced education (`Bachelors`, `Masters`, or `Doctorate`) make more than 50K?
    # What percentage of people without advanced education make more than 50K?

    # with and without `Bachelors`, `Masters`, or `Doctorate`
    # this gets the count
    count_higher_education = df.loc[(df["education"] == "Bachelors") | (
        df["education"] == "Masters") | (df["education"] == "Doctorate")].shape[0]
    # this gets the percentage
    higher_education = round(
        ((count_higher_education / count_of_everyone) * 100), 1)

    # this gets the count
    count_lower_education = count_of_everyone - count_higher_education
    # this gets the percentage
    lower_education = round(
        ((count_lower_education / count_of_everyone) * 100), 1)

    # higher ed counts with salary ">50K"
    wealthy_bachelors = df.loc[(df["education"] == "Bachelors") & (
        df["salary"] == ">50K")].shape[0]
    wealthy_masters = df.loc[(df["education"] == "Masters") & (
        df["salary"] == ">50K")].shape[0]
    wealthy_doctorates = df.loc[(df["education"] == "Doctorate") & (
        df["salary"] == ">50K")].shape[0]
    # this gets the sum of the count above
    count_wealthy_higher_eds = wealthy_bachelors + \
        wealthy_masters + wealthy_doctorates

    # this gets the percentage (THIS VALUE IS TESTED)
    higher_education_rich = round(
        ((count_wealthy_higher_eds / count_higher_education) * 100), 1)

    # these get the counts
    count_lower_education = df.loc[(df["education"] != "Bachelors") & (
        df["education"] != "Masters") & (df["education"] != "Doctorate")].shape[0]
    count_wealthy_lower_education = df.loc[((df["education"] != "Bachelors") & (
        df["education"] != "Masters") & (df["education"] != "Doctorate")) & (df["salary"] == ">50K")].shape[0]

    # this gets the percentage
    lower_education_rich = round(
        ((count_wealthy_lower_education / count_lower_education) * 100), 1)

    # What is the minimum number of hours a person works per week (hours-per-week feature)?
    min_work_hours = df["hours-per-week"].min()

    # What percentage of the people who work the minimum number of hours per week have a salary of >50K?
    num_min_workers = df[df['hours-per-week'] ==
                         min_work_hours]['hours-per-week'].shape[0]  # count()
    num_rich_min_workers = df.loc[(
        df["hours-per-week"] == min_work_hours) & (df["salary"] == ">50K")].shape[0]

    rich_percentage = round(
        ((num_rich_min_workers / num_min_workers) * 100), 1)

    # What country has the highest percentage of people that earn >50K?
    highest_earning_country = None
    highest_earning_country_percentage = None

    # Identify the most popular occupation for those who earn >50K in India.
    top_IN_occupation = None

    # DO NOT MODIFY BELOW THIS LINE

    if print_data:
        print("Number of each race:\n", race_count)
        print("Average age of men:", average_age_men)
        print(f"Percentage with Bachelors degrees: {percentage_bachelors}%")
        print(
            f"Percentage with higher education that earn >50K: {higher_education_rich}%")
        print(
            f"Percentage without higher education that earn >50K: {lower_education_rich}%")
        print(f"Min work time: {min_work_hours} hours/week")
        print(
            f"Percentage of rich among those who work fewest hours: {rich_percentage}%")
        print("Country with highest percentage of rich:", highest_earning_country)
        print(
            f"Highest percentage of rich people in country: {highest_earning_country_percentage}%")
        print("Top occupations in India:", top_IN_occupation)

    return {
        'race_count': race_count,
        'average_age_men': average_age_men,
        'percentage_bachelors': percentage_bachelors,
        'higher_education_rich': higher_education_rich,
        'lower_education_rich': lower_education_rich,
        'min_work_hours': min_work_hours,
        'rich_percentage': rich_percentage,
        'highest_earning_country': highest_earning_country,
        'highest_earning_country_percentage':
        highest_earning_country_percentage,
        'top_IN_occupation': top_IN_occupation
    }
