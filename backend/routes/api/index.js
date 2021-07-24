const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const lodgingsRouter = require('./lodgings.js');
const bookingsRouter = require('./bookings.js');

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/lodgings', lodgingsRouter);
router.use('/bookings', bookingsRouter);





module.exports = router;
