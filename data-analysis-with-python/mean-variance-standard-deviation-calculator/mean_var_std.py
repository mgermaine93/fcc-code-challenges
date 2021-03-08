import numpy as np


def calculate(list):

    # Check the length of the list first
    length = len(list)
    if length != 9:
        raise ValueError("List must contain nine numbers.")

    # Convert the list to a Numpy 3x3 matrix
    matrix = np.array(list).reshape((3, 3))
    print(matrix)

    # "axis = 0" indicates the values from top to bottom
    # "axis = 1" indicates the values from left to right
    # no specified axis indicates the values from the flattened list

    # Get means
    means = [np.mean(matrix, axis=0).tolist(), np.mean(
        matrix, axis=1).tolist(), np.mean(list).tolist()]

    # Get variances
    variances = [np.var(matrix, axis=0).tolist(), np.var(
        matrix, axis=1).tolist(), np.var(list).tolist()]

    # Get standard deviations
    std_devs = [np.std(matrix, axis=0).tolist(), np.std(
        matrix, axis=1).tolist(), np.std(matrix)]

    # Get maximums
    maximums = [np.max(matrix, axis=0).tolist(), np.max(
        matrix, axis=1).tolist(), np.max(matrix)]

    # Get minimums
    minimums = [np.min(matrix, axis=0).tolist(), np.min(
        matrix, axis=1).tolist(), np.min(matrix)]

    # Get sums
    sums = [np.sum(matrix, axis=0).tolist(), np.sum(
        matrix, axis=1).tolist(), np.sum(matrix)]

    # Make the dictionary
    value_to_return = {
        'mean': means,
        'variance': variances,
        'standard deviation': std_devs,
        'max': maximums,
        'min': minimums,
        'sum': sums
    }

    # Return the dictionary
    return value_to_return
