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
    df_bar = df.copy()
    print(df_bar)

    # missing_january = {'date': '2016-01-01', 'value': 0}
    # df_bar = df_bar.append(missing_january, ignore_index=False)
    # missing_february = {'date': '2016-02-01', 'value': 0}
    # df_bar = df_bar.append(missing_february, ignore_index=False)
    # missing_march = {'date': '2016-03-01', 'value': 0}
    # df_bar = df_bar.append(missing_march, ignore_index=False)
    # missing_april = {'date': '2016-04-01', 'value': 0}
    # df_bar = df_bar.append(missing_april, ignore_index=False)
    # print(df_bar)

    df_bar.index = pd.to_datetime(df_bar.index)
    df_bar['year'] = df_bar.index.year
    df_bar['month'] = df_bar.index.month
    new_df = df_bar.groupby([('year'), ('month')])['value'].agg(
        {np.mean}).rename_axis(['year', 'month'])
    # https://stackoverflow.com/questions/51879686/pandas-only-recognizes-one-column-in-my-data-frame
    new_df = new_df.reset_index(drop=False)
    # https://stackoverflow.com/questions/37625334/python-pandas-convert-month-int-to-month-name/54310169#54310169
    month_dict = dict(enumerate(month_name))
    new_df['month'] = new_df['month'].map(month_dict)

    print(new_df)
    # new_df['month'] = pd.to_datetime(
    #     new_df['month'], format='%m').month.dt.month_name()
    # new_df['month'] = new_df['month'].map(month_dict)
    # print(new_df)

    sns.barplot(
        data=new_df,
        x='year',
        y='mean',
        hue='month'
    )
    plt.show()
    # Draw bar plot

    # # Save image and return fig (don't change this part)
    # fig.savefig('bar_plot.png')
    # return fig

    # pd.to_datetime(df['Month&Year'], format='%Y-%m')
    # df_bar.index = pd.to_datetime(df_bar.index)
    # df_bar['day'] = df_bar.index.day
    # df_bar['month'] = df_bar.index.month
    # df_bar['year'] = df_bar.index.year
    # new_df = df_bar[['year', 'month', 'value']]

    # new_df = new_df.groupby(['year', 'month']).sum()
    # new_df = new_df.groupby([('year'), ('month')]).agg({'value': sum})
    # print(new_df)
    # # months = month_name[1:]
    # print(months)
    # df['months'] = pd.Categorical(
    #     df.index.strftime('%B'),
    #     categories=months,
    #     ordered=True
    # )
    # # fig = plt.figure(figsize=(15, 5))
    # dfp = pd.pivot_table(
    #     data=df_bar,
    #     index=df.data.dt.year,
    #     columns='months',
    #     values='value'
    # )
    # print(dfp)
    # # fig = sns.barplot(
    # #     x='Years',
    # #     y='Average Page Views',
    # #     data=df_bar,
    # #     hue=''
    # # )
    # # pass

    # # Draw bar plot

    # # Save image and return fig (don't change this part)
    # fig.savefig('bar_plot.png')
    # return fig


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
