import matplotlib.pyplot as plt
import pandas as pd
# import seaborn as sns
from pandas.plotting import register_matplotlib_converters
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
    df_bar = df.copy()
    fig = plt.figure(figsize=(15, 5))
    pass

    # # Draw bar plot

    # # Save image and return fig (don't change this part)
    # fig.savefig('bar_plot.png')
    # return fig


def draw_box_plot():
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
