import { Schema, model, models } from "mongoose";

export interface ICarMaker extends Document {
  _id: string;
  name: string;
}

const CarMakerSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const CarMaker = models.CarMaker || model("CarMaker", CarMakerSchema);

export default CarMaker;