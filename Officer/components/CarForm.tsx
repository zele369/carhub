"use client";
import { driverFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CustomButton from "./CustomButton";
import ModelDropdown from "./ModelDropdown";
import MakeDropdown from "./MakeDropdown";
import DriveDropdown from "./DriveDropdown";
import FuelDropdown from "./FuelDropdown";
import { FileUploader } from "./FileUploader";
import { ICar } from "@/lib/database/models/car.model";
import { carDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { ToastContainer, toast } from "react-toastify";
import { updateCar } from "@/lib/actions/car.action";

type CarFormProps = {
  type: "Create" | "Update";
  car?: ICar;
  carId?: string;
};

const CarForm = ({ type, car, carId }: CarFormProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const initialValues =
    car && type === "Update"
      ? {
          ...car,
          price: car.price?.toString(),
          cylinder: car.cylinder?.toString(),
          year: car.year?.toString(),
        }
      : carDefaultValues;

  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload Completed:", res);
    },
    onUploadError: (error: Error) => {
      console.error("Upload Error:", error);
    },
  });

  const form = useForm<z.infer<typeof driverFormSchema>>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof driverFormSchema>) {
    const carData = values;
    let uploadedImageUrls = {
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      imageUrl4: "",
    };

    try {
      if (files.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        toast.error("Error Uploading Images");
        return;
      }


      // Create an array to store all uploaded URLs
      const allUploadedUrls = uploadedImages.map((image) => image?.url || "");

      // Assign URLs to their respective keys
      for (let i = 0; i < allUploadedUrls.length && i < 4; i++) {
        const imageKey = `imageUrl${i + 1}` as keyof typeof uploadedImageUrls;
        if (allUploadedUrls[i]) {
          uploadedImageUrls[imageKey] = allUploadedUrls[i];
        }
      }

      if (type === "Create") {
        try {
          const res = await fetch("/api/cars", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              car: {
                ...carData,
                ...uploadedImageUrls,
              },
            }),
          });

          const result = await res.json();
          if (result.success) {
            toast.success("Car Created Successfully");
            form.reset();
            setFiles([]); // Reset files state
          } else {
            toast.error(result.message || "Error Creating Car");
          }
        } catch (error) {
          console.error("Error creating car:", error);
          toast.error("Error Creating Car");
        }
      }
      if (type === "Update") {
        if (!carId) {
          toast.error("Car ID is missing");
          return;
        }

        try {
          const res = await fetch(`/api/cars/${carId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              car: {
                ...carData,
                ...uploadedImageUrls,
              },
            }),
          });

          const result = await res.json();

          if (result.success) {
            toast.success("Car Updated Successfully");
            router.push("/"); // Redirect to home page
          } else {
            toast.error(result.message || "Error Updating Car");
          }
        } catch (error) {
          console.error("Error updating car:", error);
          toast.error("Error Updating Car");
        }
      }
    } catch (error) {
      console.error("Error during upload:", error);
      toast.error("Error uploading images");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-between gap-5 "
      >
        <div className="flex flex-col justify-between gap-5">
          <h3 className="wrapper h3-bold text-center sm:text-left">
            Car Registry form
          </h3>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <MakeDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <ModelDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="drive"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <DriveDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <FuelDropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Plate No"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <p className="mr-1 p-medium-18 text-grey-500">Br</p>
                      <Input
                        type="text"
                        placeholder="Price per Day"
                        {...field}
                        className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus:visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="cylinder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Cylinder"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Year"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="imageUrl1"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value || ""}
                      setFiles={setFiles}
                      index={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl2"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value || ""}
                      setFiles={setFiles}
                      index={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="imageUrl3"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value || ""}
                      setFiles={setFiles}
                      index={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl4"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value || ""}
                      setFiles={setFiles}
                      index={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <CustomButton
          title={form.formState.isSubmitting ? "Submitting..." : `${type} Car`}
          btnType="submit"
          disabled={form.formState.isSubmitting}
          btnStyles="w-full  gap-4 py-[16px] rounded-full bg-primary-blue"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
          rightIcon="/right-arrow.svg"
        />
      </form>
      <ToastContainer />
    </Form>
  );
};

export default CarForm;
