import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const drawer = () => {
    navigate("/Darwer");
  };

  return (
    <Layout>
      메인페이지
      <div>
        <button
          style={{ color: "#ffffff", background: "#000000" }}
          onClick={drawer}
        >
          Drawer
        </button>
      </div>
    </Layout>
  );
};

export default Main;
