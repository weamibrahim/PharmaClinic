const Medicine = require("../Models/Medicine");

const MedicineController = {};



MedicineController.getMedicines = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const totalCount = await Medicine.countDocuments();
        const medicines = await Medicine.find().limit(limit).skip(startIndex);
        res.json({
            medicines,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

MedicineController.getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.json(medicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
MedicineController.getAllMedicinesByName = async (req, res) => {
    try {
      const medicines = await Medicine.find({}).select("name _id dosage");
      console.log(medicines);
        res.json(medicines);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
MedicineController.createMedicine = async (req, res) => {
    try {
        const newMedicine = new Medicine(req.body);
        await newMedicine.save();
        res.status(201).json({ message: "Medicine created successfully", newMedicine });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
MedicineController.updateMedicine = async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.json({
            message: "Medicine updated successfully",
            updatedMedicine,});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

MedicineController.deleteMedicine = async (req, res) => {
    try {
        const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.json({
            message: "Medicine deleted successfully",
            deletedMedicine,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = MedicineController;    
