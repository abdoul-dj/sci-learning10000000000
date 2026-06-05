const certificateService = require('../services/certificateService');

const createCertificate = async (req, res) => {
  try {
    const { lessonId, quizId, certificateUrl } = req.body;
    const certificate = await certificateService.createCertificate(
      req.user.id,
      lessonId,
      quizId,
      certificateUrl
    );
    res.status(201).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getUserCertificates(req.user.id);
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCertificateById = async (req, res) => {
  try {
    const certificate = await certificateService.getCertificateById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getAllCertificates();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCertificate,
  getUserCertificates,
  getCertificateById,
  getAllCertificates,
};
