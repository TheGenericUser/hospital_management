const pageValidator = (model, pageLimit) => {
    return async (req, res, next) => {
        try {
            let page = parseInt(req.params.page, 10);

            page = (isNaN(page) || page < 1) ? 1 : page;

            const totalDocuments = await model.countDocuments();
            const limit = parseInt(pageLimit, 10) || 10;
            const totalPages = Math.ceil(totalDocuments / limit);
            
            if(totalPages > 0){
                req.validatedPage = (page > totalPages) ? totalPages : page;
                
                req.skip = (req.validatedPage - 1) * limit;
                
                req.totalPages = totalPages;
            }else{
                req.totalPages = totalPages;
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    }
};

module.exports = { pageValidator };