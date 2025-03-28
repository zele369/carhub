import { ICar } from "@/lib/database/models/car.model";
import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  btnStyles?: string;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  disabled?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarCardProps {
  id: string;
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface CarDetailProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarCardProps;
}

export interface FilterProps {
  searchParams: Promise<{
    manufacturer?: string;
    model?: string;
    year?: string;
    fuel?: string;
    limit?: string;
  }>;
}

export interface FetchProps {
  manufacturer: string;
  model: string;
  year: number;
  fuel: string;
  limit: number;
}

export interface OptionsProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionsProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

export type CreateMakerParams = {
  makerName: string;
};
export type CreateModelParams = {
  modelName: string;
};

export type CreateCarParams = {
  car: {
    make: string;
    model: string;
    drive: string;
    fuel: string;
    plate: string;
    price: string;
    cylinder: string;
    year: string;
    imageUrl1: string;
    imageUrl2?: string;
    imageUrl3?: string;
    imageUrl4?: string;
  };
};

export type UpdateCarparams = {
  id: string;
  car:ICar;
}
