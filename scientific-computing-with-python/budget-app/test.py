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
amounts = [10, 20, 30, 0, 50]
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
        # if an "o" is needed and it's the last category
        elif amounts[i] >= y_axis and i == (len(amounts) - 1):
            line.append("o  \n")
        # if an "o" is needed anywhere but the last category
        elif amounts[i] >= y_axis:
            line.append("o ")
        # if an "o" is not needed and we're at the last category
        elif i == (len(amounts) - 1):
            line.append("   \n")
        # anything else
        else:
            line.append("  ")
    formatted_line = " ".join(line)
    final_product.append(formatted_line)
    y_axis -= 10

x_axis = ["    "]
# x_axis.append((len(amounts)) * "---")
# # I'm sure there's a more pythonic way to add this extra dash...
# x_axis.append("-\n")
x_axis.append(((len(amounts)) * "---") + "-\n")

final_product.append("".join(x_axis))
# print("".join(final_product)) # this prints out the chart
##################### END Putting the basic graph together ####################

# Putting the x-axis labels together
names = ["Edwin", "Frazier", "and", "Jane", "Plainwell"]
longest_name = max(names, key=len)
formatted_names = []
for name in names:
    formatted_names.append(name.ljust(len(longest_name)))

labels = []
limit = len(longest_name)
k = 0
# adds the letters horizontally to the columns.
while k < limit:
    line = ["    "]
    m = 0
    # adds first, second, third, etc., letters to the column, eventually stacking them vertically.
    while m < len(formatted_names):
        line.append(f" {formatted_names[m][k]} ")
        if m == len(formatted_names) - 1:
            line.append(" ")
        m += 1
    if k != limit - 1:
        line.append("\n")
    labels.append("".join(line))
    k += 1
# print("".join(labels))
final_product.append("".join(labels))
print("".join(final_product))

# Example graph (for reference):
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
