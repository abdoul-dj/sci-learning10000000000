const prisma = require('../config/db');

const createCertificate = async (userId, lessonId, quizId, certificateUrl) => {
  const existingCertificate = await prisma.certificate.findFirst({
    where: {
      userId,
      lessonId,
    },
  });

  if (existingCertificate) {
    throw new Error('Certificate already exists for this lesson');
  }

  const certificate = await prisma.certificate.create({
    data: {
      userId,
      lessonId,
      quizId,
      certificateUrl,
    },
  });
  return certificate;
};

const getUserCertificates = async (userId) => {
  const certificates = await prisma.certificate.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { issuedAt: 'desc' },
  });
  return certificates;
};

const getCertificateById = async (id) => {
  const certificate = await prisma.certificate.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return certificate;
};

const getAllCertificates = async () => {
  const certificates = await prisma.certificate.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { issuedAt: 'desc' },
  });
  return certificates;
};

module.exports = {
  createCertificate,
  getUserCertificates,
  getCertificateById,
  getAllCertificates,
};
