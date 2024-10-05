import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ManagerAssetsList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Assets Data
  const { data: assetsData = [], isLoading: assetsLoading, refetch } = useQuery({
    queryKey: ['assets/manager'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/assets/manager?email=${user.email}`);
      return data;
    },
    onSuccess: (data) => {
      setAssets(data);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (!assetsLoading) {
      setAssets(assetsData);
      setIsLoading(false);
    }
  }, [assetsData, assetsLoading]);

  // Mutation to handle asset deletion
  const { mutateAsync: deleteAsset } = useMutation({
    mutationFn: async (assetId) => {
      const { data } = await axiosSecure.delete(`/assets/${assetId}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Asset deleted successfully.');
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete asset.');
    },
  });

  // Handle delete button click
  const handleDelete = async (assetId) => {
    try {
      await deleteAsset(assetId);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle update button click
  const handleUpdate = (assetId) => {
    console.log(`Update asset with ID: ${assetId}`);
  };

  return (
    <>
      <Helmet>
        <title>Asset List</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead className="bg-[#35A6DE] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Asset Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Asset Type
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Asset Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Date Added
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assets.map((asset) => (
                      <tr key={asset._id}>
                        <td className="px-5 py-5 border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{asset.name}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{asset.type}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{asset.quantity}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">{new Date(asset.dateAdded).toLocaleDateString()}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 flex justify-between">
                          <button
                            onClick={() => handleUpdate(asset._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-200"
                          >
                            <FaEdit className="mr-1 " /> Update
                          </button>
                          <button
                            onClick={() => handleDelete(asset._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center justify-center hover:bg-red-600 transition duration-200"
                          >
                            <FaTrashAlt className="mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagerAssetsList;
