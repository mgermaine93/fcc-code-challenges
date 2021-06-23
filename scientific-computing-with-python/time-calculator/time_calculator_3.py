def add_time(start, duration, day_of_week=False):

    # Initialize end values
    days_of_the_week = ["Sunday", "Monday", "Tuesday",
                        "Wednesday", "Thursday", "Friday", "Saturday"]
    hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
               30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    end_hours = 0
    end_minutes = 0
    count_of_modifiers = 0
    count_of_days = 0
    next_day = ""

    # Split up the start time:  "11:43 PM"
    start_hours = int(start.split()[0].split(":")[0])
    start_minutes = int(start.split()[0].split(":")[1])
    start_am_or_pm = start.split()[1]

    # Split up the duration time:  "205:12"
    duration_hours = int(duration.split(":")[0])
    duration_minutes = int(duration.split(":")[1])

    # Add the starts and the durations together
    sum_hours = start_hours + duration_hours
    sum_minutes = start_minutes + duration_minutes

    extra_hours = sum_minutes // 60
    remaining_minutes = sum_minutes % 60

    # If minutes are greater than 59, add the extra hours
    if sum_minutes > 59:
        sum_hours += extra_hours
        end_minutes = remaining_minutes
    else:
        end_minutes = sum_minutes

    # Break up the hours into days using 24-hour format
    # Day changes happen whenever a "23" hour becomes a "24" hour
    while sum_hours > 23:
        sum_hours -= 24
        count_of_days += 1
        # print("Potato")

    # AM/PM changes happen whenever an "11" hour becomes a "12" hour
    if sum_hours > 11:
        sum_hours -= 12
        count_of_modifiers += 1

    # if PM becomes AM, that means there's an extra day to account for
    if start_am_or_pm == "PM" and count_of_modifiers % 2 != 0:
        count_of_days += 1

    # print(sum_hours)
    # print(count_of_days)

    # Handle next day case
    if count_of_days == 1:
        next_day = "(next day)"
    elif count_of_days > 1:
        next_day = f"({count_of_days} days later)"

        # Handle day of week case
        if day_of_week:
            print("Day of the week is: ")
            current_day_index = days_of_the_week.index(day_of_week)
            print(current_day_index)
            end_day_index = days_of_the_week[(current_day_index + count_of_days) % len(
                days_of_the_week)]
            print(end_day_index)
            # print(days_of_the_week[end_day_index])

    # Handle cases where the day of the week "cycles over" and ends up out-of-range.

    # Handle am/pm
    # Handle 12/24 hour

    # Final conversions
    final_hours = str(sum_hours)
    # Pre-pend a zero to minutes if needed to get desired output
    if end_minutes < 10:
        final_minutes = str(end_minutes).zfill(2)
    else:
        final_minutes = str(end_minutes)
    end_time = f"{final_hours}:{final_minutes}"

    # print(end_time)

    # return new_time
# add_time("11:43 PM", "53:17", "Monday")
add_time("11:43 PM", "72:17", "Thursday")
