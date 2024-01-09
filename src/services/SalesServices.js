const SalesModel =require('../models/SalesModel');
const TotalRevenueService = async ()=>{
    try {
        const data = await SalesModel.aggregate([
            {
                $project:{
                    revenue:{
                        $multiply:[{$toDouble:"$quantity"},{$toDouble: "$price"}]
                    }
                }
            },
            {
                $group:{
                _id:null,
                totalRevenue:{$sum:"$revenue"}
                }
            }
        ]).exec();
        let toTalRevenue=data[0]['totalRevenue'];
        return{ status:"success",data:toTalRevenue}

    }catch (e) {
        return{ status:"fail",data:e}.toString()
    }
}

const QuantityByProductService = async ()=>{
    try {
        let data = await SalesModel.aggregate([
            {
                $group:{
                    _id:'$product',

                    totalQuantitySold:{$sum:{$toDouble:'$quantity'}}
                }
            }
        ]).exec();
        return {status:"success", data:data};
    }catch (e) {
        return{ status:"fail",data:e.message}
    }
}

const TopProducts = async ()=>{
    try {
            let data = await SalesModel.aggregate([
                {
                    $addFields: {
                        revenue: { $multiply: [{ $toDouble: '$quantity' }, { $toDouble: '$price' }] }
                    }
                },
                {
                    $group: {
                        _id: '$product',
                        totalRevenue: { $sum: '$revenue' }
                    }
                },
                {
                    $sort: { totalRevenue: -1 }
                },
                {
                    $limit: 5
                }
            ]).exec();
            return {status:"success",data:data}
    }catch (e) {
        return{ status:"fail",data:e.message}
    }
}

const AvgPrice = async ()=>{
    try {
        const data =await SalesModel.aggregate([
            {
                $group:{
                    _id:null,
                    totalPrice:{$sum:{$toDouble:'$price'}},
                    totalQuantity:{$sum:{$toDouble:'$quantity'}}
                },

            },
            {
                $project:{
                    _id:0,
                    avgPrice:{$divide:['$totalPrice','$totalQuantity']}
                }
            }

        ]).exec();
        let AvgPrice = data[0]['avgPrice'];
        return {status:"success",data:AvgPrice}
    }catch (e) {
        return {status:"fail", data:e.message}
    }
}

const RevenueByMonth =  (req)=>{
    try {
        const { monthYear  } = req.params; // Assuming the date is passed as a URL parameter in the format 'YYYY-MM-DD'
        const [year, month, day] = monthYear.split('-');
        // Create a Date object using year, month, and day parts
        // const startDate = new Date(Number(year), Number(month) - 1, Number(day));
        // const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Calculate the end date of the month

        // Create a Date object for the given month
        const startDate = new Date(Number(year), Number(month) - 1, 1); // Start date of the month
        const endDate = new Date(Number(year), Number(month), 0); // End date of the month (last day of the month)

        console.log(startDate, endDate);
    }catch (e) {
        return{status:"fail", data: e.message}
    }
}
module.exports={
TotalRevenueService,
QuantityByProductService,
TopProducts,
AvgPrice,
RevenueByMonth
}