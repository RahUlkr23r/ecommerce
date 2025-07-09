import React from 'react';

interface Address {
  id?: string | number;
  name: string;
  mobile: string;
  pincode: string | number;
  city: string;
  address: string;
  state: string;
  locality: string;
}

interface UserAddressProps {
  address: Address;
}

const UserAddress: React.FC<UserAddressProps> = ({ address }) => {
  return (
    <div className="flex items-start gap-3 p-4 border rounded-md shadow-sm bg-white w-full max-w-xl hover:shadow-md transition border-gray-200">
      <div className="space-y-1 text-sm sm:text-base">
        <h1 className="text-lg font-semibold text-primary">{address.name}</h1>
        <p className="text-gray-700">
          {address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}
        </p>
        <p className="text-gray-600">
          <strong>Mobile:</strong> {address.mobile}
        </p>
      </div>
    </div>
  );
};

export default UserAddress;
