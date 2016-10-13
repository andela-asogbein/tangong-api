import express from 'express';
import category from '../controllers/category.controller';
import auth from '../controllers/auth.controller';

let router = express.Router();


let categoryRoutes = app => {
    router.route("/categories")
        .get(category.getAll)
        .post(auth.verifyToken, category.create)
        .delete(category.remove)
    router.route("/category/:id")
        .get(category.getOne)
        .put(category.update)
        .delete(category.removeOne)

    app.use("/api", router);
};

export default categoryRoutes;
