import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const MyEmployees = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [employeeCount, setEmployeeCount] = useState(0);

  const { data: employees = [], isLoading, refetch } = useQuery({
    queryKey: ['myEmployees'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/myEmployees?companyEmail=${user.email}`);
      return data;
    },
  });

  const { mutateAsync: removeFromCompany } = useMutation({
    mutationFn: async (userId) => {
      const { data } = await axiosSecure.put(`/users/removeFromCompany/${userId}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Employee removed successfully.');
      setEmployeeCount((prevCount) => prevCount - 1);
      refetch();
    },
    onError: () => {
      toast.error('Failed to remove employee.');
    },
  });

  const handleRemoveFromCompany = (userId) => {
    removeFromCompany(userId);
  };

  useEffect(() => {
    setEmployeeCount(employees.length);
  }, [employees]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>My Employees</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 container mx-auto px-4 sm:px-8 py-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">My Employees</h1>
          <p className="mb-4 text-gray-600">Employee Count: <span className="font-semibold">{employeeCount}</span></p>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-[#35A6DE] to-[#1E90FF] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Member Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee._id} className="hover:bg-gray-100 transition duration-300">
                    <td className="px-6 py-4 text-sm">
                      <img src={employee.imageUrl} alt={employee.name} className="w-12 h-12 object-cover rounded-full shadow-sm" />
                    </td>
                    <td className="px-6 py-4 text-sm">{employee.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.role === 'manager'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}>
                        {employee.role === 'manager' ? 'Manager' : 'Employee'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleRemoveFromCompany(employee._id)}
                        className="px-4 py-2 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition duration-300"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEmployees;
