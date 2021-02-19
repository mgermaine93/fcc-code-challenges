def add_time(start, duration, day_of_week=False):

    # Initialize end values
    end_hours = 0
    end_minutes = 0
    count_of_modifiers = 0
    count_of_days = 0

    # Split up the start time:  "11:43 PM"
    start_hours = int(start.split()[0].split(":")[0])
    start_minutes = int(start.split()[0].split(":")[1])
    start_am_or_pm = start.split()[1]

    # Split up the duration time:  "205:12"
    duration_hours = int(duration.split(":")[0])
    duration_minutes = int(duration.split(":")[1])

    # Add the start and the duration units together
    sum_hours = start_hours + duration_hours
    sum_minutes = start_minutes + duration_minutes
    extra_hours = sum_minutes // 60
    remaining_minutes = sum_minutes % 60

    # Add extra hours if minutes are over 59
    if sum_minutes > 59:
        sum_hours += extra_hours
        end_minutes = remaining_minutes
    else:
        end_minutes = sum_minutes

    # Break up the hours into days using 24 hour format
    # Day changes happen whenever a "23" hour becomes a "24" hour
    if sum_hours > 23:
        sum_hours -= 24
        count_of_days += 1
        # print("Potato")

    # AM/PM changes happen whenever a "11" hour becomes a "12" hour
    if sum_hours > 11:
        sum_hours -= 12
        count_of_modifiers += 1

    print(sum_hours)
    print(count_of_days)

    # Handle next day case
    # Handle day of week case
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

    print(end_time)


    # return new_time
add_time("11:43 PM", "23:17")
