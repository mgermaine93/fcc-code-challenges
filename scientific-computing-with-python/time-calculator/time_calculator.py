def add_time(start, duration, day_of_week=False):

    end_hours = 0
    end_minutes = 0
    end_am_or_pm = ""
    days_later = 0

    next_day = ""
    days_later = 0
    end_time = ""
    count_of_modifiers = 0

    # Start time hours and minutes, as ints
    # "11:30 PM"
    start_hours = int(start.split()[0].split(":")[0])
    start_minutes = int(start.split()[0].split(":")[1])
    start_am_or_pm = start.split()[1]
    print(start_am_or_pm)

    # Duration time hours and minutes, as ints
    duration_hours = int(duration.split()[0].split(":")[0])
    duration_minutes = int(duration.split()[0].split(":")[1])

    sum_hours = start_hours + duration_hours
    sum_minutes = start_minutes + duration_minutes

    # Account for added hours from minutes
    if sum_minutes >= 59:
        sum_hours += sum_minutes // 60
        end_minutes = sum_minutes % 60
    else:
        end_minutes = sum_minutes

    # This determines how many "modifiers" of AM/PM to add
    while sum_hours >= 12:
        count_of_modifiers += 1
        sum_hours -= 12

    # If there's an odd number of count_of_modifiers, that means the AM/PM should be switched.
    # I'm sure this could be cleaned up...
    if count_of_modifiers % 2 != 0:
        if start_am_or_pm == "PM":
            end_am_or_pm = "AM"
        elif start_am_or_pm == "AM":
            end_am_or_pm = "PM"
    # else:
    #     end_am_or_pm = start_am_or_pm

    if start_am_or_pm == ""
    print(end_am_or_pm)

    # Need to figure out next_day part

    # Need to figure out days_later part -- should only show if it's more than one day later
    while count_of_modifiers > 1:
        days_later += 1
        count_of_modifiers -= 2
    print(days_later)
    # Need to figure out day_of_week part

    # Final conversions
    final_hours = str(end_hours)
    # Pre-pend a zero to minutes if needed to get desired output
    if end_minutes < 10:
        final_minutes = str(end_minutes).zfill(2)
    else:
        final_minutes = str(end_minutes)
    end_time = f"{final_hours}:{final_minutes}"

    print(end_time)
    # print(output)


add_time("11:30 PM", "2:32")

# Assignment
# Write a function named add_time that takes in two required parameters and one optional parameter:

# a start time in the 12-hour clock format(ending in AM or PM)
# a duration time that indicates the number of hours and minutes
# (optional) a starting day of the week, case insensitive
# The function should add the duration time to the start time and return the result.

# If the result will be the next day, it should show(next day) after the time. If the result will be more than one day later, it should show(n days later) after the time, where "n" is the number of days later.

# If the function is given the optional starting day of the week parameter, then the output should display the day of the week of the result. The day of the week in the output should appear after the time and before the number of days later.

# Below are some examples of different cases the function should handle. Pay close attention to the spacing and punctuation of the results.

# add_time("3:00 PM", "3:10")
# # Returns: 6:10 PM

# add_time("11:30 AM", "2:32", "Monday")
# # Returns: 2:02 PM, Monday

# add_time("11:43 AM", "00:20")
# # Returns: 12:03 PM

# add_time("10:10 PM", "3:30")
# # Returns: 1:40 AM (next day)

# add_time("11:43 PM", "24:20", "tueSday")
# # Returns: 12:03 AM, Thursday (2 days later)

# add_time("6:30 PM", "205:12")
# # Returns: 7:42 AM (9 days later)
# add_time("3:00 PM", "3:10")
# # Returns: 6:10 PM

# add_time("11:30 AM", "2:32", "Monday")
# # Returns: 2:02 PM, Monday

# add_time("11:43 AM", "00:20")
# # Returns: 12:03 PM

# add_time("10:10 PM", "3:30")
# # Returns: 1:40 AM (next day)

# add_time("11:43 PM", "24:20", "tueSday")
# # Returns: 12:03 AM, Thursday (2 days later)

# add_time("6:30 PM", "205:12")
# # Returns: 7:42 AM (9 days later)
# Do not import any Python libraries. Assume that the start times are valid times. The minutes in the duration time will be a whole number less than 60, but the hour can be any whole number.

# Development
# Write your code in time_calculator.py. For development, you can use main.py to test your time_calculator() function. Click the "run" button and main.py will run.

# Testing
# The unit tests for this project are in test_module.py. We imported the tests from test_module.py to main.py for your convenience. The tests will run automatically whenever you hit the "run" button.

# Submitting
# Copy your project's URL and submit it to freeCodeCamp.


###################################################
# Copy/pasted from Repl.it... not sure if needed. #
###################################################
# def add_time(start, duration):

#   days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
#   end_hours = 0
#   end_minutes = 0
#   days_later = 0
#   end_time = ""
#   # Returns: 12:03 AM, Thursday (2 days later)
#   #let output = f"{end_time} {am_or_pm}, {day} ({days_later} days later)"

#   # Start time hours and minutes, as ints
#   start_hours = int(start.split()[0].split(":")[0])
#   start_minutes = int(start.split()[0].split(":")[1])
#   am_or_pm = start.split()[1]

#   # Duration time hours and minutes, as ints
#   duration_hours = int(duration.split()[0].split(":")[0])
#   duration_minutes = int(duration.split()[0].split(":")[1])

#   # Add the start time and duration together
#   sum_hours = start_hours + duration_hours
#   sum_minutes = start_minutes + duration_minutes

#   # Account for added hours from minutes
#   if sum_minutes >= 59:
#     sum_hours += sum_minutes // 60
#     end_minutes = sum_minutes % 60
#   else:
#     end_minutes = sum_minutes

#   # Mess with hours if needed
#   if sum_hours > 12:
#     if sum_hours >= 24:
#       days_later = sum_hours // 24
#       end_hours = sum_hours % 24
#     end_hours = sum_hours % 12
#     # Need to do something about AM/PM here, I think
#   else:
#     end_hours = sum_hours

#   # Final conversions
#   final_hours = str(end_hours)
#   # Pre-pend a zero to minutes if needed to get desired output
#   if end_minutes < 10:
#     final_minutes = str(end_minutes).zfill(2)
#   else:
#     final_minutes = str(end_minutes)
#   end_time = f"{final_hours}:{final_minutes}"

#   print(end_time)

# # Convert end_hours and end_minutes to strings DONE
# # Combine end_hours and end_minutes into single string, separated by a ":". DONE
# # Figure out minute modulo situation DONE(?)
# # Figure out AM/PM situation
#   # Need to break this down...
# # Figure out day situation
#   # Need to break this down as well...


#    # return new_time
# add_time("9:15 PM", "5:30")
