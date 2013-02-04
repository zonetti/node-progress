# node-progress

  Flexible ascii progress bar

## Installation

    npm install git://github.com/zonetti/node-progress.git

## Usage

   First we create a `ProgressBar`, giving it a format string
   as well as the `total`, telling the progress bar when it will
   be considered complete. After that all we need to do is `tick()` appropriately. 

```javascript
var ProgressBar = require('progress');

var progressBar = new ProgressBar(' downloading [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: 100
});

var timer = setInterval(function(){
  progressBar.tick(1);
}, 100);

progressBar.on('end', function() {
  clearInterval(timer);
  console.log('Done!')
});
```

## Options

  - `total` total number of ticks to complete
  - `stream` the output stream defaulting to stdout
  - `complete` completion character defaulting to "="
  - `incomplete` incomplete character defaulting to "-"

## Tokens

  - `:bar` the progress bar itself
  - `:current` current tick number
  - `:total` total ticks
  - `:elapsed` time elapsed in seconds
  - `:percent` completion percentage
  - `:eta` estimated completion time in seconds

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk `&lt;tj@vision-media.ca&gt;`

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.