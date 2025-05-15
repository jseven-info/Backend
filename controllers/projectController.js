// controllers/projectController.js
const Project = require('../models/Project');

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, status, startDate, endDate } = req.body;

    const newProject = new Project({
      name,
      status,
      startDate: startDate || null,
      endDate: endDate || null
    });

    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    console.error('❌ Error in projectController.create:', err.message);
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = {
      ...req.body,
      startDate: req.body.startDate || null,
      endDate: req.body.endDate || null
    };

    const updated = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};





exports.delete = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};






exports.getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
