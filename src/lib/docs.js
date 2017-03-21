const validate = require('./validate.js');
const vm = require('vm');
const http = require('http');
const concat = require('concat-stream');

const control = {
  run: function(msg, args) {
    let version = "gms2";

    if (args.length > 2) {
      version = args[2];
    } else if (args.length == 1) {
      msg.author.sendMessage("You did not include a function name. Type `!help` for help with commands.");
      return;
    }

    switch (version) {
      case "gms1":
        if (validate.gml.gms1(args[1])) {
          this.helpUrlGMS1(msg, args[1]);
        } else {
          msg.author.sendMessage("`" + args[1] + "` was not a recognized GMS1 function. Type `!help` for help with commands.");
        }
        break;
      case "gms2":
        if (validate.gml.gms2(args[1])) {
          this.helpUrlGMS2(msg, args[1]);
        } else {
          msg.author.sendMessage("`" + args[1] + "` was not a recognized GMS2 function. Type `!help` for help with commands.");
        }
        break;
      default:
        msg.author.sendMessage("`" + version + "` was not a valid option. Type `!help` for help with commands.");
        break;
    }
  },
  helpUrlGMS2: (msg, fn) => {
    http.get("http://docs2.yoyogames.com/files/searchdat.js", (res) => {
      res.setEncoding('utf8');
      res.pipe(concat({encoding: 'string'}, function (remoteSrc) {
        let found = false;
        vm.runInThisContext(remoteSrc, 'remote_modules/searchdat.js');
        for (var i = 0; i < SearchTitles.length; i++) {
          if (SearchTitles[i] == fn) {
            msg.channel.sendMessage('Here\'s the GMS2 documentation for ' + fn);
            msg.channel.sendMessage(encodeURI('http://docs2.yoyogames.com/' + SearchFiles[i]));
            found = true;
          }
        }

        if(!found){
          msg.author.sendMessage("`" + fn + "` was not a recognized GMS2 function. Type `!help` for help with commands.");
        }
      }));
    });
  },
  helpUrlGMS1: (msg, fn) => {
    http.get("http://docs.yoyogames.com/files/searchdat.js", (res) => {
      res.setEncoding('utf8');
      res.pipe(concat({encoding: 'string'}, function (remoteSrc) {
        let found = false;
        vm.runInThisContext(remoteSrc, 'remote_modules/searchdat.js');
        for (var i = 0; i < SearchTitles.length; i++) {
          if (SearchTitles[i] == fn) {
            msg.channel.sendMessage('Here\'s the GMS1 documentation for ' + fn);
            msg.channel.sendMessage(encodeURI('http://docs.yoyogames.com/' + SearchFiles[i]));
            found = true;
          }
        }
      }));
    });
  }
};

module.exports.control = control;