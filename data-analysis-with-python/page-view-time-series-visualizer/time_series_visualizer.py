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
print(df)


def draw_line_plot():
    df_line = df.copy()

    # saves the figure and the axes as separate objects:  https://stackoverflow.com/questions/34162443/why-do-many-examples-use-fig-ax-plt-subplots-in-matplotlib-pyplot-python
    fig, ax = plt.subplots(figsize=(15, 5))
    ax.plot(
        df_line.index,  # x-coorindates
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


# def draw_bar_plot():
#     # Copy and modify data for monthly bar plot
#     # This includes the cleaned data, which explains why some dates are missing
#     df_bar = df.copy()
#     df_bar = df_bar.reset_index()

#     # adds the missing months, seen here:  https://stackoverflow.com/questions/43408621/add-a-row-at-top-in-pandas-dataframe
#     new_rows = []
#     new_rows.insert(0, {'date': pd.to_datetime(
#         '2016-04-01 00:00:00'), 'value': 0})
#     new_rows.insert(0, {'date': pd.to_datetime(
#         '2016-03-01 00:00:00'), 'value': 0})
#     new_rows.insert(0, {'date': pd.to_datetime(
#         '2016-02-01 00:00:00'), 'value': 0})
#     new_rows.insert(0, {'date': pd.to_datetime(
#         '2016-01-01 00:00:00'), 'value': 0})

#     df_bar = pd.concat([pd.DataFrame(new_rows), df_bar], ignore_index=True)

#     # adds in year and month columns
#     df_bar['year'] = df_bar['date'].dt.strftime('%Y')
#     df_bar['month'] = df_bar['date'].dt.strftime('%m')

#     df_bar = df_bar.groupby(['year', 'month'])['value'].mean()
#     df_bar = df_bar.reset_index(drop=False)

#     # https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html
#     df_bar['month_name'] = pd.to_datetime(
#         df_bar['month'], format='%m').dt.month_name()

#     print(df_bar)
#     # https://stackoverflow.com/questions/51879686/pandas-only-recognizes-one-column-in-my-data-frame

#     # this should be good for the most part
#     bar_plot = sns.barplot(
#         data=df_bar,
#         x='year',
#         y='value',
#         hue='month_name',
#         # https://www.codecademy.com/article/seaborn-design-ii
#         palette=sns.color_palette("Paired", 12)
#     )
#     bar_plot.set(
#         title='Monthly freeCodeCamp Forum Page Views 5/2016-12/2019',
#         xlabel='Years',
#         ylabel='Average Page Views',
#     )
#     plt.legend(
#         title='Months'
#     )
#     fig = bar_plot.figure
#     # plt.show()
#     # # Draw bar plot

#     # # Save image and return fig (don't change this part)
#     fig.savefig('bar_plot.png')
#     return fig


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
