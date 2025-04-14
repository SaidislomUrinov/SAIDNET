import { useEffect, Suspense, lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "./utils/fetching";
import { updateUser } from "./contexts/user";
import Loading from "./components/Loading";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Top from "./components/Top";
import { Route, Routes, useNavigate } from "react-router-dom";
const Catalogs = lazy(() => import("./pages/catalogs/Catalogs"));
function App() {
  const { _id } = useSelector((e) => e.user);
  const dp = useDispatch();
  const [load, setLoad] = useState(false);
  const nv = useNavigate();
  useEffect(() => {
    get("/admin/verify")
      .then((res) => {
        const { ok, data } = res;
        if (ok) {
          dp(updateUser(data));
          // nv("/dashboard");
        }
      })
      .finally(() => {
        setLoad(true);
      });
  }, []);

  if (!load) {
    return (
      <div className="flex items-center bg- justify-center w-full h-[100vh]">
        <Loading />
      </div>
    );
  }
  if (!_id) {
    return <Auth />;
  }
  return (
    <div className="flex items-start justify-start w-full">
      {/* navbar */}
      <Navbar />
      <div className="flex items-center justify-start flex-col w-full lg:w-5/6">
        {/* top */}
        <Top />
        {/* content */}
        <div className="flex p-[10px] items-start justify-start flex-col w-full h-[90vh]">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/catalogs" element={<Catalogs />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
