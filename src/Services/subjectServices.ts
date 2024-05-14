import { SubjectModel } from "../Schema/subjectSchema"

export const createSubjectService= async(data:{})=>{
  return await SubjectModel.create(data)
}

export const readAllSubjectService = async()=>{
    return await SubjectModel.find()
}

export let readSpecificSubjectService = async (id: string) => {
  return await SubjectModel.findById(id);
};

export let updateSubjectService = async (id: string, data: {}) => {
  return await SubjectModel.findByIdAndUpdate(id, data, { new: true });
};

export let deleteSubjectService = async (id: string) => {
  return await SubjectModel.findByIdAndDelete(id);
};


