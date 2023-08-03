const FormDataModel = require("../schema/formDataModel");

const saveFormData = async (req, res) => {
  try {
    const { formName, formData } = req.body;
    const newFormData = await FormDataModel.create({ formName, formData });
    res.status(201).json({
      message: "Form data saved successfully",
      data: newFormData,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save form data", data: null });
  }      
}; 
const getAllFormData = async (req, res) => {
  try {
    const allFormData = await FormDataModel.find();
    res.status(200).json({
      message: "All form data fetched successfully",
      data: allFormData,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch form data", data: null });
  }
};
const DeletelFormData = async (req, res) => {
  try {
    const deletedLayouts = await FormDataModel.deleteMany();
    res.status(200).json({
      message: "All form layouts deleted successfully",
      data: deletedLayouts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete all form layouts", data: null });
  }
};

module.exports = {
  saveFormData,
  getAllFormData,
  DeletelFormData,
};
    