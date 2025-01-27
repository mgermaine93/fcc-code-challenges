'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      const puzzle = req.body.puzzle || '';
      const coordinate = req.body.coordinate || '';
      const value = req.body.value || '';

      if (!puzzle || !coordinate || !value) {
        res.json({
          error: 'Required field(s) missing'
        });
        return;
      }
      else {

        const validation = solver.validate(puzzle);

        if (validation !== true) {
          res.json(validation);
          return;
        }

        // if we get here, then we know that we have all the fields we need to run a check
        const coordinateRow = coordinate.slice(0, 1);
        const coordinateColumn = coordinate.slice(1);
        console.log(`${coordinateRow}, ${coordinateColumn}`);

        const singleLetter = /^[A-Ia-i]$/;
        const singleNumber = /^[1-9]$/;

        if (!singleLetter.test(coordinateRow) || (!singleNumber.test(coordinateColumn))) {
          res.json({
            error: 'Invalid coordinate'
          });
          return;
        }
        else if (!singleNumber.test(value)) {
          console.log(singleNumber.test(value));
          res.json({
            error: 'Invalid value'
          });
          return;
        }
        else {
          const validation = solver.validate(puzzle);
          // might need to do some editing here
          console.log(validation);
          const rowPlacement = solver.checkRowPlacement(puzzle, coordinateRow, coordinateColumn, value);
          const columnPlacement = solver.checkColPlacement(puzzle, coordinateRow, coordinateColumn, value);
          const regionPlacement = solver.checkRegionPlacement(puzzle, coordinateRow, coordinateColumn, value);

          if (validation !== true) {
            res.json({validation});
            return;
          }
          else {

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

            function makeRowsFromPuzzleString(str) {
              let output = [];
              for (let i = 0; i < str.length; i += 9) {
                output.push(str.substring(i, i + 9))
              }
              return output;
            }

            const rowInQuestion = makeRowsFromPuzzleString(puzzle)[columnMatchUps[coordinateRow.toLowerCase()]];
            const existingValueInCell = rowInQuestion[Number(coordinateColumn)-1];
            // check to see if the user-input coordinate is already in the puzzle
            if (existingValueInCell === value) {
              res.json({valid: true});
              return;
            }
            // if all three of these are true, it should be valid
            else if (rowPlacement && columnPlacement && regionPlacement) {
              res.json({
                valid: true
              });
              return;
            } else {
              let conflicts = [];
              if (!rowPlacement) {
                conflicts.push("row");
              }
              if (!columnPlacement) {
                conflicts.push("column");
              }
              if (!regionPlacement) {
                conflicts.push("region");
              }
              res.json({
                valid: false,
                conflict: conflicts
              });
              return;
            }
          }
        }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      
      const puzzle = req.body.puzzle || '';
      const validation = solver.validate(puzzle);

      if (validation !== true) {
        res.json(validation);
        return;
      } else {
        // this is where the solving attempt takes place
        // but note that most of the logic for the solving part is in the "sudoku-solver.js" file
        res.json({puzzle: puzzle});
        return;
      }
    });
};