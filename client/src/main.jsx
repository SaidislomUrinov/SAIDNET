import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./utils/i18n";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./contexts/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster position="top-center" />
  </BrowserRouter>
);
