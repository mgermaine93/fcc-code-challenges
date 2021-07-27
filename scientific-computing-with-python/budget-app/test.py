# # Dummy file for testing functionality

# title = "First Row\n"
# items = "Second Row\n"
# total = 14
# output = f"{title}{items}Total: {str(total)}"
# print(output)

# categories = ["Give", "Judy", "My", "Notice"]
# longest_category = max(categories, key=len)

# # This works!
# formatted_names = []
# for category in categories:
#     formatted_names.append(category.ljust(len(longest_category)))
# print(formatted_names)

##################### Putting the basic graph together ####################
amounts = [10, 20, 30, 0]
y_axis = 100
final_product = ["Percentage spent by category\n"]

while y_axis >= 0:
    line = []
    if y_axis == 100:
        line = [f"{y_axis}|"]
    elif y_axis == 0:
        line = [f"  {y_axis}|"]
    else:
        line = [f" {y_axis}|"]
    for i in range(len(amounts)):
        # Need to double-check this another day...
        # if an "o" is needed, if it's the last category, and we're at the bottom of the graph...
        if amounts[i] >= y_axis and i == (len(amounts) - 1) and y_axis == 0:
            line.append("o  \n")
        # if an "o" is not needed, if it's the last category, and we're at the bottom of the graph...
        elif amounts[i] <= y_axis and i == (len(amounts) - 1) and y_axis == 0:
            line.append("   \n")
        elif amounts[i] >= y_axis and i == (len(amounts) - 1):
            line.append("o  \n")
        elif amounts[i] >= y_axis:
            line.append("o ")
        elif i == (len(amounts) - 1):
            line.append("   \n")
        else:
            line.append("  ")
    # print(line)
    formatted_line = " ".join(line)
    # print(formatted_line)
    final_product.append(formatted_line)
    y_axis -= 10
x_axis = ["    "]
x_axis.append((len(amounts)) * "---")
# I'm sure there's a more pythonic way to add this extra dash...
x_axis.append("-")
final_product.append("".join(x_axis))
# print("".join(final_product)) # this prints out the chart
##################### END Putting the basic graph together ####################

# Putting the x-asix together
names = ["Edwin", "Frazier", "and", "Jane", "Plainwell"]
longest_name = max(names, key=len)
formatted_names = []
for name in names:
    formatted_names.append(name.ljust(len(longest_name)))
# print(formatted_names)

# loop through the formatted names
labels = []
limit = len(longest_name)
# while limit >= 0:
# for j in range(len(formatted_names)):
for name in formatted_names:
    line = ["    "]
    for character in name:
        line.append(f" {character} ")
    line.append("\n")
    labels.append(line)
    # for j in range(len(formatted_names)):
    #     # Need to iterate through the names themselves, not the list of names!
    #     line.append(f" {formatted_names[j]} ")
    # labels.append(line)
    # limit -= 1
print(labels)
# print(labels)


# names = [category.name for category in categories]
#  longest_name = max(names, key=len)
#   formatted_names = []
#    for name in names:
#         formatted_names.append(name.ljust(len(longest_name)))
#     print(formatted_names)


# print("\n".join(test_y_axis))

# Example graph:
# Percentage spent by category
# 100|
#  90|
#  80|
#  70|
#  60|
#  50|
#  40|          o
#  30|       o  o
#  20|    o  o  o
#  10| o  o  o  o
#   0| o  o  o  o
#     -------------
