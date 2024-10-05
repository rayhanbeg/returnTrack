import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const PendingRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: pendingRequests = [], isLoading, error } = useQuery({
        queryKey: ['requestsManager', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                throw new Error('User email is not available');
            }
            try {
                const response = await axiosSecure.get(`/requestsManager/pending?email=${user.email}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching pending requests:', error);
                throw new Error('Failed to fetch pending requests');
            }
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container p-4 mx-auto mt-6">
            {pendingRequests.length > 0 ? (
                <>
                    <h2 className="mb-6 text-2xl font-bold text-[#35A6DE]">
                        Pending Requests ({pendingRequests.length})
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead className="bg-[#35A6DE] text-white">
                                <tr>
                                    <th className="p-4 text-left font-semibold">Assets Name</th>
                                    <th className="p-4 text-left font-semibold">Type</th>
                                    <th className="p-4 text-left font-semibold">Requested Date</th>
                                    <th className="p-4 text-left font-semibold">Requested By</th>
                                    <th className="p-4 text-left font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {pendingRequests.map((request, index) => (
                                    <tr key={request._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="p-4">{request.name}</td>
                                        <td className="p-4">{request.type}</td>
                                        <td className="p-4">{new Date(request.requestDate).toLocaleString()}</td>
                                        <td className="p-4">{request.requestedByName} ({request.requestedBy})</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                    request.status.toLowerCase() === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}
                                            >
                                                {request.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-600">No pending requests found.</div>
            )}
        </div>
    );
};

export default PendingRequests;
