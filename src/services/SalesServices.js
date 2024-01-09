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

const RevenueByMonth =async  (req)=>{
    try {
        const givenDate = req.params.date; // Assuming the date is passed as a URL parameter in the format 'YYYY-MM-DD'
        const year = parseInt(givenDate.split('-')[0]); // Extract year from the given date
        const month = parseInt(givenDate.split('-')[1]); // Extract month from the given date
        const startDate = new Date(year, month - 1, 1, 0, 0, 0); // Start of the day
        const endDate = new Date(year, month, 0, 23, 59, 59); // End of the day

        console.log(startDate, endDate);

        const data = await SalesModel.aggregate([
            {
                $match:{
                    createdAt: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group:{
                    _id:null,
                    totalRevenue :{$sum :{$multiply :[{$toDouble:"$quantity"},{$toDouble:"$price"}] } }
                }
            }
        ]).exec();
        return {status:"success", data:data[0]['totalRevenue']}
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