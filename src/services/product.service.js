import app from "../utils/firebaseUtils";
import imageService from "./image.service";

const productService = {
  async store(product) {
    try {
      imageService.upload(product.file[0]);
      const db = app.firestore();
      const { file, ...newProduct } = product;
      const category = `/categories/${product.categoryId}`;
      const data = await db
        .collection("products")
        .add({
          ...newProduct,
          image: product.file[0].name,
          category: db.doc(category),
        });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },
  remove(id) {},
  edit() {},
};

export default productService;
