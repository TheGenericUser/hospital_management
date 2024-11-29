const mongoose = require('mongoose');

const reportLinkValidator = (model) => {
    return async (req, res, next) => {
        try {
            const reportId = req.params.reportId;

            let arrayIndex = parseInt(req.params.arrayIndex, 10) - 1;

            arrayIndex = (isNaN(arrayIndex) || arrayIndex < 0) ? 0 : arrayIndex;

            const count = await model.aggregate([
                {
                    $match: { '_id': new mongoose.Types.ObjectId(`${reportId}`) }  // using string interpolation to make sure its str
                },
                {
                    $project: {
                        _id: 0,
                        reportCount: { $size: '$reports' }
                    }
                }
            ]);

            const reportCount = count[0].reportCount;

            if(reportCount > 0){
                req.reportId = reportId; 
                req.arrayIndex = (arrayIndex >= reportCount) ? reportCount-1 : arrayIndex;
            }
            req.reportCount = reportCount;

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    }
};

module.exports = { reportLinkValidator };