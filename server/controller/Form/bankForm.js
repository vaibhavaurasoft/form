 const BankForm = require("../../schema/BankForm/bankform")

const addFormLayout = async (req, res) => {
  try {
    const { bankId, steps } = req.body;

    // Format the steps data to match the model schema
    const formattedSteps = steps.map((step) => ({
      stepNumber: step[0],
      fileds: step[1].map((field) => ({ ...field })),
    }));

    // Save the form layout in the database
    const newFormLayout = await BankForm.create({
      bankId,
      steps: formattedSteps,
    });

    res.status(201).json({
      message: "Form layout added successfully",
      data: newFormLayout,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add form layout", data: error });
  }
};

 

  const getAllFormLayouts = async (req, res) => {
    try {
      const query = req.query;
      const allFormLayouts = await BankForm.find(query).populate({
        path: "bankId",
        select:["bankname"]
      });
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
    const { id } = req.params;
    const formLayout = await BankForm.findById(id);

    if (!formLayout) {
      return res.status(404).json({ message: "Form layout not found" });
    }

    res.status(200).json({
      message: "Form layout fetched successfully",
      data: formLayout,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch form layout", data: error });
  }
};
  const deleteAllFormLayouts = async (req, res) => {
    try {
      const deletedLayouts = await BankForm.deleteMany();
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
  const updateFormLayoutById = async (req, res) => {
    try {
      const updatedLayout = await BankForm.findByIdAndUpdate(
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
 const deleteFormLayoutById = async (req, res) => {
   try {
     const { formLayoutId } = req.params;
     const deletedFormLayout = await BankForm.findByIdAndRemove(formLayoutId);

     if (!deletedFormLayout) {
       return res.status(404).json({ message: "Form layout not found" });
     }

     res.status(200).json({
       message: "Form layout deleted successfully",
       data: deletedFormLayout,
     });
   } catch (error) {
     res
       .status(500)
       .json({ error: "Failed to delete form layout", data: error });
   }
 };

  module.exports={
    addFormLayout,
    getAllFormLayouts,
    getFormLayoutById,
    deleteAllFormLayouts,
    updateFormLayoutById,
    deleteFormLayoutById
  }