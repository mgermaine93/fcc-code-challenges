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

amounts = [10, 20, 30, 40]
y_axis = 100
final_product = []

for amount in amounts:
    line = [f"{y_axis}", "|"]


test_y_axis = ["100|", " 90| ", " 80| ", " 70| ", " 60| ",
               " 50| ", " 40| ", " 30| ", " 20| ", " 10| ", "  0| "]

print("\n".join(y_axis))
