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
final_product = []

while y_axis >= 0:
    line = []
    if y_axis == 100:
        line = [f"{y_axis} |"]
    elif y_axis == 0:
        line = [f"  {y_axis} |"]
    else:
        line = [f" {y_axis} |"]
    for i in range(len(amounts)):
        # Need to double-check this another day...
        if amounts[i] >= y_axis and i == (len(amounts) - 1) and y_axis == 0:
            line.append("o  ")
        elif amounts[i] <= y_axis and i == (len(amounts) - 1) and y_axis == 0:
            line.append("   ")
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
print("".join(final_product))
##################### END Putting the basic graph together ####################

# print(final_product)
#print(" ".join(final_product))

test_y_axis = ["100|", " 90| ", " 80| ", " 70| ", " 60| ",
               " 50| ", " 40| ", " 30| ", " 20| ", " 10| ", "  0| "]

# print("\n".join(test_y_axis))

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
