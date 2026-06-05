import React from 'react';
import { Award, Calendar, Download } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const CertificateCard = ({ certificate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-center">
          <Award className="h-16 w-16 text-white" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
          Certificate of Completion
        </h3>
        <p className="text-gray-600 text-sm mb-4 text-center">
          This certifies that {certificate.user?.name} has successfully completed the course.
        </p>
        <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          Issued on {formatDate(certificate.issuedAt)}
        </div>
        <a
          href={certificate.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Download className="h-4 w-4" />
          <span>Download Certificate</span>
        </a>
      </div>
    </div>
  );
};

export default CertificateCard;
