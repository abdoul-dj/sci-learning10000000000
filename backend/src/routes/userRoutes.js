const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', protect, admin, userController.getAllUsers);
router.get('/:id', protect, admin, userController.getUserById);
router.put('/:id/role', protect, admin, userController.updateUserRole);
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
