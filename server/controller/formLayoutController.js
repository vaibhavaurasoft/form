

const FormModel = require("../schema/formLayoutModel");

const addFormLayout = async (req, res) => {
  try {
    const { formName, step, layoutName, formData, layouts } = req.body;

    // Save the form layout in the database
    const newFormLayout = await FormModel.create({
      step: step,
      name: layoutName,
      fields: formData.fields,
    });

    // Save the layouts in the database
    // await FormModel.insertMany(layouts);

    res.status(201).json({
      message: "Form layout added successfully",
      data: newFormLayout,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add form layout", data: null });
  }
};

// const addFormLayout = async (req, res) => {
//   try {
//     const { formName, step, layoutName, formData, layouts } = req.body;

//     // Save the form layout in the database
//     const newFormLayout = await FormModel.create({
//       name: {
//         step: step,
//         name: layoutName,
//         fields: formData.fields,
//       },
//     });

//     // Save the layouts in the database
//     await FormModel.insertMany(layouts);

//     res.status(201).json({
//       message: "Form layout added successfully",
//       data: newFormLayout,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add form layout", data: null });
//   }
// };

const getAllFormLayouts = async (req, res) => {
  try {
    const query = req.query;
    const allFormLayouts = await FormModel.find(query);
    res.status(200).json({
      message: "All form layouts fetched successfully",
      data: allFormLayouts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch form layouts", data: null });
  }
};

const getFormLayoutById = async (req, res) => {
  try {
    const formLayout = await FormModel.findById(req.params.id);
    if (!formLayout) {
      return res
        .status(404)
        .json({ error: "Form layout not found", data: null });
    }
    res.status(200).json({
      message: "Form layout fetched successfully",
      data: formLayout,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch form layout", data: null });
  }
};


const deleteFormLayoutById = async (req, res) => {
  try {
    const deletedLayout = await FormModel.findByIdAndDelete(req.params.id);
    if (!deletedLayout) {
      return res
        .status(404)
        .json({ error: "Form layout not found", data: null });
    }
    res.status(200).json({
      message: "Form layout deleted successfully",
      data: deletedLayout,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete form layout", data: null });
  }
};

const updateFormLayoutById = async (req, res) => {
  try {
    const updatedLayout = await FormModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLayout) {
      return res
        .status(404)
        .json({ error: "Form layout not found", data: null });
    }
    res.status(200).json({
      message: "Form layout updated successfully",
      data: updatedLayout,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update form layout", data: null });
  }
};


const deleteAllFormLayouts = async (req, res) => {
  try {
    const deletedLayouts = await FormModel.deleteMany();
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
  addFormLayout,
  getAllFormLayouts,
  getFormLayoutById,
  deleteAllFormLayouts,
  updateFormLayoutById,
  deleteFormLayoutById,
};