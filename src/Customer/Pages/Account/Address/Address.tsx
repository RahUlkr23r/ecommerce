
import  { useEffect, useState } from 'react';
import AddressCard from '../../Checkout/AddressCard';
import { useAppDispatch, useAppSelector } from '../../../../State/Store';
import { fetchUserProfile } from '../../Auth/authSlice';

const Address = () => {
  const dispatch = useAppDispatch();
  const [selectedAddressId, setSelectedAddressId] = useState<string | number | null>(null);

  // ✅ Fetch profile on mount
  useEffect(() => {
    const jwt = localStorage.getItem('jwt') || '';
    if (jwt) dispatch(fetchUserProfile({ jwt }));
  }, [dispatch]);

  const addresses = useAppSelector((store) => store.auth.user?.addresses || []);

  const handleSelect = (id: string | number) => {
    setSelectedAddressId(id);
  };


  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">Select Shipping Address</h2>

      {addresses.length > 0 ? (
        addresses.slice(0, 5).map((address, idx) => {
          // Ensure id is always string or number
          const safeAddress = { ...address, id: address.id ?? idx };
          return (
            <AddressCard
              key={safeAddress.id}
              address={safeAddress}
              selected={selectedAddressId === safeAddress.id}
              onSelect={handleSelect}
            />
          );
        })
      ) : (
        <p className="text-gray-500">No addresses found</p>
      )}

  
    </div>
  );
};

export default Address;
