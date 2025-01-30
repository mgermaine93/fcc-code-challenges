class SudokuSolver {

  validate(puzzleString) {
    const puzzle = puzzleString || '';
    const notNumbersOrPeriods = /[^0-9.]/g;
    const badCharacters = puzzle.match(notNumbersOrPeriods);
    if (!puzzle) {
      return {
        error: 'Required field missing'
      }
    } else if (puzzle.length !== 81) {
      return {
        error: 'Expected puzzle to be 81 characters long'
      } 
    } else {
      // length is good, but what about the contents?
      if (badCharacters) {
        return {
          error: 'Invalid characters in puzzle'
        }
      }
      // if we get here, then the puzzle is validated
      return true
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
    const rowToCheck = rows[columnMatchUps[puzzleRow.toLowerCase()]]
    if (rowToCheck.includes(value)) {
      // the value is already in the row, which is undesirable
      return false;
    } else {
      // the value is not already in the row, which means it could be a fit
      return true;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    
    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';

    function getColumnContents(puzzleInput, n) {
      let fullColumn = "";
      for (let i = n - 1; i < puzzleInput.length; i += 9) {
        fullColumn += puzzleInput[i]; 
      }
      return fullColumn;
    }

    const columnToCheck = getColumnContents(puzzleString, puzzleColumn);

    if (columnToCheck.includes(value)) {
      // the value is already in the column, which is undesirable
      return false;
    } else {
      // the value is not already in the column, which means it could be a fit
      return true;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {

    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';

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

    function getRegion(valueRow, valueColumn, puzzleRegions) {
      // note that "valueColumn" will need to be lowercased in order to work
      for (let i = 0; i < puzzleRegions.length; i++) {
        const potentialValidRows = puzzleRegions[i]["validRows"];
        const potentialValidColumns = puzzleRegions[i]["validColumns"];
        if (potentialValidRows.includes(valueRow) && potentialValidColumns.includes(Number(valueColumn))) {
          // returns a string
          return puzzleRegions[i]["regionValues"];
        }
      }
      return false
    }

    const regionToCheck = getRegion(puzzleRow.toLowerCase(), puzzleColumn, regions);

    if (regionToCheck) {
      if (!regionToCheck.includes(puzzleValue)) {
        // if the region doesn't include the value, then it's a potential match
        return true
      }
    }

    return false;
  
  }

  // the actual solving logic goes here.
  solve(puzzleString) {

    let puzzleArray = puzzleString.split('');
    let solution = puzzleArray;

    const columnMatchUps = {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
      4: "E",
      5: "F",
      6: "G",
      7: "H",
      8: "I"
    }

    let numIterations = 1;

    while (solution.includes('.')) {
      
      for (let i = 0; i < puzzleArray.length; i++) {

        let cellValue = puzzleArray[i]

        if (cellValue === '.') {
          
          const rowLetter = columnMatchUps[Math.floor(i / 9)]; // needs to be a letter
          const columnNumber = ((i + 1) % 9 == 0) ? 9 : (i + 1) % 9 ; // needs to be a number
          let validValues = [];

          for (let j = 1; j < 10; j++) {

            const value = j;
            const solutionString = solution.join('');
            
            // need to run the checkRowPlacement, checkColPlacement, and checkRegionPlacement methods on each cell
            const rowPlacement = this.checkRowPlacement(solutionString, rowLetter, columnNumber, value);
            const columnPlacement = this.checkColPlacement(solutionString, rowLetter, columnNumber, value);
            const regionPlacement = this.checkRegionPlacement(solutionString, rowLetter, columnNumber, value);

            if (rowPlacement && columnPlacement && regionPlacement) {
              validValues.push(String(j));
            }
          }

          if (validValues.length == 1) {
            solution[i] = validValues[0];
          }
          
        }
      }
      // "i" should restart here if the puzzle still isn't solved
      numIterations++
      if (numIterations >= 100) {
        return false
      }
    }
    return solution.join('');
  }
}

module.exports = SudokuSolver;