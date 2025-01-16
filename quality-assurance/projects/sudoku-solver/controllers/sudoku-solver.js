class SudokuSolver {

  validate(puzzleString) {
    const puzzle = puzzleString || '';
    if (!puzzle) {
      return { error: 'Required field missing' }
    } else {
      const notNumbersOrPeriods = /[^0-9.]/g;
      const badCharacters = puzzle.match(notNumbersOrPeriods);
      if (badCharacters) {
        return { error: 'Invalid characters in puzzle' }
      } else if (puzzle.length !== 81) {
        return { error: 'Expected puzzle to be 81 characters long' }
      } else {
        return puzzle
      }
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // pass
  }

  checkColPlacement(puzzleString, row, column, value) {
    // pass
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // pass
  }

  solve(puzzleString) {
    // pass
  }
}

module.exports = SudokuSolver;