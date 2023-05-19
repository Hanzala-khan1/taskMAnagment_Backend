const Category = require("../models/category")


module.exports = {

    /////////// add comment ///////////////
    async addcategory(req, res, next) {
        try {
            const category = await Category.create(req.body);
            return res.status(200).send({
                success: true,
                message: "Category Added",
                status: 200,
                data: category
            })


        } catch (error) {
            next(error)
        }
    },

    //////////// get comment /////////////////
    async getcategory(req, res, next) {
        try {
            const category = await Category.find()
            return res.status(200).send({
                success: true,
                message: "Category Added",
                status: 200,
                data: category
            })
        } catch (error) {
            next(error)
        }
    },


    //////////// delete comment /////////////////
    async deletecategory(req, res, next) {
        const categoryId = req.params.id;
        try {
            const category = await Category.findByIdAndDelete(categoryId);

            if (!category) {
                return res.status(404).send({
                    success: false,
                    message: "Category not found",
                    status: 404
                });
            }

            return res.status(200).send({
                success: true,
                message: "Category deleted",
                status: 200,
                data: {}
            });
        } catch (err) {
            next()
        }
    },

    //////////// update comment /////////////////
    async updatecategory(req, res, next) {
        const categoryId = req.params.id;
        try {
            const category = await Category.findByIdAndUpdate(
                categoryId,
                { category_title: req.body.category_title },
                { new: true }
            );

            if (!category) {
                return res.status(404).send({
                    success: false,
                    message: "Category not found",
                    status: 404
                });
            }

            return res.status(200).send({
                success: true,
                message: "Category deleted",
                status: 200,
                data: category
            });
        } catch (err) {
            next()
        }
    }
}