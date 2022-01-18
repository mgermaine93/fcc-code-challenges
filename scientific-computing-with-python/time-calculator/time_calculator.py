def add_time(start, duration, day_of_week=None):
    """
    Docstring needed.
    """
    # Initialize values
    lower_day_of_week = ""
    if day_of_week:
        lower_day_of_week = day_of_week.lower()

    days_of_the_week = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ]

    end_hours = 0
    end_minutes = 0
    end_modifier = ""

    final_day = ""
    final_modifier = ""

    count_of_modifiers = 0
    count_of_days = 0
    next_day = ""

    # Split up the start time
    start_hours = int(start.split()[0].split(":")[0])
    start_minutes = int(start.split()[0].split(":")[1])
    start_modifier = start.split()[1]

    # Split up the duration time
    duration_hours = int(duration.split(":")[0])
    duration_minutes = int(duration.split(":")[1])

    # Add the starts and the durations together
    sum_hours = start_hours + duration_hours
    sum_minutes = start_minutes + duration_minutes

    # Convert extra minutes to hours, if needed
    extra_hours = sum_minutes // 60
    remaining_minutes = sum_minutes % 60
    if sum_minutes > 59:
        sum_hours += extra_hours
        end_minutes = remaining_minutes
    else:
        end_minutes = sum_minutes

    # Day changes happen whenever a "23" hour becomes a "24" hour
    while sum_hours > 23:
        sum_hours -= 24
        count_of_days += 1

    # AM/PM changes happen whenever an "11" hour becomes a "12" hour
    if sum_hours > 11:
        sum_hours -= 12
        count_of_modifiers += 1

    if count_of_modifiers % 2 != 0:
        if start_modifier == "PM":
            end_modifier = "AM"
            # if PM becomes AM, that means there's an extra day to account for
            count_of_days += 1
        else:
            end_modifier = "PM"
    else:
        end_modifier = start_modifier

    # Make sure "0" hours are actually 12
    if sum_hours == 0:
        sum_hours += 12

    # Handle next day case
    if count_of_days == 1:
        next_day = "(next day)"
    elif count_of_days > 1:
        next_day = f"({count_of_days} days later)"

    # Handle day-of-week case
    if lower_day_of_week:
        final_modifier = f"{end_modifier},"
        current_day_index = days_of_the_week.index(lower_day_of_week)
        final_day = (days_of_the_week[(current_day_index + count_of_days) % len(
            days_of_the_week)]).capitalize()
    else:
        final_modifier = end_modifier

    # Final conversions
    final_hours = str(sum_hours)
    # Pre-pend a zero to minutes if needed to get desired output
    if end_minutes < 10:
        final_minutes = str(end_minutes).zfill(2)
    else:
        final_minutes = str(end_minutes)

    if final_day and next_day:
        final_output = f"{final_hours}:{final_minutes} {final_modifier} {final_day} {next_day}"
    elif final_day:
        final_output = f"{final_hours}:{final_minutes} {final_modifier} {final_day}"
    elif next_day:
        final_output = f"{final_hours}:{final_minutes} {final_modifier} {next_day}"
    else:
        final_output = f"{final_hours}:{final_minutes} {final_modifier}"

    return final_output
