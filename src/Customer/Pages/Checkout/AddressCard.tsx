import { Radio } from '@mui/material';
import React from 'react';

interface Address {
  id: string | number;
  name: string;
  mobile: string;
  pincode: string | number;
  city: string;
  address: string;
  state: string;
  locality: string;
}

interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: (id: string | number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, selected, onSelect }) => {
  const handleChange = () => {
    onSelect(address.id);
  };

  return (
    <div
      className={`flex p-5 border rounded-md bg-white w-full max-w-xl cursor-pointer hover:shadow-md transition ${
        selected ? 'border-blue-500' : 'border-gray-200'
      }`}
      onClick={handleChange}
    >
      <div className="pr-4">
        <Radio
          checked={selected}
          onChange={handleChange}
          value={address.id}
          color="primary"
        />
      </div>
      <div className="space-y-1 text-sm sm:text-base">
        <h1 className="text-lg font-semibold text-primary">{address.name}</h1>
        <p>
          {address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}
        </p>
        <p>
          <strong>Mobile:</strong> {address.mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
