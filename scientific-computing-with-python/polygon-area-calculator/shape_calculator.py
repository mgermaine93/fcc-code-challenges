class Rectangle:
    """
    Docstring needed.
    """

    # Initialized with width and height attributes
    def __init__(self, width, height):
        self.width = width
        self.height = height

    # Additionally, if an instance of a Rectangle is represented as a string, it should look like: Rectangle(width=5, height=10)
    def __str__(self):
        return "Rectangle(width={}, height={})".format(self.width, self.height)

    # set_width
    def set_width(self, width):
        self.width = width
        return self.width

    # set_height
    def set_height(self, height):
        self.height = height

    # get_area: Returns area (width * height)
    def get_area(self):
        area = self.width * self.height
        return area

    # get_perimeter: Returns perimeter (2 * width + 2 * height)
    def get_perimeter(self):
        perimeter = (2 * self.width) + (2 * self.height)
        return perimeter

    # get_diagonal: Returns diagonal ((width ** 2 + height ** 2) ** .5)
    def get_diagonal(self):
        diagonal = ((self.width ** 2 + self.height ** 2) ** .5)
        return diagonal

    # get_picture: Returns a string that represents the shape using lines of "*". The number of lines should be equal to the height and the number of "*" in each line should be equal to the width. There should be a new line (\n) at the end of each line.
    def get_picture(self):
        shape = ""
        # If the width or height is larger than 50, this should return the string: "Too big for picture.".
        if self.width > 50 or self.height > 50:
            return "Too big for picture."
        line = ("*" * self.width) + "\n"
        while self.height > 0:
            shape += line
            self.height -= 1
        # print(shape)
        return shape

    # get_amount_inside: Takes another shape (square or rectangle) as an argument. Returns the number of times the passed in shape could fit inside the shape (with no rotations). For instance, a rectangle with a width of 4 and a height of 8 could fit in two squares with sides of 4.
    def get_amount_inside(self, shape):
        # The "//" is integer division, i.e., gets rid of the remainder so it returns only the WHOLE (int) number of passed-in shapes that can fit into the instance shape
        return self.get_area() // shape.get_area()

# The Square class should be a subclass of Rectangle.


class Square(Rectangle):
    """
    Docstring needed.
    """

    # When a Square object is created, a single side length is passed in.
    # The __init__ method should store the side length in both the width and height attributes from the Rectangle class.
    def __init__(self, side):
        self.width = side
        self.height = side

    # The Square class should be able to access the Rectangle class methods but should also contain a set_side method.
    def set_side(self, side):
        self.width = side
        self.height = side

    # If an instance of a Square is represented as a string, it should look like: Square(side=9)
    def __str__(self):
        return "Square(side={})".format(self.width)

    # Additionally, the set_width and set_height methods on the Square class should set both the width and height.
    def set_width(self, side):
        self.width = side
        return self.width

    def set_height(self, side):
        self.height = side
        return self.height
