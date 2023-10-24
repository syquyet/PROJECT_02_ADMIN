import { useEffect, useState } from "react";
import SidebarAdmin from "../sidebar.admin/sidebar";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import removeUnicode from "../until/removeUnicode";

export default function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataCatgory, setDataCatgory] = useState<any[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axios.get(`http://localhost:3000/listCategory`);
      setDataCatgory(reponse.data);
    };

    fetchdata();
  }, []);
  // thêm danh mục

  const [formData, setFormData] = useState<any>({
    category_name: "",
    products: [],
    status: true,
    description: "",
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  const hadleAddCategory = () => {
    axios.post("http://localhost:3000/listCategory", formData);
    handleClose();
  };
  //  xóa danh mục
  const handleDeleteCategory = (id: number) => {
    const dataDeleteProduct = dataCatgory?.filter((item) => item.id !== id);
    setDataCatgory(dataDeleteProduct);
    axios.delete(`http://localhost:3000/listCategory/${id}`);
  };
  //   tìm kiếm danh mục theo tên

  const searchCategoryByName = (name: string) => {
    const filteredCategory = dataCatgory?.filter((item) =>
      removeUnicode(item.category_name).toLowerCase().includes(name.toLowerCase())
    );
    setDataCatgory(filteredCategory);
  };
 
  return (
    <>
      <div className="product-container">
        <SidebarAdmin />

        <div className="manage-product">
          <h5>QUẢN LÝ DANH MỤC</h5>

          <div className="manage-product-input">
            <input
              id="manage-product-seach"
              type="text"
              placeholder="Nhập từ khóa"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => searchCategoryByName(searchQuery)}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              className="btn-add"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={handleShow}
            >
              Thêm
            </button>
          </div>
          <table className="list-product">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>

                <th>Số lượng sản phẩm</th>
                <th>Hành động</th>
              </tr>
              {dataCatgory?.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.category_name}</td>
                  <td>{item.description}</td>
                  <td>10</td>

                  <td>
                    <button className="btn-detail">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                    <button className="btn-edit">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCategory(item.id)}
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
            <Modal.Title>THÊM DANH MỤC</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                onChange={handleInputChange}
              >
                <Form.Label>Tên danh mục:</Form.Label>
                <Form.Control name="category_name" type="text" autoFocus />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                onChange={handleInputChange}
              >
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control name="description" type="text" autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              HỦY
            </Button>
            <Button variant="primary" type="button" onClick={hadleAddCategory}>
              THÊM
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
