import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";
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
import { Input } from "./ui/input";
import { ICarModel } from "@/lib/database/models/carmodel.model";
import { createModel, getAllModels } from "@/lib/actions/model.action";
import { DropdownProps } from "@/types";

const ModelDropdown = ({onChangeHandler, value}: DropdownProps) => {
  const [models, setModels] = useState<ICarModel[]>([]);
  const [newModel, setNewModel] = useState("");

  const handleAddModel = () => {
    createModel({
      modelName: newModel.trim()
    }).then((model)=>{
      setModels((prevState) => [...prevState, model])
    })
  }

  useEffect(()=>{
    const getModels = async () => {
      const modelLists = await getAllModels();

      modelLists && setModels(modelLists as ICarModel[]);
    }
      getModels();
  },[])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value} >
      <SelectTrigger className="select-field ">
        <SelectValue placeholder="Models" />
      </SelectTrigger>
      <SelectContent>
        {models.length > 0 &&
          models.map((model) => (
            <SelectItem
              key={model._id}
              value={model.name}
              className="select-item p-regular-14"
            >
              {model.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add Model
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Model</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Model name"
                  className="input-field mt-3"
                  onChange={(e) => setNewModel(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> startTransition(handleAddModel)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default ModelDropdown;
