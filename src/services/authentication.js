import app from "../utils/firebaseUtils";

const auth = {
  async signIn(email, password) {
    try {
      return await app.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {}
  },

  async logout() {
    await app.auth().signOut();
  },
};

export default auth;
