import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./sidebar.css";
import axios from "axios";
import { AdminEntity } from "../../type/admin";
import { navigation } from "../until/navigation";
export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [dataAdmin, setDataAdmin] = useState<AdminEntity[]>([]);
  const auth: any = localStorage.getItem("admin");
  const adminLocal = JSON.parse(auth);

  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axios.get(`http://localhost:3000/admin`);
      setDataAdmin(reponse.data);
    };
    fetchdata();
  }, []);
  const data = dataAdmin.find((item: any) => item.id === adminLocal);
  // logout admin
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login")
  };

  return (
    <div className="sidenav-admin">
      <div className="sidenav">
        <div className="sidenav-avatar">
          <img src="./logo192.png" alt="" />
          <p>Role: Admin</p>
          <p>{data?.name}</p>
          <button className="btn btn-primary">Edit</button>
          <hr />
        </div>
        <div className="sidenav-content">
          <div>
            <Link to="/">
              <i className="fa-solid fa-list" />
              <a href="">Dashboard</a>
            </Link>
          </div>
          <div>
            <Link to="/customer.manager">
              <i className="fa-solid fa-users" />
              <a href="">Customer</a>
            </Link>
          </div>
          <div>
            <Link to="/product.manager">
              <i className="fa-solid fa-shirt" />
              <a href="">Product</a>
            </Link>
          </div>
          <div>
            <Link to="/category">
              <i className="fa-solid fa-shirt" />
              <a href="">Category</a>
            </Link>
          </div>
          <div>
            <Link to="/order.manager">
              <i className="fa-solid fa-file-invoice" />
              <a href="">Order</a>
            </Link>
          </div>
          <div>
            <Link to="">
              <i className="fa-solid fa-comments" />
              <a href="">Reviews</a>
            </Link>
          </div>
          <div>
            <Link to="">
              <i className="fa-solid fa-award" />
              <a href="">Vouchers</a>
            </Link>
          </div>
          <div>
            <i className="fa-solid fa-right-from-bracket" />
            <a  onClick={handleLogout}>
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
