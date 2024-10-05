import  { useState } from 'react';

const NoticeBoard = () => {
  const [expandedNotice, setExpandedNotice] = useState(null);

  const notices = [
    {
      id: 1,
      title: 'Annual Inventory Audit',
      date: 'June 10, 2024',
      description: 'The annual inventory audit will take place from July 1 to July 7, 2024. All departments are requested to submit their updated inventory lists by June 25, 2024.',
      fullText: 'Please ensure that all assets are accounted for and any discrepancies are reported to the inventory management team.',
    },
    {
      id: 2,
      title: 'New Asset Allocation Policy',
      date: 'June 8, 2024',
      description: 'A new asset allocation policy has been implemented effective immediately. The policy outlines the procedures for requesting, allocating, and returning assets.',
      fullText: 'All staff members are required to review the policy document available on the intranet and comply with the new guidelines.',
    },
    {
      id: 3,
      title: 'Scheduled System Maintenance',
      date: 'June 5, 2024',
      description: 'The assets management system will undergo scheduled maintenance on June 15, 2024, from 12:00 AM to 4:00 AM. During this period, the system will be unavailable.',
      fullText: 'Please ensure that all urgent asset transactions are completed before the maintenance window.',
    },
    {
      id: 4,
      title: 'Asset Disposal Procedure',
      date: 'June 1, 2024',
      description: 'The procedure for disposing of outdated or damaged assets has been updated. All disposals must be documented and approved by the asset management committee.',
      fullText: 'Please refer to the updated procedure document for detailed instructions on how to proceed with asset disposals.',
    },
  ];

  const toggleReadMore = (id) => {
    setExpandedNotice(expandedNotice === id ? null : id);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-8" >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Notice Board</h2>
      <div className="space-y-6">
        {notices.map(notice => (
          <div 
         
          key={notice.id} className="bg-white p-6 rounded-lg shadow-md t">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{notice.title}</h3>
            <p className="text-gray-700 mb-4">{notice.description}</p>
            {expandedNotice === notice.id && (
              <p className="text-gray-700 mb-4">{notice.fullText}</p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-500">{notice.date}</span>
              <button
                onClick={() => toggleReadMore(notice.id)}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                {expandedNotice === notice.id ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
