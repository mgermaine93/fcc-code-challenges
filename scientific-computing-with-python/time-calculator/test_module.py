import unittest
from time_calculator import add_time


class UnitTests(unittest.TestCase):

    def test_same_period(self):
        actual = add_time("3:30 PM", "2:12")
        expected = "5:42 PM"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "3:30 PM", "2:12" to return "5:42 PM"')

    def test_different_period(self):
        actual = add_time("11:55 AM", "3:12")
        expected = "3:07 PM"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "11:55 AM", "3:12" to return "3:07 PM"')

    def test_next_day(self):
        actual = add_time("9:15 PM", "5:30")
        expected = "2:45 AM (next day)"
        self.assertEqual(
            actual, expected, 'Expected time to end with "(next day)" when it is the next day.')

    def test_period_change_at_twelve(self):
        actual = add_time("11:40 AM", "0:25")
        expected = "12:05 PM"
        self.assertEqual(actual, expected,
                         'Expected period to change from AM to PM at 12:00')

    def test_twenty_four(self):
        actual = add_time("2:59 AM", "24:00")
        expected = "2:59 AM (next day)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "2:59 AM", "24:00" to return "2:59 AM"')

    def test_two_days_later(self):
        actual = add_time("11:59 PM", "24:05")
        expected = "12:04 AM (2 days later)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "11:59 PM", "24:05" to return "12:04 AM (2 days later)"')

    def test_high_duration(self):
        actual = add_time("8:16 PM", "466:02")
        expected = "6:18 AM (20 days later)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "8:16 PM", "466:02" to return "6:18 AM (20 days later)"')

    def test_no_change(self):
        actual = add_time("5:01 AM", "0:00")
        expected = "5:01 AM"
        self.assertEqual(actual, expected,
                         'Expected adding 0:00 to return initial time.')

    def test_same_period_with_day(self):
        actual = add_time("3:30 PM", "2:12", "Monday")
        expected = "5:42 PM, Monday"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "3:30 PM", "2:12", "Monday" to return "5:42 PM, Monday"')

    def test_twenty_four_with_day(self):
        actual = add_time("2:59 AM", "24:00", "saturDay")
        expected = "2:59 AM, Sunday (next day)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "2:59 AM", "24:00", "saturDay" to return "2:59 AM, Sunday (next day)"')

    def test_two_days_later_with_day(self):
        actual = add_time("11:59 PM", "24:05", "Wednesday")
        expected = "12:04 AM, Friday (2 days later)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "11:59 PM", "24:05", "Wednesday" to return "12:04 AM, Friday (2 days later)"')

    def test_high_duration_with_day(self):
        actual = add_time("8:16 PM", "466:02", "tuesday")
        expected = "6:18 AM, Monday (20 days later)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "8:16 PM", "466:02", "tuesday" to return "6:18 AM, Monday (20 days later)"')

    def test_adding_hours_and_minutes_pm_to_pm(self):
        actual = add_time("3:00 PM", "3:10")
        expected = "6:10 PM"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "3:00 PM", "3:10" to return "6:10 PM"')

    def test_adding_hours_and_minutes_am_to_pm_with_day(self):
        actual = add_time("11:30 AM", "2:32", "Monday")
        expected = "2:02 PM, Monday"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "11:30 AM", "2:32", "Monday" to return "2:02 PM, Monday"')

    def test_adding_just_minutes_am_to_pm(self):
        actual = add_time("11:43 AM", "00:20")
        expected = "12:03 PM"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "11:43 AM", "00:20" to return "12:03 PM"')

    def test_adding_hours_and_minutes_to_get_next_day(self):
        actual = add_time("10:10 PM", "3:30")
        expected = "1:40 AM (next day)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "10:10 PM", "3:30" to return "1:40 AM (next day)"')

    def test_adding_hours_and_minutes_with_oddly_formatted_day_to_get_two_days_later(self):
        actual = add_time("11:43 PM", "24:20", "tueSday")
        expected = "12:03 AM, Thursday (2 days later)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "11:43 PM", "24:20", "tueSday" to return "12:03 AM, Thursday (2 days later)"')

    def test_adding_hours_and_minutes_with_long_duration_that_goes_pm_to_am(self):
        actual = add_time("6:30 PM", "205:12")
        expected = "7:42 AM (9 days later)"
        self.assertEqual(
            actual, expected, 'Expected calling "add_time()" with "6:30 PM", "205:12" to return "7:42 AM (9 days later)"')


if __name__ == "__main__":
    unittest.main()
