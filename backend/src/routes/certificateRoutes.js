const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', protect, certificateController.createCertificate);
router.get('/user', protect, certificateController.getUserCertificates);
router.get('/', protect, admin, certificateController.getAllCertificates);
router.get('/:id', protect, certificateController.getCertificateById);

module.exports = router;
