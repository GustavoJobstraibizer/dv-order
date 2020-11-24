import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Auth";
import Navigation from "./components/Navigation";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/">
            <Navigation />
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path="/categorias">
            <Navigation />
            <Categories />
          </ProtectedRoute>
          <ProtectedRoute path="/produtos">
            <Navigation />
            <Products />
          </ProtectedRoute>
          <Route path="/signin">
            <SignIn />
          </Route>
        </Switch>

        <ToastContainer
          position="top-right"
          transition={Slide}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
