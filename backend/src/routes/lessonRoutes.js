const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');

router.post('/', protect, admin, upload.single('image'), lessonController.createLesson);
router.get('/', lessonController.getAllLessons);
router.get('/:id', lessonController.getLessonById);
router.put('/:id', protect, admin, upload.single('image'), lessonController.updateLesson);
router.delete('/:id', protect, admin, lessonController.deleteLesson);
router.put('/:id/progress', protect, lessonController.updateLessonProgress);
router.get('/user/progress', protect, lessonController.getUserProgress);

module.exports = router;
