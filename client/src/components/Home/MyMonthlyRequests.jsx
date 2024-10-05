import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const MyMonthlyRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentMonth, setCurrentMonth] = useState('');

    useEffect(() => {
        setCurrentMonth(new Date().toISOString()); // Initialize currentMonth
    }, []); // Run only once when the component mounts

    const fetchMonthlyRequests = async () => {
        try {
            const response = await axiosSecure.get(`/requests/monthly?email=${user?.email}&month=${currentMonth}`);
            if (!response.ok) {
                throw new Error('Failed to fetch monthly requests');
            }
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch monthly requests');
        }
    };

    const { data: monthlyRequests, isLoading, isError } = useQuery({
        queryKey: ['monthlyRequests', user.email, currentMonth],
        queryFn: fetchMonthlyRequests,
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error: Failed to fetch monthly requests</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">My Monthly Requests</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="bg-blue-100 text-blue-700">
                        <tr className="text-left">
                            <th className="p-3">Assets Name</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Request Date</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyRequests?.map(request => (
                            <tr key={request._id} className="border-b border-opacity-20 dark:border-gray-300 bg-white hover:bg-blue-50">
                                <td className="p-3">{request.name}</td>
                                <td className="p-3">{request.type}</td>
                                <td className="p-3">{new Date(request.requestDate).toLocaleString()}</td>
                                <td className="p-3">{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMonthlyRequests;
