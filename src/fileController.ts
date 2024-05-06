


export let singleFileController = async (req:any, res:any, next:any) => {
  let link = `http://localhost:8000/${req.file.filename}`;
  res.json({ success: true, result: link });
};
export let multipleFileController = async (req:any, res:any, next:any) => {
console.log(req.files)
let link=req.files.map((val:any,i:any)=>{ return `http://localhost:8000/${val.filename}`;})
 res.json({result:link})
};

