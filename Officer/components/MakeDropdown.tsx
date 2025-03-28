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
import { ICarMaker } from "@/lib/database/models/carmaker.model";
import { createMaker, getAllMakers } from "@/lib/actions/maker.action";
import { DropdownProps } from "@/types";


  
  const MakeDropdown = ({onChangeHandler, value}: DropdownProps) => {
    const [makers, setMakers] = useState<ICarMaker[]>([]);
    const [newMaker, setNewMaker] = useState("");
  
    const handleAddMaker = () => {
      createMaker({
        makerName: newMaker.trim()
      }).then((model)=>{
        setMakers((prevState) => [...prevState, model])
      })
    }
  
    useEffect(()=>{
      const getMakers = async () => {
        const makerList = await getAllMakers();
  
        makerList && setMakers(makerList as ICarMaker[]);
      }
        getMakers();
    },[])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value} >
        <SelectTrigger className="select-field ">
          <SelectValue placeholder="Maker" />
        </SelectTrigger>
        <SelectContent>
          {makers.length > 0 &&
            makers.map((maker) => (
              <SelectItem
                key={maker._id}
                value={maker.name}
                className="select-item p-regular-14"
              >
                {maker.name}
              </SelectItem>
            ))}
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add Maker
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Maker</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Maker name"
                    className="input-field mt-3"
                    onChange={(e) => setNewMaker(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=> startTransition(handleAddMaker)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    );
  };
  
  export default MakeDropdown;
  