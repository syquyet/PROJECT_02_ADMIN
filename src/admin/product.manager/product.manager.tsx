import { useEffect, useState } from "react";
import SidebarAdmin from "../sidebar.admin/sidebar";
import "./product.manager.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";
import removeUnicode from "../until/removeUnicode";
export default function ProductManager() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = (action: string) => {
    action === "ADD" ? setAction("THÊM") : setAction("EDIT");
    setShow(true);
  };
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axios.get(`http://localhost:3000/products`);
      setDataProduct(reponse.data);
    };

    fetchdata();
  }, []);
  //  xóa sản phẩm
  const handleDeleteProduct = (id: number) => {
    const dataDeleteProduct = dataProduct.filter((item) => item.id !== id);
    setDataProduct(dataDeleteProduct);
    axios.delete(`http://localhost:3000/products/${id}`);
  };
  //  thêm sản phẩm mới
  const [formData, setFormData] = useState<any>({
    category: "",
    name: "",
    price: 0,
    size: ["S", "M", "L", "XL", "XXL"],
    quantity: 0,
    created_at: new Date().toLocaleDateString(),
    image: ["/assets/image/anh sản phẩm 1.jpg"],
    describe:
      " Váy chân dài luôn có sức hút và vị trí riêng trong vô vàn sản phẩm thời trang cho nữ",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "price" || name === "quantity") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const hadleAddProduct = () => {
 
      axios.post("http://localhost:3000/products", formData);
      handleClose();
    
  };
  // tìm user theo tên
  const searchUserByName = (name: string) => {
    const filteredUsers = dataProduct.filter((user) =>
     removeUnicode(user.name) .toLowerCase().includes(name.toLowerCase())
    );
    setDataProduct(filteredUsers);
  };
  
  const handleEditProduct = () => {
    handleShow("EDIT");
  };
  return (
    <>
      <div className="product-container">
        <SidebarAdmin />

        <div className="manage-product">
          <h5>QUẢN LÝ SẢN PHẨM</h5>

          <div className="manage-product-input">
            <input
              id="manage-product-seach"
              type="text"
              placeholder="Nhập từ khóa"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => searchUserByName(searchQuery)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              className="btn-add"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={() => handleShow("ADD")}
            >
              Thêm
            </button>
          </div>
          <table className="list-product">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Hành động</th>
              </tr>
              {dataProduct?.map((product, index) => (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product?.size.toString()}</td>
                  <td>{product?.price.toLocaleString()}VNĐ</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button className="btn-detail">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button className="btn-edit" onClick={handleEditProduct}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tên sản phẩm:</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Giá sản phẩm:</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Số lượng sản phẩm:</Form.Label>
                <Form.Control
                  name="quantity"
                  type="number"
                 
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Danh mục sản phẩm:</Form.Label>
                <Form.Control
                  name="category"
                  type="text"
              
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control
                  name="describe"
                  type="text"
                 
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image</Form.Label>
                <Form.Control
                  name="img"
                  type="file"
                 
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              HỦY
            </Button>
            <Button variant="primary" type="button" onClick={hadleAddProduct}>
              {action}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
