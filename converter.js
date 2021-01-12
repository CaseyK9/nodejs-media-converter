'use strict';

const path = require('path');
const colors = require('colors');
const ffmpeg = require('fluent-ffmpeg');

/**
 * Media Converter Function
 * @param {string} input - path of input file
 * @param {string} output - path of output file
 * @param {Function} callback - node-style callback fn (error, result)        
 * @param {Boolean} verbose - whether verbose the logs or not
 */
function convert(input, output, callback, verbose = true) {
  ffmpeg(input)
    .output(output)
    .on('start', () => {
      if (verbose) {
        console.log();
        console.log('#####'.brightBlue + ' Conversion Started '.brightBlue + '☐'.brightGreen);
        console.log('#'.brightBlue);
        console.log(`   input:  '${input}'`);
      }
      if (callback) callback(null);
    })
    .on('end', async () => {
      if (verbose) {
        console.log(`   output: '${output}'`);
        console.log('#'.brightBlue);
        console.log('#####'.brightBlue + ' Conversion  Ended  '.brightBlue + '☑'.brightGreen);
        console.log();
      }
      if (callback) callback(null);
    })
    .on('error', (err) => {
      console.error(err);
      if (callback) callback(err);
    })
    .run();
}

module.exports = {
  convert: convert
};
