const Step  = require("../schema/step")

const addStep = async(req,res)=>{
    const addStep = await Step.create(req.body)
    res.status(201).json({message:"Step added successfully",data:addStep})
}
const Allsetps = async(req,res)=>{
    const Allsetps = await Step.find()
    res.status(200).json({message:"All Steps",data:Allsetps})
}
const deleteAllStep = async (req, res) => {
  try {
    const deletedLayouts = await Step.deleteMany();
    res.status(200).json({
      message: "All form step deleted successfully",
      data: deletedLayouts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all step", data: null });
  }
};
const deleteStepById =  async(req,res)=>{
  try {
    const deletedLayout = await Step.findByIdAndDelete(req.params.id);
    if (!deletedLayout) {
      return res
        .status(404)
        .json({ error: "Form Step not found", data: null });
    }
    res.status(200).json({
      message: "Form Step deleted successfully",
      data: deletedLayout,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete form Step", data: null });
  }
}


module.exports = {
  addStep,
  Allsetps,
  deleteAllStep,
  deleteStepById,
}; 
    