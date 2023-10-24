import "./order.manager.css";
import SidebarAdmin from "../sidebar.admin/sidebar";

import { useEffect, useState } from "react";
import axios from "axios";
import removeUnicode from "../until/removeUnicode";

export default function OrderManager() {
  const [dataListOrder, setListOrder] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getData("http://localhost:3000/listOrder", setListOrder);
  }, []);
  const getData = async (url: string, setData: Function) => {
    const response = await axios.get(url);
    setData(response.data);
  };
  // tìm user theo tên
  const searchUserByName = (user_name: string) => {
    const filteredUsers = dataListOrder.filter((order) =>
      removeUnicode(order.user_name)
        .toLowerCase()
        .includes(user_name.toLowerCase())
    );
    setListOrder(filteredUsers);
  };
  return (
    <div className="order-container">
      <SidebarAdmin />
      <div className="manager-order">
        <h5>QUẢN LÝ ORDER</h5>
        <div className="manage_order-input">
          <input
            id="manage-order-seach"
            type="text"
            placeholder="Nhập từ khóa"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => searchUserByName(searchQuery)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <table className="list-order">
          <tbody>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Ngày</th>
              <th>Tên khách hàng</th>
              <th>Tổng giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {dataListOrder.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.order_id}</td>
                <td>{item.created_at}</td>
                <td>{item.user_name}</td>
                <td>{item.total_price.toLocaleString()}VNĐ</td>
                <td>{item.status}</td>
                <td>
                  <button className="btn-detail">
                    <i className="fa-regular fa-eye"></i>
                  </button>
                  <button className="btn-edit">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
