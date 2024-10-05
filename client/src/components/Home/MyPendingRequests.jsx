import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const PendingRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const userEmail = user.email; // Assuming user email is accessible through the useAuth hook

    const { data: pendingRequests, isLoading } = useQuery({
        queryKey: ['pendingRequests', userEmail],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/requests/pending?email=${userEmail}`);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch pending requests');
            }
        }
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container p-2 mx-auto sm:p-4 mt-4">
            <h2 className="mb-4 text-2xl font-semibold leading-tight text-blue-400">
                Pending Requests: {pendingRequests?.length}
            </h2>
            {pendingRequests?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#35A6DE] text-white">
                            <tr className="text-left">
                                <th className="p-3 border-r border-gray-200">Assets Name</th>
                                <th className="p-3 border-r border-gray-200">Type</th>
                                <th className="p-3 border-r border-gray-200">Requested Date</th>
                                <th className="p-3 border-r border-gray-200">Requested By</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequests.map((request, index) => (
                                <tr key={request._id} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                                    <td className="p-3 border-r border-gray-200">{request.name}</td>
                                    <td className="p-3 border-r border-gray-200">{request.type}</td>
                                    <td className="p-3 border-r border-gray-200">
                                        {new Date(request.requestDate).toLocaleString()}
                                    </td>
                                    <td className="p-3 border-r border-gray-200">
                                        {request.requestedByName} ({request.requestedBy})
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 font-semibold rounded-md ${request.status === 'Pending' ? 'bg-yellow-300 text-yellow-800' : 'bg-green-300 text-green-800'}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-center'>No pending requests found.</p>
            )}
        </div>
    );
};

export default PendingRequests;
