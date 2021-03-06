require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora(chalk`{magenta.bold build for production...}`)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // console.log(chalk.bold.redBright('\n  testing built complete.\n\n'))
    // console.log(chalk.yellow(
    //   '  Tip: TESTING built files are meant to be served over an HTTP server.\n' +
    //   '  Opening index.html over file:// won\'t work.\n'
    // ))

    console.log(chalk`

    {magenta.bold build complete.}

    {yellow.bold {redBright Tip:} TESTING built files are meant to be served over an HTTP server.
    Opening index.html over file:// won\'t work.}

    `)

  })
})
