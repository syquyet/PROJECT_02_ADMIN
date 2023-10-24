import { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "../sidebar.admin/sidebar";
import "./customer.manager.css";
import { AdminEntity } from "../../type/admin";
import removeUnicode from "../until/removeUnicode";
export default function CustomerManager() {
  const [dataUser, setDataUser] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [user, setUser] = useState<AdminEntity>();
  useEffect(() => {
    getData("http://localhost:3000/users", setDataUser);
  }, [searchQuery]);
  const getData = async (url: string, setData: Function) => {
    const response = await axios.get(url);
    setData(response.data);
  };
  // tìm user theo tên
  const searchUserByName = (name: string) => {
    const filteredUsers = dataUser.filter((user) =>
      removeUnicode(user.name).toLowerCase().includes(name.toLowerCase())
    );
    setDataUser(filteredUsers);
  };
  // sửa trạng thái user
  const handleEditUser = async (user: any) => {
    const { id } = user;
    let newdata;
    if (user?.status === "activate") {
      newdata = {
        status: "inactive",
      };
    } else {
      newdata = {
        status: "activate",
      };
    }
    await axios.patch(`http://localhost:3000/users/${id}`, newdata);
    getData("http://localhost:3000/users", setDataUser);
  };

  return (
    <div className="customer-container">
      <SidebarAdmin />
      <div className="manage-user">
        <h5>QUẢN LÝ NGƯỜI DÙNG</h5>
        <div className="manage_users-input">
          <input
            id="manage-user-seach"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập từ khóa"
          />
          <button onClick={() => searchUserByName(searchQuery)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <table className="list-users">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>address</th>
              <th>created_at</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {dataUser.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.created_at}</td>
                <td>{user.role}</td>
                <td>
                  {user.status === "activate" ? (
                    <select name="" id="">
                      <option value="activate">{user.status}</option>
                      <option value="inactive">inactive</option>
                    </select>
                  ) : (
                    <select name="" id="">
                      <option value="inactive">{user.status}</option>
                      <option value="activate">activate</option>
                    </select>
                  )}
                </td>
                <td>
                  <button type="button" onClick={() => handleEditUser(user)}>
                    {/* <i className="fa-solid fa-pen-to-square"></i> */}
                    edit
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
