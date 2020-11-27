import app from "../utils/firebaseUtils";
import imageService from "./image.service";

const productService = {
  async store(product) {
    try {
      imageService.upload(product.file[0]);
      const db = app.firestore();
      const { file, ...newProduct } = product;
      const data = await db.collection("products").add({ ...newProduct, image: product.file[0].name });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  },
  remove(id) {},
  edit() {},
};

export default productService;
