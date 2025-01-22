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
    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';
    console.log(`${puzzle}, ${puzzleRow}, ${puzzleColumn}, ${puzzleValue}`);
  }

  checkColPlacement(puzzleString, row, column, value) {
    // pass
    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';
    console.log(`${puzzle}, ${puzzleRow}, ${puzzleColumn}, ${puzzleValue}`);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // pass
    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';
    console.log(`${puzzle}, ${puzzleRow}, ${puzzleColumn}, ${puzzleValue}`);
  }

  solve(puzzleString) {
    // pass
    // main solving logic goes here
  }
}

module.exports = SudokuSolver;