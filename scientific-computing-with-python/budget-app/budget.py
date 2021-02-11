class Category:

    # Complete the `Category` class in `budget.py`. It should be able to instantiate objects based on different budget categories like *food*, *clothing*, and *entertainment*. When objects are created, they are passed in the name of the category.
    # The class should have an instance variable called `ledger` that is a list.
    def __init__(self, name):
        self.name = name  # the name of the category
        self.budget = 0
        self.ledger = list()

    # * A `deposit` method that accepts an amount and description. If no description is given, it should default to an empty string.
    def deposit(self, amount, description=""):
        # The method should append an object to the ledger list in the form of `{"amount": amount, "description": description}`.
        self.budget += amount
        self.ledger.append({"amount": amount, "description": description})

    # * A `check_funds` method that accepts an amount as an argument. It returns `False` if the amount is greater than the balance of the budget category and returns `True` otherwise. This method should be used by both the `withdraw` method and `transfer` method.
    def check_funds(self, amount):
        if amount > self.budget:
            return False  # not enough funds
        else:
            return True  # enough funds

    # * A `withdraw` method that is similar to the `deposit` method, but the amount passed in should be stored in the ledger as a negative number. If there are not enough funds, nothing should be added to the ledger. This method should return `True` if the withdrawal took place, and `False` otherwise.
    def withdraw(self, amount, description=""):
        if check_funds(amount):  # enough funds
            self.budget -= amount
            self.ledger.append(
                {"amount": (amount * -1), "description": description})
            return True
        else:  # not enough funds
            return False

    # * A `get_balance` method that returns the current balance of the budget category based on the deposits and withdrawals that have occurred.
    def get_balance(self):
        return self.budget

    # * A `transfer` method that accepts an amount and another budget category as arguments.
    def transfer(self, amount, category):
        if check_funds(amount):  # enough funds
            # The method should add a withdrawal with the amount and the description "Transfer to [Destination Budget Category]".
            self.withdraw(amount, f"Transfer to {category.name}")
            # The method should then add a deposit to the other budget category with the amount and the description "Transfer from [Source Budget Category]".
            self.deposit(amount, f"Transfer from {self.name}")
            return True
        else:
            return False

    # The Pythonic was to represent the output object as a string
    def __str__(self):
        output = ""
        # title line of 30 characters, with category name centered
        length_of_category_name = len(self.name)
        number_of_bookends = str((30 / length_of_category_name) / 2)
        bookend = "*" * number_of_bookends
        output.append(f"{bookend}{self.name}{bookend}\n")
        # output.append()

    # When the budget object is printed it should display:
# * A title line of 30 characters where the name of the category is centered in a line of `*` characters.
# * A list of the items in the ledger. Each line should show the description and amount. The first 23 characters of the description should be displayed, then the amount. The amount should be right aligned, contain two decimal places, and display a maximum of 7 characters.
# * A line displaying the category total.

# Here is an example of the output:
# ```
# *************Food*************
# initial deposit        1000.00
# groceries               -10.15
# restaurant and more foo -15.89
# Transfer to Clothing    -50.00
# Total: 923.96
# ```


def create_spend_chart(categories):

    # Besides the `Category` class, create a function (outside of the class) called `create_spend_chart` that takes a list of categories as an argument. It should return a string that is a bar chart.

    # The chart should show the percentage spent in each category passed in to the function. The percentage spent should be calculated only with withdrawals and not with deposits. Down the left side of the chart should be labels 0 - 100. The "bars" in the bar chart should be made out of the "o" character. The height of each bar should be rounded down to the nearest 10. The horizontal line below the bars should go two spaces past the final bar. Each category name should be written vertically below the bar. There should be a title at the top that says "Percentage spent by category".

    # This function will be tested with up to four categories.

    # Look at the example output below very closely and make sure the spacing of the output matches the example exactly.

    # ```
    # Percentage spent by category
    # 100|
    #  90|
    #  80|
    #  70|
    #  60| o
    #  50| o
    #  40| o
    #  30| o
    #  20| o  o
    #  10| o  o  o
    #   0| o  o  o
    #     ----------
    #      F  C  A
    #      o  l  u
    #      o  o  t
    #      d  t  o
    #         h
    #         i
    #         n
    #         g
    # ```
