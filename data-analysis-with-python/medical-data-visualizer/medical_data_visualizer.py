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
    df_cat = pd.melt(df, id_vars=['cardio'], value_vars=[
                     'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'overweight'])

    # Group and reformat the data to split it by 'cardio'.
    # Show the counts of each feature.
    # You will have to rename one of the columns for the catplot to work correctly.
    df_cat['total'] = 0
    df_cat = df_cat.groupby(
        by=['cardio', 'variable', 'value'],
        as_index=False).count()

    # Draw the catplot with 'sns.catplot()'
    # This was super helpful:  https://www.youtube.com/watch?v=nBL6zEE6r-Q
    data = df_cat  # loads in the data
    sns.set(font_scale=1.1)  # makes font slightly larger
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
    pass
    # # Clean the data
    # df_heat = None

    # # Calculate the correlation matrix
    # corr = None

    # # Generate a mask for the upper triangle
    # mask = None

    # # Set up the matplotlib figure
    # fig, ax = None

    # # Draw the heatmap with 'sns.heatmap()'

    # # Do not modify the next two lines
    # fig.savefig('heatmap.png')
    # return fig


draw_cat_plot()
