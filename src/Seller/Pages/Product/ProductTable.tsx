// import * as React from 'react';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Avatar,
//   Box,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import { RootState, useAppDispatch } from '../../../State/Store';
// import { fetchSellerProducts } from '../../../State/Sellers/sellerProductSlice';
// import { useSelector } from 'react-redux';

// interface Product {
//   id: string;
//   title: string;
//   images: string[];
//   mrp: number;
//   sellingPrice: number;
//   colors: string[];
//   stock?: number;
//   description?: string;
//   [key: string]: any;
// }

// interface Column {
//   id: keyof Product | 'updateStock' | 'update';
//   label: string;
//   minWidth: number;
//   align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
// }

// const columns: Column[] = [
//   { id: 'images', label: 'Images', minWidth: 80, align: 'center' },
//   { id: 'title', label: 'Title', minWidth: 150 },
//   { id: 'mrpPrice', label: 'MRP', minWidth: 80, align: 'right' },
//   { id: 'sellingPrice', label: 'Selling Price', minWidth: 100, align: 'right' },
//   { id: 'colors', label: 'Colors', minWidth: 100 },
//   { id: 'updateStock', label: 'Update Stock', minWidth: 120, align: 'center' },
//   { id: 'update', label: 'Update', minWidth: 100, align: 'center' },
// ];

// export default function ProductTable() {
//   const dispatch = useAppDispatch();
//   const { products, loading, error } = useSelector((store: RootState) => store.sellerProduct);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   React.useEffect(() => {
//     const jwt = localStorage.getItem('jwt') || '';
//     dispatch(fetchSellerProducts(jwt));
//   }, [dispatch]);

//   if (loading) return <Typography p={2}>Loading...</Typography>;
//   if (error) return <Typography color="error" p={2}>Error: {error}</Typography>;

//   return (
//     <Paper sx={{ width: '100%', overflow: 'auto', p: { xs: 1, sm: 2 } }}>
//       <TableContainer sx={{ maxHeight: 600 }}>
//         <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align ?? 'left'}
//                   sx={{
//                     minWidth: column.minWidth,
//                     fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                     fontWeight: 600,
//                     backgroundColor: theme.palette.grey[200],
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <TableRow hover key={product.id}>
//                   {columns.map((column) => {
//                     const { id } = column;

//                     if (id === 'images') {
//                       return (
//                         <TableCell key={id} align={column.align}>
//                           <Box
//                             sx={{
//                               display: 'flex',
//                               gap: 1,
//                               overflowX: 'auto',
//                               maxWidth: { xs: 160, sm: 200 },
//                               '&::-webkit-scrollbar': { height: '4px' },
//                               '&::-webkit-scrollbar-thumb': {
//                                 backgroundColor: 'rgba(0,0,0,0.2)',
//                                 borderRadius: '2px',
//                               },
//                             }}
//                           >
//                             {product.images?.map((img: string, idx: number) => (
//                               <Avatar
//                                 key={idx}
//                                 src={img}
//                                 alt={`${product.title}-${idx}`}
//                                 onError={(e) => {
//                                   (e.target as HTMLImageElement).src = '/images/default.png';
//                                 }}
//                                 variant="square"
//                                 sx={{
//                                   width: { xs: 50, sm: 70, md: 80 },
//                                   height: { xs: 50, sm: 70, md: 80 },
//                                   flexShrink: 0,
//                                   borderRadius: 2,
//                                   cursor: 'pointer',
//                                   transition: 'transform 0.2s',
//                                   '&:hover': {
//                                     transform: 'scale(1.05)',
//                                   },
//                                 }}
//                               />
//                             ))}
//                           </Box>
//                         </TableCell>
//                       );
//                     }

//                     if (id === 'updateStock' || id === 'update') {
//                       return (
//                         <TableCell key={id} align={column.align}>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             fullWidth={isMobile}
//                             sx={{
//                               textTransform: 'none',
//                               fontWeight: 400,
//                               fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                             }}
//                           >
//                             {id === 'updateStock' ? 'In Stock' : 'Update'}
//                           </Button>
//                         </TableCell>
//                       );
//                     }

