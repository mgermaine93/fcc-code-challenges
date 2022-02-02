import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress
import numpy as np


def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')

    # Create scatter plot
    x = df['Year']
    y = df['CSIRO Adjusted Sea Level']
    plt.scatter(
        x,
        y,
        s=100,
        alpha=0.6,
        edgecolor='black',
        linewidth=1
    )

    # Create first line of best fit
    first_line_regression = linregress(x, y)

    # Get the slope and y-intercept of the line of best fit
    slope = first_line_regression.slope
    y_intercept = first_line_regression.intercept

    # Have the line of best fit go through year 2050 (remember that range() excludes the final value)
    first_line_x = list(range(1880, 2051))
    first_line_y = []
    for year in first_line_x:
        first_line_y.append(y_intercept + slope * year)

    # Plot the first line of best fit
    plt.plot(
        first_line_x,  # x coordinates
        first_line_y,  # y coordinates
        'r',  # color of the line (red)
        label="First Line of Best Fit (1880 onward)"  # label
    )

    # Create second line of best fit using only data from 2000 onward
    df2 = df.loc[df.Year >= 2000]
    x2 = df2["Year"]
    y2 = df2["CSIRO Adjusted Sea Level"]
    second_line_regression = linregress(x2, y2)

    # Get the slope and y-intercept of the second line of best fit
    slope2 = second_line_regression.slope
    y_intercept2 = second_line_regression.intercept

    # Have the line of best fit go through year 2050 (remember that range() excludes the final value)
    second_line_x = list(range(2000, 2051))
    second_line_y = []
    for year in second_line_x:
        second_line_y.append(y_intercept2 + slope2 * year)

    # Plot the second line of best fit
    plt.plot(
        second_line_x,  # x coordinates
        second_line_y,  # y coordinates
        'g',  # color of the line (green)
        label="Second Line of Best Fit (2000 onward)"  # label
    )

    # Add labels and title
    plt.title("Rise in Sea Level")
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.tight_layout()
    plt.legend()  # adds the legend
    # plt.show()  # shows the plot (commented out so the tests pass)

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()
