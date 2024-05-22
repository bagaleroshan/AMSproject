export async function renameIdField(result: { _doc: { [key: string]: any }, _id: string, id?: string }) {
    if (result && result._doc && result._doc._id) {
        // Assign the _id value to id
        result._doc.id = result._doc._id;

        // Remove the _id field from _doc
        delete result._doc._id;
    }
}
