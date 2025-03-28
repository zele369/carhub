import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { DropdownProps } from "@/types";
  //   import { ICategory } from "@/lib/database/models/category.model";
  import { startTransition, useEffect, useState } from "react";
  //   import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

  
  const FuelDropdown = ({onChangeHandler, value}: DropdownProps) => {
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field ">
          <SelectValue placeholder="Fuel Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gas" className="select-item p-regular-14">
            Gasoline
          </SelectItem>
          <SelectItem value="electric" className="select-item p-regular-14">
            Electric
          </SelectItem>
          <SelectItem value="hybrid" className="select-item p-regular-14">
            Hybrid
          </SelectItem>
          <SelectItem value="diesel" className="select-item p-regular-14">
            Diesel
          </SelectItem>
        </SelectContent>
      </Select>
    );
  };
  
  export default FuelDropdown;
  