// var defaultTemplates = require('./default.templates.js');
var templates = require('./templates.js');
// var words = require('./words.js');
// words is a requirement for wordbank.....
var wordbank = require('./wordbank.test.js')(require('./words.js'));
var storygen = require('./propp.js');

var world = storygen().world;

var oneStory = function() {

  try {

    var text = [];

    // nope nope nope

    var presets = world.util.randomProperty(storygen.presets);


    var setts = {
      herogender: 'random',
      villaingender: 'random',
      peoplegender: 'random',
      functions: storygen.resetProppFunctions(),
      // randomizer
      funcs: presets.functions,
      // funcs: ['func0', 'func2', 'func3', 'func8', 'func30', 'func31'],
      // funcs: ['func0', 'func2', 'func3', ['func8', 'commits murder'], 'func30', 'func31'],
      // funcs: [['func8', 'casting into body of water'], 'func30'],
      // bossmode: true,
      bossfight: presets.bossfight,
      verbtense: 'past'
    };

    var theme = {
      bank: wordbank,
      templates: templates
    };


    var sg = new storygen(setts);

    // console.log(sg);

    var tale = sg.generate(setts, theme);

    // if (!tale.title) {
    //   console.log('NO TITLE!');
    // } else {
    //   console.log(tale.title);
    // }

    // if (tale.title.indexOf(', and') > -1) {
    //   console.log('generated: ' + tale.title);
    //   console.log('====================================');
    // }

    return tale;

  } catch(ex) {
    console.log(ex);
    // the last 3 items are non-standard.....
    var msg = ex.name + ' : ' + ex.message;
    if (ex.lineNumber && ex.columnNumber && ex.stack) {
      msg += ' line: ' + ex.lineNumber + ' col: ' + ex.columnNumber + '\n'
        + ex.stack;
    }
    console.log(msg);
  }
};



// http://stackoverflow.com/questions/18679576/counting-words-in-string
var wordcount = function(s) {

  s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
  s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
  return s.split(' ').length;

};


var writeitout = function(text) {

  var fs = require('fs');

  var fn = 'wonder.tale.' + (Math.random() * 0x1000000000).toString(36) + '.txt';

  fs.writeFile(fn, text);

  console.log('\n\nWritten to ' + fn);

};

var novel = function() {

  var wc = 0;
  var n = [];

  while (wc < 20000) {

    var tale = oneStory();

    if (tale && tale.title) {
      console.log(wc + ' : ' + tale.title);
      n.push(tale.title);
    }


  }

  writeitout(n.join('\n\n'));

  console.log('DONE');


};

// TODO: take in some param; if present, output a set n stories

novel();

// console.log(oneStory());
// console.log(oneStory());
// console.log(oneStory());
