if (process.env.DEVELOPMENT) {
  require('dotenv').config();
  require('morgan')('dev');
}
// next line enable to shorten relative path (hell)
require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* add what even routes here */
app.use('/user', require('@routes/user/user.routes'));

/* Catch any error in the whole application */
app.use((error, req, res, next) => {
  /**
   * @example
   * you can check error object if you add some metadata
   * e.g
   * error.mine === true ?
   * if so then you will fine status and message
   * if not just return whatever you want
   */
  if (error.status) {
    return res.status(error.status).json({
      success: false,
      message: error.message
    });
  }
  // if not just return internal error
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

/* Not Found Page */
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Page Not Found',
    success: false
  });
});

/**
 * @param process.env.PORT
 */
app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});
