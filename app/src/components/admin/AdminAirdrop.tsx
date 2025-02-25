import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAirdrop = () => {
  const [airdropList, setAirdropList] = useState([]);
  const [selectedAirdrops, setSelectedAirdrops] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        const response = await axios.get('/api/getAppliedAirdrop');
        setAirdropList(response.data.wallets);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchAirdrops();
  }, []);

  const handleRowClick = (walletPublicKey) => {
    const isSelected = selectedAirdrops.includes(walletPublicKey);
    if (isSelected) {
      setSelectedAirdrops(selectedAirdrops.filter((key) => key !== walletPublicKey));
    } else {
      setSelectedAirdrops([...selectedAirdrops, walletPublicKey]);
    }
  };

  const doAirdrop = async (walletPublicKeys) => {
    try {
      console.log('Airdrop requested for:', walletPublicKeys);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAirdrop = () => {
    doAirdrop(selectedAirdrops);
  };

  return (
    <div className="w-full p-4 mx-auto bg-gray-100 md:p-6 lg:p-12 mt-36" >
      {error && (
        <div className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      <button
        onClick={handleAirdrop}
        className="px-4 py-2 mb-4 font-bold text-white bg-orange-500 rounded hover:bg-orange-700"
      >
        Airdrop
      </button>
      <table className="w-full overflow-hidden text-center bg-white rounded-lg shadow-lg table-auto my-7">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Wallet Public Key</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Visit Number</th>
            <th className="px-4 py-2">Activity</th>
          </tr>
        </thead>
        <tbody>
          {airdropList.map((item, index) => (
            <tr
              key={item.walletPublicKey}
              onClick={() => handleRowClick(item.walletPublicKey)}
              className={`hover:bg-gray-100 ${selectedAirdrops.includes(item.walletPublicKey) ? 'bg-blue-100' : ''}`}
            >
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{item.publicKey}</td>
              <td className="px-4 py-2 border-b">{item.email}</td>
              <td className="px-4 py-2 border-b">{item.visitNumber}</td>
              <td className="px-4 py-2 border-b">{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAirdrop;
