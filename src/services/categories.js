import app from "../utils/firebaseUtils";

const categoriesService = {
  async store(description) {
    const db = app.firestore();
    const data = await db.collection("categories").add({ description });
    return data;
  },

  async edit(categorie, description) {
    const db = app.firestore();
    await db.collection("categories").doc(categorie.id).set({ description });
    return true;
  },

  async remove(id) {
    const db = app.firestore();
    await db.collection("categories").doc(id).delete();
  },
};

export default categoriesService;
