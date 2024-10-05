import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const RequestList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['allRequests'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/requestsManager/all?email=${user.email}`);
      return data;
    },
  });

  const { mutateAsync: approveRequest } = useMutation({
    mutationFn: async (requestId) => {
      const { data } = await axiosSecure.put(`/approveRequest/${requestId}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Request approved successfully.');
      refetch();
    },
    onError: () => {
      toast.error('Failed to approve request.');
    },
  });

  const { mutateAsync: rejectRequest } = useMutation({
    mutationFn: async (requestId, approvalDate) => {
      const { data } = await axiosSecure.put(`/rejectRequest/${requestId}`, { approvalDate });
      return data;
    },
    onSuccess: () => {
      toast.success('Request rejected successfully.');
      refetch();
    },
    onError: () => {
      toast.error('Failed to reject request.');
    },
  });

  const handleApprove = async (requestId) => {
    try {
      const approvalDate = new Date().toLocaleDateString();
      await approveRequest(requestId, approvalDate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Request List</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="bg-gradient-to-r from-[#35A6DE] to-[#1E90FF] text-white">
                  <tr>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Asset Name</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Asset Type</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Requester Email</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Requester Name</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Request Date</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Additional Note</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Status</th>
                    <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-100 transition duration-300">
                      <td className="px-6 py-4 border-b border-gray-200">{request.name}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{request.type}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{request.requestedBy}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{request.requestedByName}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{new Date(request.requestDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 border-b border-gray-200">{request.notes}</td>
                      <td className="px-6 py-4 border-b border-gray-200">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          request.status === 'Pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-green-200 text-green-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 flex space-x-3">
                        {request.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleApprove(request._id)} 
                              className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 transition duration-300">
                              <i className="fas fa-check"></i> Approve
                            </button>
                            <button 
                              onClick={() => handleReject(request._id)} 
                              className="px-4 py-2 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition duration-300">
                              <i className="fas fa-times"></i> Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestList;
