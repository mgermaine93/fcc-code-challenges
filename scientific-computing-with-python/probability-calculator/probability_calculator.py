import copy
import random
from collections import Counter


class Hat:

    def __init__(self, **balls):
        # Initialize an empty list (named "contents") to store the balls
        contents = []
        for key, value in balls.items():
            while value > 0:
                contents.append(key)
                value -= 1
        self.contents = contents
        # print(self.contents)

    def draw(self, balls_to_draw):
        drawn_balls = []
        contents = self.contents
        # If the number of balls to draw exceeds the available quantity, return all the balls.
        if balls_to_draw > len(contents):
            drawn_balls = contents
            return drawn_balls
        while balls_to_draw > 0:
            ball_to_draw = (random.randint(0, (len(contents) - 1)))
            # Add the ball to the drawn balls
            drawn_balls.append(contents[ball_to_draw])
            # Remove the same ball from the hat
            del contents[ball_to_draw]
            # Avoid infinite loop!
            balls_to_draw -= 1
        self.contents = contents
        return drawn_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    # object, object, int, int
    # A hat object containing balls that should be copied inside the function.
    what_we_want = []

    # Break up the expected_balls object
    for key, value in expected_balls.items():
        while value > 0:
            what_we_want.append(key)
            value -= 1

    set_number_of_experiments = copy.deepcopy(num_experiments)

    number_of_successes = 0
    # Do the actual drawings
    while num_experiments > 0:
        # Get a "new, unchanged hat" at the start of each experiment
        new_hat = copy.deepcopy(hat)
        # Draw the balls, return a list of strings
        drawing = new_hat.draw(num_balls_drawn)
        # Compares what we want with what we got
        # A SET CANNOT CONTAIN DUPLICATES!  Use "Counter" instead
        # The elements() method returns an iterator over elements repeating each as many times as its count.
        # Subtract what we got from what we want
        end_result = list(
            (Counter(what_we_want) - Counter(drawing)).elements())
        # If nothing is left...
        if not end_result:
            # ...that means we got what we want, so we can add a success
            number_of_successes += 1
        # Avoid infinite loop!
        num_experiments -= 1

    probability = number_of_successes / set_number_of_experiments
    return probability
