import { Subject } from "../Schema/model";


export const createSubjectService= async(data:{})=>{
  return await Subject.create(data)
}

export const readAllSubjectService = async()=>{
    return await Subject.find()
}

export let readSpecificSubjectService = async (id: string) => {
  return await Subject.findById(id);
};

export let updateSubjectService = async (id: string, data: {}) => {
  return await Subject.findByIdAndUpdate(id, data, { new: true });
};

export let deleteSubjectService = async (id: string) => {
  return await Subject.findByIdAndDelete(id);
};


