// src/State/Customers/AddressSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';


export interface Address {
  address: string;
  id: number;
  name: string;
  street: string;      
  city: string;
  state: string;
  pincode: string;     
  country: string;
  isDefault: boolean;
  mobile: string;
  locality: string;
}

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

// --- Mock API using localStorage ---
const getMockAddressesFromLocalStorage = (): Address[] => {
  try {
    const stored = localStorage.getItem('mockUserAddresses');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error parsing addresses from localStorage", e);
    return [];
  }
};

const saveMockAddressesToLocalStorage = (addresses: Address[]) => {
  localStorage.setItem('mockUserAddresses', JSON.stringify(addresses));
};

const mockFetchAddresses = async (jwt: string): Promise<Address[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Mock API: Fetching addresses for JWT:", jwt);
      resolve(getMockAddressesFromLocalStorage());
    }, 500);
  });
};

const mockAddNewAddress = async (newAddressData: Omit<Address, 'id'>, jwt: string): Promise<Address> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Mock API: Adding new address for JWT:", jwt, newAddressData);
      const currentAddresses = getMockAddressesFromLocalStorage();
      const assignedId = currentAddresses.length > 0
        ? Math.max(...currentAddresses.map(a => a.id)) + 1
        : 1;

      const updatedAddresses = currentAddresses.map(addr => ({ ...addr, isDefault: false }));
      const addressWithId: Address = { ...newAddressData, id: assignedId, isDefault: true };

      updatedAddresses.push(addressWithId);
      saveMockAddressesToLocalStorage(updatedAddresses);

      resolve(addressWithId);
    }, 700);
  });
};

// --- Thunks ---
export const fetchUserAddresses = createAsyncThunk(
  'address/fetchUserAddresses',
  async (jwt: string, { rejectWithValue }) => {
    try {
      const addresses = await mockFetchAddresses(jwt);
      return addresses;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch addresses');
    }
  }
);

export const addNewAddress = createAsyncThunk(
  'address/addNewAddress',
  async ({ address, jwt }: { address: Omit<Address, 'id'>; jwt: string }, { rejectWithValue }) => {
    try {
      const addedAddress = await mockAddNewAddress(address, jwt);
      return addedAddress;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add new address');
    }
  }
);

// --- Slice ---
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setDefaultAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === action.payload,
      }));
      saveMockAddressesToLocalStorage(state.addresses);
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
      saveMockAddressesToLocalStorage(state.addresses);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addNewAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.loading = false;
        state.addresses = state.addresses.map(addr => ({ ...addr, isDefault: false }));
        state.addresses.push(action.payload);
        saveMockAddressesToLocalStorage(state.addresses);
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDefaultAddress, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;
