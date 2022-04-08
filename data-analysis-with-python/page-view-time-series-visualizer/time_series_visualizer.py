import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# import data (make sure to parse dates. consider setting index column to 'date'.)
df = pd.read_csv(
    filepath_or_buffer='fcc-forum-pageviews.csv',
)
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')
df = df.set_index('date')

# clean data
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
        title='Daily freeCodeCamp Forum Page Views 5/2016-12/2019'
    )

    # save image and return fig (don't change this part)
    # plt.show()
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

    # plot the data
    fig, ax = plt.subplots(figsize=(15, 7))

    # create the chart
    # https://stackoverflow.com/questions/65147132/how-to-set-the-hue-order-in-seaborn-plots
    bar_plot = sns.barplot(
        data=df_bar,
        x='Years',
        y='Average Page Views',
        hue='Months',
        hue_order=[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        # https://www.codecademy.com/article/seaborn-design-ii
        palette=sns.color_palette("Paired", 12),
    )

    # sets the title
    bar_plot.set_title("Monthly freeCodeCamp Forum Page Views 5/2016-12/2019")

    # moves the legend to more less awkward location
    # https://seaborn.pydata.org/generated/seaborn.move_legend.html
    sns.move_legend(bar_plot, "upper left")

    # rotates the x-axis labels... unnecessary, but matches the example chart
    bar_plot = bar_plot.set_xticklabels(
        bar_plot.get_xticklabels(), rotation=90
    )

    # save image and return fig (don't change this part)
    plt.show()
    fig.savefig('bar_plot.png')
    return fig


def draw_box_plot():

    # prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]

    # https://stackabuse.com/seaborn-box-plot-tutorial-and-examples/
    fig, axes = plt.subplots(1, 2, figsize=(15, 5))

    # draw box plots (using Seaborn)
    sns.set_style('whitegrid')

    # first plot
    year_plot = sns.boxplot(
        data=df_box,
        x='year',
        y='value',
        ax=axes[0],
        palette=sns.color_palette("Paired", 4),
        fliersize=3  # sets the size of the diamond outliers
    )
    year_plot.set(
        xlabel='Year',
        ylabel='Page Views',
        title='Year-wise Box Plot (Trend)'
    )

    # second plot
    month_plot = sns.boxplot(
        data=df_box,
        x='month',
        y='value',
        order=[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        ax=axes[1],
        palette=sns.color_palette("Paired", 12),
        fliersize=3  # sets the size of the diamond outliers
    )
    month_plot.set(
        xlabel='Month',
        ylabel='Page Views',
        title='Month-wise Box Plot (Seasonality)'
    )

    # save image and return fig (don't change this part)
    # plt.show()
    fig.savefig('box_plot.png')
    return fig
