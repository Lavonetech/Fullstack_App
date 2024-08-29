const Stat = require("../model/OverallStat");

const createStat = async (req, res) => {
  try {
    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnit,
      year,
      monthlyData,
      dailyData,
      salesByCatogery,
    } = req.body;

    const stat = new Stat({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnit,
      year,
      monthlyData,
      dailyData,
      salesByCatogery,
    });

    await stat.save();
    res.status(200).json({ message: "successfuly insert stat data" });
  } catch (err) {
    res.staus(500).json({ message: "Internal server error" });
  }
};

const getOverallStat = async (req, res) => {
  try {
    const stat = Stat.find();
    const statData = await stat.exec();

    if (!statData || statData.length === 0) {
      res.staus(404).json({ message: "stat not found in the database" });
    } else {
      res.status(201).json({ statData });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { createStat, getOverallStat };
