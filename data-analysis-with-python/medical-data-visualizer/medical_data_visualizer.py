import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Import data
df = pd.read_csv(filepath_or_buffer='medical_examination.csv')


def get_bmi(row):
    """
    Takes in a row of data from the csv
    """
    height_in_meters = row['height'] / 100
    bmi = round(row['weight'] / height_in_meters**2, 2)
    return bmi


def is_overweight(row):
    """
    Takes in a row of data from the csv
    """
    if row['bmi'] > 25.00:
        return 1
    else:
        return 0

# https://stackoverflow.com/questions/26886653/pandas-create-new-column-based-on-values-from-other-columns-apply-a-function-o


# Add 'overweight' column
df['bmi'] = df.apply(lambda row: get_bmi(row), axis=1)
df['overweight'] = df.apply(lambda row: is_overweight(row), axis=1)

# Normalize data by making 0 always good and 1 always bad.
# If the value of 'cholesterol' or 'gluc' is 1, make the value 0.
# If the value is more than 1, make the value 1.
df['cholesterol'] = df['cholesterol'].apply(lambda row: 0 if row == 1 else 1)
df['gluc'] = df['gluc'].apply(lambda row: 0 if row == 1 else 1)


# Draw Categorical Plot
def draw_cat_plot():

    # Create DataFrame for cat plot using `pd.melt` using just the values from 'cholesterol', 'gluc', 'smoke', 'alco', 'active', and 'overweight'.
    df_cat = pd.melt(
        df,
        id_vars=['cardio'],
        value_vars=[
            'cholesterol',
            'gluc',
            'smoke',
            'alco',
            'active',
            'overweight'
        ]
    )

    # Group and reformat the data to split it by 'cardio'.
    # Show the counts of each feature.
    # You will have to rename one of the columns for the catplot to work correctly.
    df_cat['total'] = 0
    df_cat = df_cat.groupby(
        by=['cardio', 'variable', 'value'],
        as_index=False
    ).count()

    # Draw the catplot with 'sns.catplot()'
    # This was super helpful:  https://www.youtube.com/watch?v=nBL6zEE6r-Q
    data = df_cat  # loads in the data
    sns.set(font_scale=1)  # makes font slightly larger or smaller
    fig = sns.catplot(
        x="variable",
        y="total",
        data=data,
        hue="value",
        kind="bar",
        col="cardio",
        palette="colorblind"  # "magma" is cool, too
    ).fig
    # Do not modify the next two lines
    fig.savefig('catplot.png')
    return fig


# Draw Heat Map
def draw_heat_map():

    # Clean the data... FILTER OUT the following patient segments that represent incorrect data:

    # diastolic pressure is higher than systolic
    cleaned_ap = (df['ap_lo'] <= df['ap_hi'])

    # height is less than the 2.5th percentile and more than the 97.5th percentile
    cleaned_height = (
        (df['height'] >= df['height'].quantile(0.025)) &
        (df['height'] <= df['height'].quantile(0.975))
    )

    # weight is less than the 2.5th percentile and more than the 97.5th percentile
    cleaned_weight = (
        (df['weight'] >= df['weight'].quantile(0.025)) &
        (df['weight'] <= df['weight'].quantile(0.975))
    )

    df_heat = df.loc[
        cleaned_ap &
        cleaned_height &
        cleaned_weight
    ]

    # Drop the 'bmi' column since it is not used in the heatmap.
    df_heat = df_heat.drop('bmi', 1)

    # Calculate the correlation matrix
    corr = df_heat.corr()

    # Generate a mask for the upper triangle
    mask = np.triu(corr)

    # Set up the matplotlib figure
    fig, ax = plt.subplots(figsize=(15, 10))

    # Draw the heatmap with 'sns.heatmap()'
    heatmap = sns.heatmap(
        data=corr,
        annot=True,  # annotates the values of every single square in the heatmap
        fmt='.1f',  # rounds the annotations to one decimal place
        mask=mask,
        cmap="Blues",  # sets the color scheme
        vmin=-1,  # min value displayed in the axis
        vmax=1,  # max value displayed in the axis
        linewidth=1,  # creates fine lines in-between the different boxes
        center=0.0  # centers the entire heatmap
    )
    fig = heatmap.figure

    # Do not modify the next two lines
    fig.savefig('heatmap.png')
    return fig
