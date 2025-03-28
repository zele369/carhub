import { Schema, model, models } from "mongoose";

export interface ICarModel extends Document {
  _id: string;
  name: string;
}

const CarModelSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const CarModel = models.CarModel || model("CarModel", CarModelSchema);

export default CarModel;