//                     return (
//                       <TableCell
//                       key={id}
//                       align={column.align}
//                       sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
//                     >
//                       {id === 'colors' ? (
//                         Array.isArray(product.colors)
//                           ? product.colors.join(', ')
//                           : ''
//                       ) : (
//                         product[id as keyof typeof product]?.toString() || ''
//                       )}
//                     </TableCell>
                    
//                     );
//                   })}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <Typography>No products found</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// }



import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { RootState, useAppDispatch } from '../../../State/Store';
import { fetchSellerProducts } from '../../../State/Sellers/sellerProductSlice';
import { useSelector } from 'react-redux';
import EditProductModal from './EditProductModal'; // Import modal component
import { Product } from '../../../tpyes/ProductType';
import React from 'react';

interface Column {
  id: keyof Product | 'StockStatus' | 'update';
  label: string;
  minWidth: number;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
}

const columns: Column[] = [
  { id: 'images', label: 'Images', minWidth: 80, align: 'center' },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'mrpPrice', label: 'MRP', minWidth: 80, align: 'right' },
  { id: 'sellingPrice', label: 'Selling Price', minWidth: 100, align: 'right' },
  { id: 'colors', label: 'Colors', minWidth: 100 },
  { id: 'StockStatus', label: 'StockStatus', minWidth: 120, align: 'center' },
  { id: 'update', label: 'Update', minWidth: 100, align: 'center' },
];

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector((store: RootState) => store.sellerProduct);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt') || '';
    dispatch(fetchSellerProducts(jwt));
  }, [dispatch]);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  if (loading) return <Typography p={2}>Loading...</Typography>;
  if (error) return <Typography color="error" p={2}>Error: {error}</Typography>;

  return (
    <Paper sx={{ width: '100%', overflow: 'auto', p: { xs: 1, sm: 2 } }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? 'left'}
                  sx={{
                    minWidth: column.minWidth,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 600,
                    backgroundColor: theme.palette.grey[200],
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow hover key={product.id}>
                  {columns.map((column) => {
                    const { id } = column;

                    if (id === 'images') {
                      return (
                        <TableCell key={id} align={column.align}>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 1,
                              overflowX: 'auto',
                              maxWidth: { xs: 160, sm: 200 },
                              '&::-webkit-scrollbar': { height: '4px' },
                              '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                borderRadius: '2px',
                              },
                            }}
                          >
                            {product.images?.map((img: string, idx: number) => (
                              <Avatar
                                key={idx}
                                src={img}
                                alt={`${product.title}-${idx}`}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/default.png';
                                }}
                                variant="square"
                                sx={{
                                  width: { xs: 50, sm: 70, md: 80 },
                                  height: { xs: 50, sm: 70, md: 80 },
                                  flexShrink: 0,
                                  borderRadius: 2,
                                  cursor: 'pointer',
                                  transition: 'transform 0.2s',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        </TableCell>
                      );
                    }
if (id === 'StockStatus') {
  const isInStock = product.quantity && product.quantity >= 10;
  return (
    <TableCell key={id} align={column.align}>
      <Typography
        variant="body2"
        color={isInStock ? 'success.main' : 'error.main'}
        sx={{ fontWeight: 500 }}
      >
        {isInStock ? 'in_stock' : 'out_of_stock'}
      </Typography>
    </TableCell>
  );
}

if (id === 'update') {
  return (
    <TableCell key={id} align={column.align}>
      <Button
        variant="outlined"
        size="small"
        fullWidth={isMobile}
        sx={{
          textTransform: 'none',
          fontWeight: 400,
          fontSize: { xs: '0.7rem', sm: '0.8rem' },
        }}
        onClick={() => handleEditProduct(product)}
      >
        Update
      </Button>
    </TableCell>
  );
}

                    return (
                      <TableCell
                        key={id}
                        align={column.align}
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        {id === 'colors'
                          ? Array.isArray(product.colors)
                            ? product.colors.join(', ')
                            : ''
                          : product[id as keyof typeof product]?.toString() || ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No products found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Product Modal */}
      <EditProductModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={selectedProduct}
      />
    </Paper>
  );
}


























































































// import * as React from 'react';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Avatar,
//   Box,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import { RootState, useAppDispatch } from '../../../State/Store';
// import { fetchSellerProducts } from '../../../State/Sellers/sellerProductSlice';
// import { useSelector } from 'react-redux';

// interface Product {
//   id: string;
//   title: string;
//   images: string[];
//   mrp: number;
//   sellingPrice: number;
//   colors: "";
//   stock?: number;
//   description?: string;
//   [key: string]: any;
// }

// interface Column {
//   id: keyof Product | 'updateStock' | 'update';
//   label: string;
//   minWidth: number;
//   align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
// }

// const columns: Column[] = [
//   { id: 'images', label: 'Images', minWidth: 80, align: 'center' },
//   { id: 'title', label: 'Title', minWidth: 150 },
//   { id: 'mrpPrice', label: 'MRP', minWidth: 80, align: 'right' },
//   { id: 'sellingPrice', label: 'Selling Price', minWidth: 100, align: 'right' },
//   { id: 'color', label: 'Color', minWidth: 100 },
//   { id: 'updateStock', label: 'Update Stock', minWidth: 120, align: 'center' },
//   { id: 'update', label: 'Update', minWidth: 100, align: 'center' },
// ];

// export default function ProductTable() {
//   const dispatch = useAppDispatch();
//   const { products, loading, error } = useSelector((store: RootState) => store.sellerProduct);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   React.useEffect(() => {
//     const jwt = localStorage.getItem('jwt') || '';
//     dispatch(fetchSellerProducts(jwt));
//   }, [dispatch]);

//   if (loading) return <Typography p={2}>Loading...</Typography>;
//   if (error) return <Typography color="error" p={2}>Error: {error}</Typography>;

//   return (
//     <Paper sx={{ width: '100%', overflow: 'auto', p: { xs: 1, sm: 2 } }}>
//       <TableContainer sx={{ maxHeight: 600 }}>
//         <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align ?? 'left'}
//                   sx={{
//                     minWidth: column.minWidth,
//                     fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                     fontWeight: 600,
//                     backgroundColor: theme.palette.grey[200],
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <TableRow hover key={product.id}>
//                   {columns.map((column) => {
//                     const { id } = column;

//                     if (id === 'images') {
//                       return (
//                         <TableCell key={id} align={column.align}>
//                           <Box
//                             sx={{
//                               display: 'flex',
//                               gap: 1,
//                               overflowX: 'auto',
//                               maxWidth: { xs: 160, sm: 200 },
//                               '&::-webkit-scrollbar': { height: '4px' },
//                               '&::-webkit-scrollbar-thumb': {
//                                 backgroundColor: 'rgba(0,0,0,0.2)',
//                                 borderRadius: '2px',
//                               },
//                             }}
//                           >
//                             {product.images?.map((img: string, idx: number) => (
//                               <Avatar
//                                 key={idx}
//                                 src={img}
//                                 alt={`${product.title}-${idx}`}
//                                 onError={(e) => {
//                                   (e.target as HTMLImageElement).src = '/images/default.png';
//                                 }}
//                                 variant="square"
//                                 sx={{
//                                   width: { xs: 50, sm: 70, md: 80 },
//                                   height: { xs: 50, sm: 70, md: 80 },
//                                   flexShrink: 0,
//                                   borderRadius: 2,
//                                   cursor: 'pointer',
//                                   transition: 'transform 0.2s',
//                                   '&:hover': {
//                                     transform: 'scale(1.05)',
//                                   },
//                                 }}
//                               />
//                             ))}
//                           </Box>
//                         </TableCell>
//                       );
//                     }



                    
//                     if (id === 'updateStock' || id === 'update') {
//                       return (
//                         <TableCell key={id} align={column.align}>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             fullWidth={isMobile}
//                             sx={{
//                               textTransform: 'none',
//                               fontWeight: 400,
//                               fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                             }}
//                           >
//                             {id === 'updateStock' ? 'In Stock' : 'Update'}
//                           </Button>
//                         </TableCell>
//                       );
//                     }

//                     return (
//                       <TableCell
//                         key={id}
//                         align={column.align}
//                         sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
//                       >
//                         {id in product ? (product as Record<string, any>)[id]?.toString() : ''}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <Typography>No products found</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// }
