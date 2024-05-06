export let singleFileController = async (req: any, res: any, next: any) => {
  try {
    let link = `http://localhost:8000/${req.file.filename}`;
    res.json({ success: true, result: link });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
export let multipleFileController = async (req: any, res: any, next: any) => {
  console.log(req.files);
  try {
    let link = req.files.map((val: any, i: any) => {
      return `http://localhost:8000/${val.filename}`;
    });
    res.json({ result: link });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
