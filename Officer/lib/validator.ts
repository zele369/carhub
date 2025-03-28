import { z } from "zod";

export const driverFormSchema = z.object({
  model: z.string().min(1, "Please select a model"),
  make: z.string().min(1, "Please select a make"),
  drive: z.string().min(1, "Please select a drive type"),
  fuel: z.string().min(1, "Please select a fuel type"),
  plate: z.string()
    .min(2, "Plate number must be at least 2 characters")
    .max(10, "Plate number cannot exceed 10 characters")
    .regex(/^[0-9A-Z\s-]+$/i, "Invalid plate number format"),
  price: z.string()
    .trim()
    .min(1, "Price is required")
    .refine((val) => /^\d+$/.test(val), "Price must contain only numbers")
    .refine((val) => val.length <= 4, "Price cannot be more than 4 digits")
    .refine((val) => Number(val) >= 10, "Price must be at least 10 Birr")
    .refine((val) => Number(val) <= 1000, "Price must be less than 1000 Birr"),
  cylinder: z.string()
    .min(1, "Cylinder count is required")
    .regex(/^[0-9]+$/, "Cylinder must be a number")
    .refine((val) => Number(val) >= 2 && Number(val) <= 16, "Cylinder count must be between 2 and 16"),
  year: z.string()
    .min(4, "Year must be a 4-digit number")
    .max(4, "Year must be a 4-digit number")
    .regex(/^[0-9]{4}$/, "Year must be a 4-digit number")
    .refine(
      (val) => {
        const year = Number(val);
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
      },
      `Year must be between 1900 and ${new Date().getFullYear()}`
    ),
  imageUrl1: z.string().min(1, "Primary image is required"),
  imageUrl2: z.string().optional(),
  imageUrl3: z.string().optional(),
  imageUrl4: z.string().optional(),
});
