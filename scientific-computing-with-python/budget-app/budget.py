from decimal import *


class Category:

    def __init__(self, name):
        """
        The Category class should be able to instantiate objects based on different budget categories like food, clothing, and entertainment. When objects are created, they are passed in the name of the category. The class should have an instance variable called ledger that is a list.
        """
        self.name = name  # the name of the category
        self.budget = 0
        self.ledger = list()

    def deposit(self, amount, description=""):
        """
        A deposit method that accepts an amount and description. If no description is given, it should default to an empty string. The method should append an object to the ledger list in the form of {"amount": amount, "description": description}
        """
        self.budget += amount
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        """
        A withdraw method that is similar to the deposit method, but the amount passed in should be stored in the ledger as a negative number. If there are not enough funds, nothing should be added to the ledger. This method should return True if the withdrawal took place, and False otherwise.
        """
        if self.check_funds(amount):  # enough funds
            self.budget -= amount
            self.ledger.append(
                {"amount": (amount * -1), "description": description})
            return True
        else:  # not enough funds
            return False

    def check_funds(self, amount):
        """
        A check_funds method that accepts an amount as an argument. It returns False if the amount is greater than the balance of the budget category and returns True otherwise. This method should be used by both the withdraw method and transfer method.
        """
        if amount > self.budget:
            return False  # not enough funds
        else:
            return True  # enough funds

    def get_balance(self):
        """
        A get_balance method that returns the current balance of the budget category based on the deposits and withdrawals that have occurred.
        """
        return self.budget

    def transfer(self, amount, category):
        """
        A transfer method that accepts an amount and another budget category as arguments. The method should add a withdrawal with the amount and the description "Transfer to [Destination Budget Category]". The method should then add a deposit to the other budget category with the amount and the description "Transfer from [Source Budget Category]". If there are not enough funds, nothing should be added to either ledgers. This method should return True if the transfer took place, and False otherwise.
        """
        if self.check_funds(amount):  # enough funds
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        else:
            return False

    # title line of 30 characters, with category name centered
    # this is used in the string object below
    def display_title(self):
        length_of_category_name = len(self.name)
        # print(f"Category name is {length_of_category_name} characters long")
        number_of_bookends = (30 - length_of_category_name) // 2
        # print(f"Bookends should be {number_of_bookends} characters long")
        bookend = "*" * number_of_bookends
        # title = f"{bookend}{self.name}{bookend}\n"
        return f"{bookend}{self.name}{bookend}\n"

    # Prints out the budget object
    def __str__(self):
        """
        When the budget object is printed it should display:

        * A title line of 30 characters where the name of the category is centered in a line of * characters.
        * A list of the items in the ledger. Each line should show the description and amount. The first 23 characters of the description should be displayed, then the amount. The amount should be right aligned, contain two decimal places, and display a maximum of 7 characters.
        * A line displaying the category total.
        """
        title = self.display_title()
        items = ""
        total = 0
        # ledger descriptions and amounts
        for i in range(len(self.ledger)):
            formatted_description = f"{self.ledger[i]['description'][0:23]}"
            amount = self.ledger[i]['amount']
            num_spaces = 0
            cents = Decimal('0.01')
            # print(len(formatted_description))
            # goal is to get a add-able decimal rounded to the hundredths place
            # formatted_amount = float(format(int((amount) * 100), '.2f'))
            formatted_amount = float(format(amount, '.2f'))

            print((formatted_amount))
            # print(float(formatted_amount) / 100)
            num_spaces = 7 - len(str(formatted_amount))
            items += f"{formatted_description}{num_spaces}{formatted_amount}\n"
            total += float(formatted_amount)

        output = f"{title}{items}Total: {str(total)}"
        return output

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
    """
    A function called create_spend_chart() that takes a list of categories as an argument. It should return a string that is a bar chart.

    The chart should show the percentage spent in each category passed in to the function. The percentage spent should be calculated only with withdrawals and not with deposits. Down the left side of the chart should be labels 0 - 100. The "bars" in the bar chart should be made out of the "o" character. The height of each bar should be rounded down to the nearest 10. The horizontal line below the bars should go two spaces past the final bar. Each category name should be written vertically below the bar. There should be a title at the top that says "Percentage spent by category".
    """
    pass  # dummy to prevent errors for now

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


food = Category("Food")
entertainment = Category("Entertainment")
business = Category("Business")

food.deposit(900, "deposit")
food.withdraw(45.67, "milk, cereal, eggs, bacon, bread")
food.transfer(20, entertainment)
# print(food.display_title())
print(str(food))
