const game_preset_model = require('../models/game_preset_model.js');
const ErrorHandler = require('../modules/error_handler/error_handler.js');

const MIN_EXPRESSION_DIFFICULTY = 1;
const MAX_EXPRESSION_DIFFICULTY = 3;

class GameService
{
  getGamePresets(done){
    game_preset_model.find({}, '-__v', (err, presets) => {
      if(err){
        return done(new ErrorHandler(500, 'Cannot find presets'));
      }
      return done(null, presets);
    });
  }
  getGamePresetById(preset_id, done){
    game_preset_model.findById(preset_id, '-__v', (err, preset) => {
      if(err){
        return done(new ErrorHandler(500, 'Cannot find presets'));
      }
      return done(null, preset);
    });
  }
  generateAddExpression(difficulty){
    const expr_ceil = this.generateMaxNumber(difficulty);
    
    const a = this.getRandomInt(0, expr_ceil);
    const b = this.getRandomInt(0, expr_ceil);

    const answer = a + b;
    const expression_str = `${a} + ${b}`;

    return {expression: expression_str, answer: answer};
  }
  generateSubtractExpression(difficulty) {
    const expr_ceil = this.generateMaxNumber(difficulty);
    
    const a = this.getRandomInt(0, expr_ceil);
    const b = this.getRandomInt(0, expr_ceil);

    const answer = a - b;
    const expression_str = `${a} - ${b}`;

    return {expression: expression_str, answer: answer};
  }
  generateMultiplyExpression(difficulty) {
    const expr_ceil = this.generateMaxNumber(difficulty);
    
    const a = this.getRandomInt(0, expr_ceil);
    const b = this.getRandomInt(0, expr_ceil);

    const answer = a * b;
    const expression_str = `${a} * ${b}`;

    return {expression: expression_str, answer: answer};
  }
  generateDivisionExpression(difficulty) {
    const expr_ceil = this.generateMaxNumber(difficulty);
    
    const a = this.getRandomInt(0, expr_ceil);
    let b = this.getRandomInt(0, expr_ceil);
    while(1)
      if(b == 0) b = this.getRandomInt(0, expr_ceil);
      else break;
    
    const answer = a * b;
    const expression_str = `${answer} / ${b}`;

    return {expression: expression_str, answer: a};
  }
  generateMaxNumber(difficulty) {
    const diff = Math.max(Math.min(difficulty, MAX_EXPRESSION_DIFFICULTY), MIN_EXPRESSION_DIFFICULTY);   
    let max = 0;
 
    for(let i = 0; i < diff; i++){
      max += 9 * Math.pow(10, i);    
    }
    return max;
  }
  // in range [min, max]
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }
  translationModeToMathExpression(mode){
    const mode_name = mode.name;
    const mode_difficulty = mode.difficulty;

    if(mode_name === "add")
      return this.generateAddExpression(mode_difficulty);
    else if(mode_name === "subtract")
      return this.generateSubtractExpression(mode_difficulty);
    else if(mode_name === "multiply")
      return this.generateMultiplyExpression(mode_difficulty);
    else if(mode_name === "division")
      return this.generateDivisionExpression(mode_difficulty);
    
    return null;
  }
}


module.exports = new GameService();