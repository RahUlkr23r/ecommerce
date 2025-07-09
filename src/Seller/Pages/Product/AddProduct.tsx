import React, { useEffect, useState } from 'react';
import {
  TextField, Button, CircularProgress, MenuItem, Select,
  FormControl, InputLabel, FormHelperText, Checkbox, ListItemText
} from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UploadToCloudinary } from '../../../Util/UploadToCloudnary';
import { useAppDispatch } from '../../../State/Store';
import { createProduct } from '../../../State/Sellers/sellerProductSlice';
import { toast } from 'react-toastify';

import { menLevelTwo } from '../../../data/category/level two/menLevelTwo';
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo';
import { homeFurnitureLevelTwo } from '../../../data/category/level two/homeFurnitureLevelTwo';
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo';
import { menLevelThree } from '../../../data/category/level three/menLevelThree';
import { womenLevelThree } from '../../../data/category/level three/womenLevelThree';
import { homeFurnitureLevelThree } from '../../../data/category/level three/homeFurnitureLevelThree';
import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree';

interface ProductFormValues {
  title: string;
  description: string;
  mrpPrice: number | string;
  sellingPrice: number | string;
  quantity: number | string;
  sizes: string[];
  colors: string[];
  images: string[];
  category: string;
  category2: string;
  category3: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(3),
  description: Yup.string().required('Description is required').max(130),
  mrpPrice: Yup.number().required('MRP is required').positive().moreThan(0),
  sellingPrice: Yup.number().required('Selling price is required').positive().moreThan(0).lessThan(Yup.ref('mrpPrice')),
  quantity: Yup.number().required('Quantity is required').min(1),
  sizes: Yup.array().of(Yup.string()),
  colors: Yup.array().of(Yup.string()).required('At least one color is required'),
  images: Yup.array().min(1, 'At least one image is required').max(5, 'You can upload up to 5 images'),
  category: Yup.string().required(),
  category2: Yup.string().required(),
  category3: Yup.string(),
});

const mainCategory = [
  { categoryId: 'men', name: 'Men' },
  { categoryId: 'women', name: 'Women' },
  { categoryId: 'home_furniture', name: 'Home & Furniture' },
  { categoryId: 'electronics', name: 'Electronics' },
];

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  home_furniture: homeFurnitureLevelTwo,
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  home_furniture: homeFurnitureLevelThree,
  electronics: electronicsLevelThree,
};

