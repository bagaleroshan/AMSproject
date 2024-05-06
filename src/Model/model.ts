import { model } from "mongoose";
import studentSchema from "../Schema/studentSchema";

export let Student = model("Student", studentSchema);
