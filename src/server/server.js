/* eslint-disable no-console */
const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'))
})

const compiler = webpack(webpackConfig)
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
  }),
)

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')))
