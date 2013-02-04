var events = require('events')
  , util = require('util');

/*!
 * node-progress
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Expose `ProgressBar`.
 */

exports = module.exports = ProgressBar;

/**
 * Library version.
 */

exports.version = '0.1.0';

/**
 * Initialize a `ProgressBar` with the given
 * `format` string and `options`.
 *
 * Options:
 *
 *   - `total` total number of ticks to complete
 *   - `stream` the output stream defaulting to stdout
 *   - `complete` completion character defaulting to "="
 *   - `incomplete` incomplete character defaulting to "-"
 *
 * Tokens:
 *
 *   - `:bar` the progress bar itself
 *   - `:current` current tick number
 *   - `:total` total ticks
 *   - `:elapsed` time elapsed in seconds
 *   - `:percent` completion percentage
 *   - `:eta` eta in seconds
 *
 * @param {String} format
 * @param {Object} options
 * @api public
 */

function ProgressBar(format, options) {
  events.EventEmitter.call(this);
  this.rl = require('readline').createInterface({
    input: process.stdin,
    output: options.stream || process.stdout
  });
  this.rl.setPrompt('', 0);
  this.rl.clearLine = function() {
    if (process.platform === 'darwin') {
      this.output.write('\r');
    } else {
      this.write(null, {ctrl: true, name: 'u'});
    }
  };

  options = options || {};
  if ('string' != typeof format) throw new Error('format required');
  if ('number' != typeof options.total) throw new Error('total required');

  this.format = format;
  this.current = 0;
  this.total = options.total;
  this.width = options.width || this.total;
  this.chars = {
    complete: options.complete || '=',
    incomplete: options.incomplete || '-'
  };
}
util.inherits(ProgressBar, events.EventEmitter);

/**
 * "tick" the progress bar with optional `len` and
 * optional `tokens`.
 *
 * @param {Number|Object} len or tokens
 * @param {Object} tokens
 * @api public
 */

ProgressBar.prototype.tick = function(len, tokens) {
  if (len !== 0)
    len = len || 1;

  // swap tokens
  if ('object' == typeof len)
    tokens = len, len = 1;

  // start time for eta
  if (0 == this.current)
    this.start = new Date;

  // progress complete
  if ((this.current += len) >= this.total) {
    this.complete = true;
    this.rl.clearLine();
    this.rl.resume();
    this.rl.close();
    this.emit('end');
    return;
  }

  var percent = this.current / this.total * 100
    , complete = Math.round(this.width * (this.current / this.total))
    , incomplete
    , elapsed = new Date - this.start
    , eta = elapsed * (this.total / this.current - 1);

  complete = Array(complete).join(this.chars.complete);
  incomplete = Array(this.width - complete.length).join(this.chars.incomplete);

  var str = this.format
    .replace(':bar', complete + incomplete)
    .replace(':current', this.current)
    .replace(':total', this.total)
    .replace(':elapsed', (elapsed / 1000).toFixed(1))
    .replace(':eta', (eta / 1000).toFixed(1))
    .replace(':percent', percent.toFixed(0) + '%');

  if (tokens) {
    for (var key in tokens) {
      str = str.replace(':' + key, tokens[key]);
    }
  }
  
  this.rl.clearLine();
  this.rl.write(str);
};