import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
from calendar import month_name
import numpy as np
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv(
    filepath_or_buffer='fcc-forum-pageviews.csv',
    parse_dates=['date'],
    index_col='date'
)

# Clean data
# thanks to https://towardsdatascience.com/10-examples-that-will-make-you-use-pandas-query-function-more-often-a8fb3e9361cb
low_end = df.value.quantile(0.025)
high_end = df.value.quantile(0.975)
df = df.query(f"value > {low_end} and value < {high_end}")


def draw_line_plot():
    df_line = df.copy()
    fig = plt.figure(figsize=(15, 5))
    x_values = df_line.index.tolist()
    y_values = df_line['value'].tolist()
    plt.plot(x_values, y_values, 'r')  # 'r' for red line
    plt.title('Daily freeCodeCamp Forum Page Views 5/2016-12/2019')
    plt.xlabel('Date')
    plt.ylabel('Page Views')
    # plt.show()
    # # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig


def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    # This includes the cleaned data, which explains why some dates are missing
    df_bar = df.copy()
    df_bar = df_bar.reset_index()

    # adds the missing months, seen here:  https://stackoverflow.com/questions/43408621/add-a-row-at-top-in-pandas-dataframe
    new_rows = []
    new_rows.insert(0, {'date': pd.to_datetime(
        '2016-04-01 00:00:00'), 'value': 0})
    new_rows.insert(0, {'date': pd.to_datetime(
        '2016-03-01 00:00:00'), 'value': 0})
    new_rows.insert(0, {'date': pd.to_datetime(
        '2016-02-01 00:00:00'), 'value': 0})
    new_rows.insert(0, {'date': pd.to_datetime(
        '2016-01-01 00:00:00'), 'value': 0})

    df_bar = pd.concat([pd.DataFrame(new_rows), df_bar], ignore_index=True)
    # reset_index(drop=True)

    # adds in year and month columns
    df_bar['year'] = df_bar['date'].dt.strftime('%Y')
    df_bar['month'] = df_bar['date'].dt.strftime('%m')
    # print(df_bar)

    new_df = df_bar.groupby(['year', 'month'])['value'].mean()
    new_df = new_df.reset_index(drop=False)
    # print(new_df)

    # https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html
    new_df['month_name'] = pd.to_datetime(
        new_df['month'], format='%m').dt.month_name()
    # print(new_df)

    # https://stackoverflow.com/questions/51879686/pandas-only-recognizes-one-column-in-my-data-frame

    bar_plot = sns.barplot(
        data=new_df,
        x='year',
        y='value',
        hue='month_name',
        # https://www.codecademy.com/article/seaborn-design-ii
        palette=sns.color_palette("Paired", 12)
    )
    bar_plot.set(
        xlabel='Years',
        ylabel='Average Page Views'
    )
    fig = bar_plot.figure
    # plt.show()
    # # Draw bar plot

    # # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig


def draw_box_plot():
    # use seaborn for this
    pass
    # # Prepare data for box plots (this part is done!)
    # df_box = df.copy()
    # df_box.reset_index(inplace=True)
    # df_box['year'] = [d.year for d in df_box.date]
    # df_box['month'] = [d.strftime('%b') for d in df_box.date]

    # # Draw box plots (using Seaborn)

    # # Save image and return fig (don't change this part)
    # fig.savefig('box_plot.png')
    # return fig


draw_bar_plot()
