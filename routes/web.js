const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', {title:'Welcome to Load Calculator'});
});

module.exports = router;
