export async function renameIdField(result: { id?: string; _id: string }) {
  //  if (result && result._doc && result._doc._id) {
  // Assign the _id value to id
result={
    ...result,"id":result._id
}

  // Remove the _id field from _doc
  // delete result._id;
  //  }
}