const colors = [
  'red', 'blue', 'green', 'white', 'black', 'yellow', 'orange', 'purple', 'pink',
  'maroon', 'navy', 'grey', 'brown', 'beige', 'lavender', 'teal', 'aqua', 'coral',
  'olive', 'mint', 'gold', 'silver', 'magenta', 'cyan', 'cream', 'peach', 'indigo'
];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
  const [uploading, setUploading] = useState(false);
  const [categoryLevel2Options, setCategoryLevel2Options] = useState<any[]>([]);
  const [categoryLevel3Options, setCategoryLevel3Options] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  const initialValues: ProductFormValues = {
    title: '',
    description: '',
    mrpPrice: '',
    sellingPrice: '',
    quantity: '',
    sizes: [],
    colors: [],
    images: [],
    category: '',
    category2: '',
    category3: '',
  };

  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        ...values,
        name: values.title,
        price: Number(values.sellingPrice),
        quantity: Number(values.quantity),
        category: values.category3,
        category2: values.category2,
        category3: values.category,
      };

      try {
        await dispatch(createProduct({ request: payload, jwt: localStorage.getItem('jwt') })).unwrap();
        toast.success("✅ Product created successfully!");
        resetForm();
        setCategoryLevel2Options([]);
        setCategoryLevel3Options([]);
      } catch (error) {
        console.error(error);
        toast.error("❌ Failed to create product. Try again.");
      }
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const existingCount = formik.values.images.length;

    if (existingCount + files.length > 5) {
      toast.warn("You can only upload up to 5 images.");
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = await Promise.all(files.map((file) => UploadToCloudinary(file)));
      formik.setFieldValue('images', [...formik.values.images, ...uploadedUrls]);
    } catch (err) {
      console.error(err);
      toast.error("Error uploading images.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updated = [...formik.values.images];
    updated.splice(index, 1);
    formik.setFieldValue('images', updated);
  };

  useEffect(() => {
    const selected = formik.values.category;
    if (selected) {
      setCategoryLevel2Options(categoryTwo[selected] || []);
      setCategoryLevel3Options([]);
      formik.setFieldValue('category2', '');
      formik.setFieldValue('category3', '');
    }
  }, [formik.values.category]);

  useEffect(() => {
    const main = formik.values.category;
    const sub = formik.values.category2;
    if (main && sub) {
      const level3 = categoryThree[main]?.filter((c) => c.parentCategoryId === sub);
      setCategoryLevel3Options(level3 || []);
      formik.setFieldValue('category3', '');
    }
  }, [formik.values.category2]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Image Upload */}
      <div>
        <label className="text-sm font-medium mb-1 block">Product Images (Max 5)</label>
        <div className="flex flex-wrap gap-4">
          <label className="w-24 h-24 border-2 border-dashed flex items-center justify-center rounded-lg cursor-pointer hover:border-gray-400">
            <input
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
            />
            {uploading ? <CircularProgress size={24} /> : <Upload />}
          </label>
          {formik.values.images.map((url, i) => (
            <div key={i} className="relative w-24 h-24">
              <img src={url} alt="uploaded" className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {formik.touched.images && formik.errors.images && (
          <p className="text-sm text-red-600">{formik.errors.images}</p>
        )}
      </div>

      <TextField fullWidth label="Title" {...formik.getFieldProps('title')} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} />
      <TextField fullWidth label="Description" multiline rows={3} {...formik.getFieldProps('description')} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} />
      <TextField fullWidth label="MRP Price" type="number" {...formik.getFieldProps('mrpPrice')} error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)} helperText={formik.touched.mrpPrice && formik.errors.mrpPrice} />
      <TextField fullWidth label="Selling Price" type="number" {...formik.getFieldProps('sellingPrice')} error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)} helperText={formik.touched.sellingPrice && formik.errors.sellingPrice} />
      <TextField fullWidth label="Quantity" type="number" {...formik.getFieldProps('quantity')} error={formik.touched.quantity && Boolean(formik.errors.quantity)} helperText={formik.touched.quantity && formik.errors.quantity} />

      <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
        <InputLabel>Category</InputLabel>
        <Select {...formik.getFieldProps('category')} label="Category">
          {mainCategory.map((cat) => (
            <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{formik.touched.category && formik.errors.category}</FormHelperText>
      </FormControl>

      <FormControl fullWidth error={formik.touched.category2 && Boolean(formik.errors.category2)} disabled={!formik.values.category}>
        <InputLabel>Subcategory</InputLabel>
        <Select {...formik.getFieldProps('category2')} label="Subcategory">
          {categoryLevel2Options.map((cat) => (
            <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{formik.touched.category2 && formik.errors.category2}</FormHelperText>
      </FormControl>

      <FormControl fullWidth error={formik.touched.category3 && Boolean(formik.errors.category3)} disabled={!formik.values.category2}>
        <InputLabel>Subsubcategory</InputLabel>
        <Select {...formik.getFieldProps('category3')} label="Subsubcategory">
          {categoryLevel3Options.map((cat) => (
            <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{formik.touched.category3 && formik.errors.category3}</FormHelperText>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Sizes</InputLabel>
        <Select {...formik.getFieldProps('sizes')} multiple renderValue={(selected) => selected.join(', ')}>
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              <Checkbox checked={formik.values.sizes.includes(size)} />
              <ListItemText primary={size} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Colors</InputLabel>
        <Select {...formik.getFieldProps('colors')} multiple renderValue={(selected) => selected.join(', ')}>
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              <Checkbox checked={formik.values.colors.includes(color)} />
              <ListItemText primary={color} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {uploading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
    </form>
  );
};

export default AddProduct;
