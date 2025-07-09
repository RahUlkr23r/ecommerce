// import { Button, Divider } from "@mui/material"


// const FilterSection = () => {
//   return (
//     <div className="-z-50 space-y-5 bg-white">
//         <div className="flex item-center justify-between h-[40px]px-9 lg:norder-r">
//             <p className="text-lg font-semibold">
//                 Filter
//             </p>
//             <Button size='small'className='text-teal-600 curser-pointer font-semibold'>
//                 clear all
//             </Button>
//         </div>
//         <Divider/>
//         <section></section>
//     </div>

//   )
// }

// export default FilterSection


import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Color } from "./Color";
import { Price } from "./Price";
import { Discount } from "./Discount";

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get("color")?.split(",") || []
  );
  const [selectedPrices, setSelectedPrices] = useState<string[]>(
    searchParams.get("price")?.split(",") || []
  );
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>(
    searchParams.get("discount")?.split(",") || []
  );

  const [showAllColors, setShowAllColors] = useState(false);

  const updateSearchParams = (
    key: "color" | "price" | "discount",
    values: string[]
  ) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      newParams.set(key, values.join(","));
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    key: "color" | "price" | "discount"
  ) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setSelected(updated);
    updateSearchParams(key, updated);
  };

  const clearAll = () => {
    setSelectedColors([]);
    setSelectedPrices([]);
    setSelectedDiscounts([]);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("color");
    newParams.delete("price");
    newParams.delete("discount");
    setSearchParams(newParams);
  };

  const visibleColors = showAllColors ? Color : Color.slice(0, 4);

  return (
    <div className="p-4 space-y-5 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between">
        <Typography variant="h6" className="font-semibold">
          Filter
        </Typography>
        <Button
          size="small"
          className="text-teal-600 font-semibold"
          onClick={clearAll}
        >
          Clear All
        </Button>
      </div>

      <Divider />

      {/* Color Filter */}
      <div>
        <Typography className="font-medium mb-2">Color</Typography>
        <FormGroup>
          {visibleColors.map((color) => (
            <FormControlLabel
              key={color.value}
              control={
                <Checkbox
                  checked={selectedColors.includes(color.value)}
                  onChange={() =>
                    toggleSelection(
                      color.value,
                      selectedColors,
                      setSelectedColors,
                      "color"
                    )
                  }
                  sx={{
                    color: color.hex,
                    "&.Mui-checked": { color: color.hex },
                  }}
                />
              }
              label={color.name}
            />
          ))}
        </FormGroup>
        {Color.length > 4 && (
          <Button
            size="small"
            onClick={() => setShowAllColors(!showAllColors)}
            className="text-blue-600 font-semibold"
          >
            {showAllColors ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>

      <Divider />

      {/* Price Filter */}
      <div>
        <Typography className="font-medium mb-2">Price</Typography>
        <FormGroup>
          {Price.map((range) => (
            <FormControlLabel
              key={range.value}
              control={
                <Checkbox
                  checked={selectedPrices.includes(range.value)}
                  onChange={() =>
                    toggleSelection(
                      range.value,
                      selectedPrices,
                      setSelectedPrices,
                      "price"
                    )
                  }
                />
              }
              label={range.name}
            />
          ))}
        </FormGroup>
      </div>

      <Divider />

      {/* Discount Filter */}
      <div>
  <Typography className="font-medium mb-2">Discount</Typography>
  <FormGroup>
    {Discount.map((discount) => (
      <FormControlLabel
        key={discount.value}
        control={
          <Checkbox
            checked={selectedDiscounts.includes(discount.name)}
            onChange={() =>
              toggleSelection(
                discount.name,
                selectedDiscounts,
                setSelectedDiscounts,
                "discount"
              )
            }
          />
        }
        label={discount.name}
      />
    ))}
  </FormGroup>
</div>

    </div>
  );
};

export default FilterSection;

