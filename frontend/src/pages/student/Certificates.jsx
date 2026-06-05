import React, { useState, useEffect } from 'react';
import CertificateCard from '../../components/certificates/CertificateCard';
import { certificateService } from '../../services/certificateService';
import Loader from '../../components/common/Loader';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await certificateService.getUserCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 text-lg mb-4">
            You haven't earned any certificates yet.
          </p>
          <p className="text-gray-500">
            Complete lessons and pass quizzes to earn certificates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
