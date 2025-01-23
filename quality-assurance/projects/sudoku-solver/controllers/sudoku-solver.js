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
    
    const columnMatchUps = {
      "a": 0,
      "b": 1,
      "c": 2,
      "d": 3,
      "e": 4,
      "f": 5,
      "g": 6,
      "h": 7,
      "i": 8
    }

    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';
    // console.log(`${puzzle}, ${puzzleRow}, ${puzzleColumn}, ${puzzleValue}`);

    // what we need to do here is break up the puzzle string into nine chunks (rows) of nine items each.
    // hardcoding may not seem ideal, but that's why we have the validate() method.
    const rows = [
      puzzleString.slice(0, 9),
      puzzleString.slice(9, 18),
      puzzleString.slice(18, 27),
      puzzleString.slice(27, 36),
      puzzleString.slice(36, 45),
      puzzleString.slice(45, 54),
      puzzleString.slice(54, 63),
      puzzleString.slice(63, 72),
      puzzleString.slice(72)
    ];
    console.log(rows);
    const rowToCheck = rows[columnMatchUps[puzzleRow.toLowerCase()]]
    console.log(rowToCheck);
    if (rowToCheck.includes(value)) {
      // the value is already in the row, which is undesirable
      return false;
    } else {
      // the value is not already in the row, which means it could be a fit
      return true;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    // pass
    const rowMatchUps = {
      "a": 1,
      "b": 2,
      "c": 3,
      "d": 4,
      "e": 5,
      "f": 6,
      "g": 7,
      "h": 8,
      "i": 9
    }
    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';
    // console.log(`${puzzle}, ${puzzleRow}, ${puzzleColumn}, ${puzzleValue}`);

    function getEveryNthCharacter(puzzleInput, n) {
      let fullColumn = "";
      for (let i = n - 1; i < puzzleInput.length; i += 9) {
        fullColumn += puzzleInput[i]; 
      }
      return fullColumn;
    }

    const columnNumber = rowMatchUps[puzzleRow.toLowerCase()];
    const columnToCheck = getEveryNthCharacter(puzzleString, columnNumber);
    console.log(`Here are the results: ${columnToCheck}`);
    if (columnToCheck.includes(value)) {
      // the value is already in the column, which is undesirable
      return false;
    } else {
      // the value is not already in the column, which means it could be a fit
      return true;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // pass
    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';
    console.log(`${puzzle}, ${puzzleRow}, ${puzzleColumn}, ${puzzleValue}`);

    // need to somehow get the regions...
    // maybe do a list of strings?
    // let regions = [
      // [puzzleString.slice(0,3), puzzleString.slice(9, 12), puzzleString.slice(18, 21)].join(''),
      // [puzzleString.slice(3,6), puzzleString.slice(12, 15), puzzleString.slice(21, 24)].join(''),
      // [puzzleString.slice(6,9), puzzleString.slice(15, 18), puzzleString.slice(24, 27)].join(''),
      // [puzzleString.slice(27,30), puzzleString.slice(36, 39), puzzleString.slice(45, 48)].join(''),
      // [puzzleString.slice(30,33), puzzleString.slice(39, 42), puzzleString.slice(48, 51)].join(''),
      // [puzzleString.slice(33,36), puzzleString.slice(42, 45), puzzleString.slice(51, 54)].join(''),
      // [puzzleString.slice(54,57), puzzleString.slice(63, 66), puzzleString.slice(72, 75)].join(''),
      // [puzzleString.slice(57,60), puzzleString.slice(66, 69), puzzleString.slice(75, 78)].join(''),
      // [puzzleString.slice(60,63), puzzleString.slice(69, 72), puzzleString.slice(78)].join('')
    // ]

    const regions = [
      // top left
      {
        regionValues: [puzzleString.slice(0,3), puzzleString.slice(9, 12), puzzleString.slice(18, 21)].join(''),
        validColumns: [1, 2, 3],
        validRows: ['a', 'b', 'c']
      },
      // top middle
      {
        regionValues: [puzzleString.slice(3,6), puzzleString.slice(12, 15), puzzleString.slice(21, 24)].join(''),
        validColumns: [4, 5, 6],
        validRows: ['a', 'b', 'c']
      },
      // top right
      {
        regionValues: [puzzleString.slice(6,9), puzzleString.slice(15, 18), puzzleString.slice(24, 27)].join(''),
        validColumns: [7, 8, 9],
        validRows: ['a', 'b', 'c']
      },
      // middle left
      {
        regionValues: [puzzleString.slice(27,30), puzzleString.slice(36, 39), puzzleString.slice(45, 48)].join(''),
        validColumns: [1, 2, 3],
        validRows: ['d', 'e', 'f']
      },
      // middle middle
      {
        regionValues: [puzzleString.slice(30,33), puzzleString.slice(39, 42), puzzleString.slice(48, 51)].join(''),
        validColumns: [4, 5, 6],
        validRows: ['d', 'e', 'f']
      },
      // middle right
      {
        regionValues: [puzzleString.slice(33,36), puzzleString.slice(42, 45), puzzleString.slice(51, 54)].join(''),
        validColumns: [7, 8, 9],
        validRows: ['d', 'e', 'f']
      },
      // bottom left
      {
        regionValues: [puzzleString.slice(54,57), puzzleString.slice(63, 66), puzzleString.slice(72, 75)].join(''),
        validColumns: [1, 2, 3],
        validRows: ['g', 'h', 'i']
      },
      // bottom middle
      {
        regionValues: [puzzleString.slice(57,60), puzzleString.slice(66, 69), puzzleString.slice(75, 78)].join(''),
        validColumns: [4, 5, 6],
        validRows: ['g', 'h', 'i']
      },
      // bottom right
      {
        regionValues: [puzzleString.slice(60,63), puzzleString.slice(69, 72), puzzleString.slice(78)].join(''),
        validColumns: [7, 8, 9],
        validRows: ['g', 'h', 'i']
      }
    ]

    // now what I need to do is figure out which region the value is in...
    // will probably need to do this with the row and column somehow.

    function getRegion(valueRow, valueColumn, puzzleRegions) {
      // note that "valueColumn" will need to be lowercased in order to work
      for (let i = 0; i < puzzleRegions.length; i++) {
        const potentialValidRows = puzzleRegions[i]["validRows"];
        const potentialValidColumns = puzzleRegions[i]["validColumns"];
        console.log(`Potential valid rows: ${potentialValidRows}`);
        console.log(`Potential valid columns: ${potentialValidColumns}`);
        if (potentialValidRows.includes(valueRow) && potentialValidColumns.includes(valueColumn)) {
          // returns a string
          return puzzleRegions[i]["regionValues"];
        }
      }
      // may not need this?
      return false
    }

    const regionToCheck = getRegion(puzzleRow.toLowerCase(), puzzleColumn, regions);
    console.log(`Here's the region to check ${regionToCheck}`);
    console.log(`Here's the puzzle value again: ${puzzleValue}`);

    if (regionToCheck) {
      if (!regionToCheck.includes(puzzleValue)) {
        // if the region doesn't include the value, then it's a potential match
        console.log('The value is not in the region!')
        return true
      }
    }

    return false;
  
  }

  solve(puzzleString) {
    
    let solution = [];
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < puzzleString.length; i++) {
      let cellValue = puzzleString[i]
      if (cellValue !== '.') {
        solution.push(cellValue)
      } else {
        // need to do the actual checking here.
        // might need to somehow get the row and column of the value?
        pass
      }
    }
    const checkRow = this.checkRowPlacement(puzzleString, 'A', 1, 9);
    console.log(checkRow);
    return checkRow;
    // return solution
  }
}

module.exports = SudokuSolver;