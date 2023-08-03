const Bank  = require("../../schema/bank/bank")

const addBank = async(req,res)=>{
    const addBank = await Bank.create(req.body)
    res.status(201).json({message:"Bank added successfully",data:addBank})
}
const AllBanks = async(req,res)=>{
    const AllBanks = await Bank.find()
    res.status(200).json({message:"All Steps",data:AllBanks})
} 
const deleteAllBanks = async (req, res) => {
  try {
    const deletedLayouts = await Bank.deleteMany();
    res.status(200).json({
      message: "All form step deleted successfully",
      data: deletedLayouts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all step", data: null });
  }
};
const GetBankById = async (req, res) => {
    try {
      const BankDetails = await Bank.findById(req.params.id);
      if (!BankDetails) {
        return res
          .status(404)
          .json({ error: " Bank not found", data: null });
      }
      res.status(200).json({
        message: " Bank fetched successfully",
        data: BankDetails,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch form Bank", data: null });
    }
  };
  const DeleteBankById = async (req, res) => {
    try {
      const BankDetails = await Bank.findByIdAndDelete(req.params.id);
      if (!BankDetails) {
        return res.status(404).json({ error: " Bank not found", data: null });
      }
      res.status(200).json({
        message: " Bank Delete successfully",
        data: BankDetails,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch form Bank", data: null });
    }
  };
  
module.exports = {
  addBank,
  AllBanks,
  deleteAllBanks,
  GetBankById,
  DeleteBankById,
}; 
    