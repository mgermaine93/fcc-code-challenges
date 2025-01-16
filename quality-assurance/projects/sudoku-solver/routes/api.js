'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzleToSolve = req.body.puzzle;
      const validation = solver.validate(puzzleToSolve);
      console.log(validation)
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const validation = solver.validate(req.body.puzzle);
      console.log(validation);
      res.json(validation)
    });
};