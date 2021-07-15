from decimal import Decimal, ROUND_HALF_UP


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

    def display_title(self):
        """
        A display_title method that takes in the name of a budget category (a string) and returns a formatted version of the category (also a string) that is 30 characters long, with the category name centered.  This function is used to create the string object below.
        """
        length_of_category_name = len(self.name)
        number_of_bookends = (30 - length_of_category_name) // 2
        bookend = "*" * number_of_bookends
        return f"{bookend}{self.name}{bookend}\n"

    # Prints out the budget object
    def __str__(self):
        """
        When the budget object is printed it should display:

        * A title line of 30 characters where the name of the category is centered in a line of * characters.
        * A list of the items in the ledger. Each line should show the description and amount. The first 23 characters of the description should be displayed, then the amount. The amount should be right aligned, contain two decimal places, and display a maximum of 7 characters.
        * A line displaying the category total.

        Here is an example of the desired output:

        *************Food*************
        initial deposit        1000.00
        groceries               -10.15
        restaurant and more foo -15.89
        Transfer to Clothing    -50.00
        Total: 923.96
        """
        title = self.display_title()
        items = ""
        total = 0
        cents = Decimal('0.01')

        # ledger descriptions and amounts
        for i in range(len(self.ledger)):
            description = self.ledger[i]['description']
            amount = Decimal(self.ledger[i]['amount'])
            if len(description) < 23:
                difference = 23 - len(description)
                formatted_description = f"{description + ' ' * difference}"
            else:
                formatted_description = f"{description[0:23]}"
            formatted_amount = amount.quantize(cents, ROUND_HALF_UP)
            spaces = " " * (7 - len(str(formatted_amount)))
            items += f"{formatted_description}{spaces}{formatted_amount}\n"
            total += amount

        final_total = total.quantize(cents, ROUND_HALF_UP)
        return f"{title}{items}Total: {str(final_total)}"

    def get_withdrawal_total_by_category(self):
        """
        This function takes in the name of a budget category (a string) and returns the sum of all withdrawals made from that category.
        """
        total = 0
        for transaction in self.ledger:
            if transaction["amount"] < 0:
                total += transaction["amount"]
        print(f"Get withdrawal total by category amount: {total}")
        return total


def get_withdrawal_total(categories):
    """
    A function that takes in a list of categories and returns the sum of the money spent (i.e., withdrawn or transferred out of) across each category.
    """
    total = 0
    for category in categories:
        total += category.get_withdrawal_total_by_category()
    print(f"Get withdrawal total amount: {total}")
    return total


def get_withdrawal_percentage(category, categories):
    """
    A function that takes in a category (string) and a list of categories (list) and returns an int representing the withdrawal amount made from the provided category (rounded DOWN to the nearest 10) as a percentage of the sum of all withdrawals made across all categories.

    This function assists in determining the number of "o"s that should appear in the chart, representing each category.
    """
    divisor = category.get_withdrawal_total_by_category()
    dividend = get_withdrawal_total(categories)
    quotient = (divisor / dividend) * 100
    # rounds down to nearest 10
    print(int(quotient - (quotient % 10)))


def create_spend_chart(categories):
    """
    A function called create_spend_chart() that takes a list of categories as an argument. It should return a string that is a bar chart.

    The chart should show the percentage spent in each category passed in to the function. The percentage spent should be calculated only with withdrawals and not with deposits. Down the left side of the chart should be labels 0 - 100. The "bars" in the bar chart should be made out of the "o" character. The height of each bar should be rounded down to the nearest 10. The horizontal line below the bars should go two spaces past the final bar. Each category name should be written vertically below the bar. There should be a title at the top that says "Percentage spent by category".
    """

    y_axis = 100
    result = ["Percentage spent by category\n"]
    while y_axis > 0:
        if y_axis == 100:
            result.append(f"{y_axis}|\n")
        else:
            result.append(f" {y_axis}|\n")
        y_axis -= 10
    result.append("    ------")
    print("".join(result))

    # result = ["Percentage spent by category\n", "One line below\n", "Another line below\n"]
    # print(''.join(result))

    # need to find out the percentage of money spent in each category (current amount / original amount) -> this is done with the get_withdrawal_total_by_category() and get_withdrawal_total() functions above.
    """
    The data to display is NOT the percentages of the original budgets that have been spent.
    The data to display IS the percentages of what has been spent, divied up by category.

    So if a total of $150 was spent ($50 for food, $50 for business, and $50 for entertainment),
    the chart would display bars at 30% (rounded down) for each category.

    Doing this necessitates the need to find the total amount of withdraws.
    """

    # pass  # dummy to prevent errors for now

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

entertainment.deposit(30, "deposit")
entertainment.withdraw(7.99, "netflix")
# print(food.ledger)
# food.get_withdrawal_total_by_category()
# get_withdrawal_total([food, business, entertainment])
# print(food.display_title())
# print(str(food))
# create_spend_chart([ledger, business.name, business.budget, food.name,
#                     food.budget, entertainment.name, entertainment.budget])
# food.get_withdrawal_total_by_category()
get_withdrawal_total([food, business, entertainment])
get_withdrawal_percentage(food, [food, business, entertainment])

create_spend_chart([food, business, entertainment])
