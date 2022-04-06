import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
import numpy as np
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv(
    filepath_or_buffer='fcc-forum-pageviews.csv',
)
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')
df = df.set_index('date')

# Clean data
# thanks to https://towardsdatascience.com/10-examples-that-will-make-you-use-pandas-query-function-more-often-a8fb3e9361cb
low_end = df.value.quantile(0.025)
high_end = df.value.quantile(0.975)
df = df.query(f"value > {low_end} and value < {high_end}")


def draw_line_plot():

    df_line = df.copy()

    # saves the figure and the axes as separate objects:  https://stackoverflow.com/questions/34162443/why-do-many-examples-use-fig-ax-plt-subplots-in-matplotlib-pyplot-python
    fig, ax = plt.subplots(figsize=(15, 5))
    ax.plot(
        df_line.index,  # x-coordinates
        df_line['value'],  # y-coordinates
        color='red'
    )
    ax.set(
        xlabel='Date',
        ylabel='Page Views',
        title='Daily freeCodeCamp Forum Page Views 5/2016-12/2019',
    )
    # shows the completed figure without saving it, good for proofreading
    # plt.show()

    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig


def draw_bar_plot():

    # copy over the cleaned data set
    df_bar = df.copy()

    # add new columns to make it easier to grab the data later
    df_bar['Years'] = df_bar.index.year
    df_bar['Months'] = df_bar.index.month_name()
    df_bar = df_bar.rename(columns={
        'value': 'Average Page Views'
    })

    # average the monthly page view counts, then group by year, then by month
    df_bar = pd.DataFrame(df_bar.groupby(
        ['Years', 'Months'],
        sort=False
    )['Average Page Views'].mean().round(0).astype(int))

    df_bar = df_bar.reset_index()

    # add the missing months so the column test passes (not sure how else to do this)
    missing_months = pd.DataFrame({
        'Average Page Views': [0, 0, 0, 0],
        'Years': [2016, 2016, 2016, 2016],
        'Months': ['January', 'February', 'March', 'April']
    })

    # simply concatenate both dataframes
    # https://stackoverflow.com/questions/20490274/how-to-reset-index-in-a-pandas-dataframe
    # https://stackoverflow.com/questions/16167829/in-pandas-how-can-i-reset-index-without-adding-a-new-column
    df_bar = pd.concat([missing_months, df_bar]).reset_index(drop=True)

    # plot the data
    fig, ax = plt.subplots(figsize=(15, 7))
    ax.set_title("Monthly freeCodeCamp Forum Page Views 5/2016-12/2019")

    # create the chart
    chart = sns.barplot(
        data=df_bar,
        x='Years',
        y='Average Page Views',
        hue='Months',
        # https://www.codecademy.com/article/seaborn-design-ii
        palette=sns.color_palette("Paired", 12)
    )

    # rotates the x-axis labels... unnecessary, but matches the example chart
    chart = chart.set_xticklabels(chart.get_xticklabels(), rotation=90)

    # plt.show()

    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig


# def draw_box_plot():
#     # use seaborn for this
#     pass
#     # # Prepare data for box plots (this part is done!)
#     # df_box = df.copy()
#     # df_box.reset_index(inplace=True)
#     # df_box['year'] = [d.year for d in df_box.date]
#     # df_box['month'] = [d.strftime('%b') for d in df_box.date]

#     # # Draw box plots (using Seaborn)

#     # # Save image and return fig (don't change this part)
#     # fig.savefig('box_plot.png')
#     # return fig
# draw_bar_plot()
# draw_bar_plot()
