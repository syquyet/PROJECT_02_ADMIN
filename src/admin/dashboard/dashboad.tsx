import "./dashboad.scss";
import SidebarAdmin from "../sidebar.admin/sidebar";
import Orders from "./order";
import Deposits from "./Deposits";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div>
        <div className="total">
          {" "}
          <Deposits />
        </div>

        <div className="order">
          <Orders />
        </div>
      </div>
    </div>
  );
}
