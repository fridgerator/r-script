# r-script

### In development, still a WIP

Module for running R scripts from node

Based on [r-script](https://github.com/joshkatz/r-script) by [joshkatz](https://github.com/joshkatz).  Decided to re-write this project because I need similar functionality and that project seems unmaintained.

## Installation

R needs to already be installed, and [jsonlite](https://cran.r-project.org/web/packages/jsonlite/index.html) R library needs to be installed.

`yarn add @fridgerator/r-script` or `npm install @fridgerator/r-script`

## Usage

In an R file: 

```R
input[[1]] + input[[2]]
```

In node:

```javascript
const { R } = require('@fridgerator/r-script')

// optionally pass an environment object if Rscript is not in your system PATH
// `process.env` will be used as default
let r = new R('./add.R', {PATH: '/bin:/location/to/R/bin'})

// data is converted to a list variable `input` in the R script
r.data(2, 3)

// call the script async
r.call()
  .then(response => response === 5) // true
  .catch(e => console.log('error : ', e))

// OR call the script async

let result = r.callSync() // could raise an exception
result === 5 // true
```
