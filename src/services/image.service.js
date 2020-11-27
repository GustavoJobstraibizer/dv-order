import app from "../utils/firebaseUtils";

// https://firebase.google.com/docs/storage/web/download-files?hl=pt-Br

const imageService = {
  async upload(file, path = "images/products/") {
    const storage = app.storage().ref();
    const refFile = storage.child(`${path}${file.name}`);

    try {
      const snapshot = await refFile.put(file);
      return snapshot;
    } catch (err) {
      throw new Error("Erro ao fazer upload do arquivo. Tente novamente.");
    }
  },

  async download() {},
};

export default imageService;
