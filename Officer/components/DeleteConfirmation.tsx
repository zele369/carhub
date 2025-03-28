"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast, ToastContainer } from "react-toastify";

export const DeleteConfirmation = ({id}: {id:string}) => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Car deleted successfully");
      } else {
        toast.error(result.error || "Error deleting car");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting car");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src="/assets/icons/delete.svg"
          alt="edit"
          width={20}
          height={20}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this Car
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => startTransition(handleDelete)}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <ToastContainer/>
    </AlertDialog>
  );
};
