const { geoSearch } = require("../model/Product");
const { Transaction } = require("../model/Transaction");

const createTransaction = async (req, res) => {
  const { userId, cost } = req.body;

  try {
    const transaction = new Transaction({
      userId,
      cost,
    });

    await transaction.save();
    res.status(201).json({ message: "Transaction compleate" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// const getTransaction = async (req, res) => {
//   try {
//     const {page=1,pageSize=20,sort=null,search=""}=req.query

//     const generateSort = () =>{
//         const sortParsed=JSON.parse(sort)
//         const sortFormatted={
//             [sortParsed.feild]:sortParsed.sort="asc" ? 1 : -1
//         }

//         return sortFormatted;
//     }

//     const sortFormatted=Boolean(sort) ? generateSort():{}

//     const transaction = Transaction.find({
//         $or:[
//             {cost:{$regex:new RegExp(search, 'i')}},
//             {userId:{$regex:new RegExp(search, 'i')}},
//         ]
//     })

//      .sort(sortFormatted)
//     .skip(page*pageSize)
//     .limit(pageSize);
    
//     const total=await Transaction.countDocuments({
//         name:{$regex:search,$options:'i'},
//     })

//     res.status(200).json({
//         transaction,
//         total
//     })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const getTransaction=async (req,res)=>{
    try{
      const query=Transaction.find()
      const transaction= await query.exec()

      if(!transaction || transaction.length===0){
        res.status(404).json({message:"Transaction not found"})
      }
      res.status(200).json({transaction})
    }catch(err){
      console.log(err)
      res.status(500).json({message:"Server error"})
    }

  

}
module.exports = { createTransaction, getTransaction };
