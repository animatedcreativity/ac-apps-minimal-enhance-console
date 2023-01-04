exports = module.exports = function() {
  var mod = {
    logged: false,
    start: function() {
      app.console = function() {
        if (app.has(app.cliOptions) && app.has(app.cliOptions.consoleKey)) {
          if (!app.has(mod.consoleRe)) {
            mod.consoleRe = require('console-remote-client').connect({server: "https://console.ylo.one:8088", channel: app.cliOptions.consoleKey});
          }
          var args = Array.prototype.slice.call(arguments);
          if (app.has(app.cliOptions.consolePrefix)) {
            args.unshift("[lime]" + app.cliOptions.consolePrefix + "[/lime]");
          }
          console.re.log.apply(null, args);
          mod.logged = true;
        }
      };
      app.exit = async function(time) {
        if (mod.logged === true) {
          console.log("Waiting for remote console...");
          if (!app.has(time)) time = 5; // 5 seconds
          await new Promise(function(resolve, reject) {
            setTimeout(function() { resolve(true); }, time * 1000);
          });
        }
        process.exit();
      };
      app.consoleColors = {
        reset: "\x1b[0m%s\x1b[0m",
        bright: "\x1b[1m%s\x1b[0m",
        dim: "\x1b[2m%s\x1b[0m",
        underscore: "\x1b[4m%s\x1b[0m",
        blink: "\x1b[5m%s\x1b[0m",
        reverse: "\x1b[7m%s\x1b[0m",
        hidden: "\x1b[8m%s\x1b[0m",
        fgBlack: "\x1b[30m%s\x1b[0m",
        fgRed: "\x1b[31m%s\x1b[0m",
        fgGreen: "\x1b[32m%s\x1b[0m",
        fgYellow: "\x1b[33m%s\x1b[0m",
        fgBlue: "\x1b[34m%s\x1b[0m",
        fgMagenta: "\x1b[35m%s\x1b[0m",
        fgCyan: "\x1b[36m%s\x1b[0m",
        fgWhite: "\x1b[37m%s\x1b[0m",
        fgGray: "\x1b[90m%s\x1b[0m",
        bgBlack: "\x1b[40m%s\x1b[0m",
        bgRed: "\x1b[41m%s\x1b[0m",
        bgGreen: "\x1b[42m%s\x1b[0m",
        bgYellow: "\x1b[43m%s\x1b[0m",
        bgBlue: "\x1b[44m%s\x1b[0m",
        bgMagenta: "\x1b[45m%s\x1b[0m",
        bgCyan: "\x1b[46m%s\x1b[0m",
        bgWhite: "\x1b[47m%s\x1b[0m",
        bgGray: "\x1b[100m%s\x1b[0m"
      };
    }
  };
  mod.start();
  return mod;
}