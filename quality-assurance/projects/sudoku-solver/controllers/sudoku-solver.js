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
    // A, 1, 6
    // pass
    // const columnMatchUps = {
    //   "a": 1,
    //   "b": 2,
    //   "c": 3,
    //   "d": 4,
    //   "e": 5,
    //   "f": 6,
    //   "g": 7,
    //   "h": 8,
    //   "i": 9
    // }
    const puzzle = puzzleString || '';
    const puzzleRow = row || '';
    const puzzleColumn = column || '';
    const puzzleValue = value || '';
    // console.log(`${puzzle}, ${puzzleRow}, ${puzzleColumn}, ${puzzleValue}`);

    function getColumnContents(puzzleInput, n) {
      let fullColumn = "";
      for (let i = n - 1; i < puzzleInput.length; i += 9) {
        fullColumn += puzzleInput[i]; 
      }
      return fullColumn;
    }

    // const columnNumber = columnMatchUps[puzzleColumn.toLowerCase()]; // 1
    const columnToCheck = getColumnContents(puzzleString, puzzleColumn);
    console.log(`${puzzleColumn}, ${columnToCheck}`)
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
      // console.log(`${valueRow}, ${valueColumn}`)
      // note that "valueColumn" will need to be lowercased in order to work
      for (let i = 0; i < puzzleRegions.length; i++) {
        const potentialValidRows = puzzleRegions[i]["validRows"];
        const potentialValidColumns = puzzleRegions[i]["validColumns"];
        // console.log(`Potential valid rows: ${potentialValidRows}`);
        // console.log(`Potential valid columns: ${potentialValidColumns}`);
        if (potentialValidRows.includes(valueRow) && potentialValidColumns.includes(Number(valueColumn))) {
          // console.log("*** HELLO ***")
          // returns a string
          return puzzleRegions[i]["regionValues"];
        }
      }
      // may not need this?
      // return false
    }

    const regionToCheck = getRegion(puzzleRow.toLowerCase(), puzzleColumn, regions);
    // console.log(`puzzle row: ${puzzleRow}, puzzle column: ${puzzleColumn}, puzzleRegion: ${regionToCheck}`)
    // console.log(`Here's the region to check ${regionToCheck}`);
    // console.log(`Here's the puzzle value again: ${puzzleValue}`);

    if (regionToCheck) {
      if (!regionToCheck.includes(puzzleValue)) {
        // if the region doesn't include the value, then it's a potential match
        // console.log('The value is not in the region!')
        return true
      }
    }

    return false;
  
  }

  solve(puzzleString) {

    console.log("************** NEW ATTEMPT **************")

    // the actual solving logic goes here.
    
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

    // first, iterate through the puzzle string
    for (let i = 0; i < puzzleArray.length; i++) {
      // this ensures that we'll only try to solve the first row for now
      // if (i === 9) {
      //   break
      // }
      let cellValue = puzzleArray[i]
      console.log(cellValue)
      // if it does not equal a period, then it should be automatically put into the solution string
      if (cellValue !== '.') {
        console.log(`The cell value wasn't a period`)
        // solution += cellValue;
        // i++;
      } else {
        console.log(`Here is an i that is a period: ${i}`)
        // need to do the actual checking here.
        // might need to somehow get the row and column of the value?
        
        const rowLetter = columnMatchUps[Math.floor(i / 9)]; // needs to be a letter
        const columnNumber = ((i + 1) % 9 == 0) ? 9 : (i + 1) % 9 ; // needs to be a number

        for (let j = 1; j < 10; j++) {

          const value = j;

          console.log(`Inside the solver function: ${rowLetter}, ${columnNumber}, ${value}`);
          const solutionString = solution.join('');
          // console.log(`
          //   ${solutionString.substring(0, 9)}\n
          //   ${solutionString.substring(9, 18)}\n
          //   ${solutionString.substring(27, 36)}\n
          //   ${solutionString.substring(36, 45)}\n
          //   ${solutionString.substring(45, 54)}\n
          //   ${solutionString.substring(54, 63)}\n
          //   ${solutionString.substring(63, 72)}\n
          //   ${solutionString.substring(72, 81)}\n
          // `)
          // need to run the checkRowPlacement, checkColPlacement, and checkRegionPlacement methods on each cell
          const rowPlacement = this.checkRowPlacement(solutionString, rowLetter, columnNumber, value);
          const columnPlacement = this.checkColPlacement(solutionString, rowLetter, columnNumber, value);
          const regionPlacement = this.checkRegionPlacement(solutionString, rowLetter, columnNumber, value);

          console.log(`${solutionString}, ${rowPlacement}, ${columnPlacement}, ${regionPlacement}`);

          if (rowPlacement && columnPlacement && regionPlacement) {
            // need to somehow store the value of i and j for later in case I need to do this all over again
            solution[i] = String(j);
            console.log(`LATEST SOLUTION: ${solution}`)
            break
          }
        }
        
      }
    }
    // const checkRow = this.checkRowPlacement(puzzleString, 'A', 1, 9);
    // console.log(checkRow);
    // return checkRow;
    // return solution
    return solution.join('');
  }
}

module.exports = SudokuSolver;