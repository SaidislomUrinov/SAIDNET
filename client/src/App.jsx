import { useDispatch, useSelector } from "react-redux";
import LeadForm from "./components/LeadForm";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useEffect } from "react";
import { get } from "./utils/fetching";
import { updateState } from "./contexts/state";

function App() {
  const { load } = useSelector((e) => e.state);
  const dp = useDispatch();
  useEffect(() => {
    get("/user/home").then((res) => {
      const { ok, data } = res;
      if (ok) {
        dp(updateState(data));
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <Home />
      <LeadForm />
    </>
  );
}

export default App;
