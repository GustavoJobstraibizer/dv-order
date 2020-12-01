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

  async getImage(path) {
    const storage = app.storage().ref();
    const imageRef = storage.child(path);

    try {
      const url = await imageRef.getDownloadURL();
      return url;
    } catch (err) {
      switch (err.code) {
        case "storage/object-not-found":
          // File doesn't exist
          throw new Error("Arquivo não existente");
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          throw new Error("Usuário não autorizado");
        case "storage/canceled":
          // User canceled the upload
          throw new Error("Download cancelado");
        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          throw new Error("Erro desconhecido, inspecione a resposta do server");
      }
    }
  },
};

export default imageService;
