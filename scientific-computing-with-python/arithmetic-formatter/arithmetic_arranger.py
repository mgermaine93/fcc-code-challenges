def arithmetic_arranger(problems, answers=False):

    # These are used later
    first_line = ""
    second_line = ""
    dash_line = ""
    answer_line = ""

    # This is referenced in the loop, but is important to define outside of the loop
    number_of_problems_left = len(problems)

    # These are used later
    formatted_problems = []

    # Too many problems requirement
    if len(problems) > 5:
        return "Error: Too many problems."

    # "problems" is a list of strings
    for problem in problems:

        # For each loop iteration of the loop, there's one less problem to check
        number_of_problems_left = number_of_problems_left - 1

        # Break up each problem string
        new_problem = problem.split()
        first_operand = new_problem[0]
        operator = new_problem[1]
        second_operand = new_problem[2]

        # Only digits requirement
        if (first_operand.isdigit() != True) or (second_operand.isdigit() != True):
            return "Error: Numbers must only contain digits."
        # Only 4 digits requirement
        if (len(first_operand) > 4) or (len(second_operand) > 4):
            return "Error: Numbers cannot be more than four digits."
        # Only "+" or "-" requirement
        if (operator != "+") and (operator != "-"):
            return "Error: Operator must be '+' or '-'."

        # Initialize "answer", used directly below
        answer = ""

        # Does the actual arithmetic
        if operator == "+":
            answer = int(first_operand) + int(second_operand)
        else:  # operator must be "-"
            answer = int(first_operand) - int(second_operand)

        # This defines how many dashes there should be at the bottom of each problem
        width_of_problem = max(len(first_operand), len(second_operand)) + 2

        # "rjust" will right-align a string, using a space as the default fill character
        # Formatting of each problem is here
        first_line += str(first_operand.rjust(width_of_problem))
        second_line += str(operator +
                           second_operand.rjust(width_of_problem - 1))
        dash_line += str("-" * width_of_problem)
        answer_line += str(answer).rjust(width_of_problem)

        if number_of_problems_left > 0:
            column_width = "    "
            first_line += column_width
            second_line += column_width
            dash_line += column_width
            answer_line += column_width

        if answers == True:
            formatted_problems = (
                first_line + "\n" + second_line + "\n" + dash_line + "\n" + answer_line)
        else:
            formatted_problems = (first_line + "\n" +
                                  second_line + "\n" + dash_line)

    return formatted_problems
