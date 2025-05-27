const mongoose = require('mongoose');
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
    let { name, status, startDate, endDate } = req.body;

    // Convert invalid dates (like "TBA" or empty) to null
    if (!startDate || startDate === 'TBA') startDate = null;
    if (!endDate || endDate === 'TBA') endDate = null;

    if (!name || !status) {
      return res.status(400).json({ message: 'Name and status are required' });
    }

    const newProject = new Project({
      name,
      status,
      startDate,
      endDate
    });

    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    console.error('❌ Error in projectController.create:', err);
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};


exports.update = async (req, res) => {
  try {
    let { name, status, startDate, endDate } = req.body;

    if (startDate === 'TBA') startDate = null;
    if (endDate === 'TBA') endDate = null;

    const data = { name, status, startDate, endDate };

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
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid or missing project ID' });
  }

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
