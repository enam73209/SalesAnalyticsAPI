const {TotalRevenueService, QuantityByProductService, TopProducts, AvgPrice, RevenueByMonth} = require('../services/SalesServices')
exports.TotalRevenue =async(req,res)=>{
    let result =await TotalRevenueService();
    return res.status(200).json(result);
}

exports.QuantityByProduct = async (req,res)=>{
    let result = await QuantityByProductService();
    return res.status(200).json(result);
}

exports.TopProducts = async (req,res)=>{
    let result  = await TopProducts();
    res.status(200).json(result);
}

exports.AVGPrice = async (req,res)=>{
    let result  = await AvgPrice();
    res.status(200).json(result);
}

exports.RevenueByMonth = async (req,res)=>{
    let result =  await RevenueByMonth(req);
    res.status(200).json(result);
}