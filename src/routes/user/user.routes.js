const router = require('express').Router();

// if you use async-await (you need to add try/catch block // but less info)
router.post('/create', (req, res, next) => {
  // create you awesome user
  const error = new Error();
  // try add custom metadata
  error.status = 400;
  error.message = 'wow error was handled!';
  throw error;
  res.json('created');
});

module.exports = router;
