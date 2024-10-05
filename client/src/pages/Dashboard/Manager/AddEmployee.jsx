import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';

const AddEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedMembers, setSelectedMembers] = useState([]);

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['unaffiliatedEmployers'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users/unaffiliated');
      return data;
    },
  });

  const { mutateAsync: addToTeamMutation } = useMutation({
    mutationFn: async ({ userIds, companyEmail }) => {
      const { data } = await axiosSecure.put('/users/addToTeam', { userIds, companyEmail });
      return data;
    },
    onSuccess: () => {
      toast.success('Members added to the team successfully.');
      setSelectedMembers([]); // Clear selected members
      refetch();
    },
    onError: () => {
      toast.error('Failed to add members to the team.');
    },
  });

  const handleSelectMember = (userId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleAddSelectedMembers = () => {
    addToTeamMutation({ userIds: selectedMembers, companyEmail: user.email });
  };

  const handleAddToTeam = (userId) => {
    addToTeamMutation({ userIds: [userId], companyEmail: user.email });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Add Employees</title>
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gray-50 p-6 sm:p-8">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Employees to Team</h1>
          <p className="mb-4 text-gray-600">Unaffiliated Employee Count: <span className="font-semibold">{users.length}</span></p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-[#35A6DE] to-[#1E90FF] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Select</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Member Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((employee) => (
                  <tr key={employee._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(employee._id)}
                        onChange={() => handleSelectMember(employee._id)}
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <img src={employee.imageUrl} alt={employee.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{employee.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user?.email === employee?.email ? 'Me/Manager' : employee?.role === 'manager' ? 'Manager' : 'Employee'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        disabled={user?.email === employee?.email}
                        onClick={() => handleAddToTeam(employee._id)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition duration-300 ${
                          user?.email === employee?.email
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        Add to Team
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedMembers.length > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddSelectedMembers}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Add Selected Members
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
