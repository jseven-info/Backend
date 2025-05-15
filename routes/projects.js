const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');

// ✅ Add this line if missing
router.get('/:id', auth, projectController.getById); // <- THIS IS REQUIRED

// existing routes
router.get('/', projectController.getAll);
router.post('/', auth, projectController.create);
router.put('/:id', auth, projectController.update);
router.delete('/:id', auth, projectController.delete);

module.exports = router;
