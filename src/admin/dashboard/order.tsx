import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

export default function Orders() {
  const [dataListOrder, setListOrder] = React.useState<any[]>([]);
  React.useEffect(() => {
    getData("http://localhost:3000/listOrder", setListOrder);
  }, []);
  const getData = async (url: string, setData: Function) => {
    const response = await axios.get(url);
    setData(response.data);
  };
  return (
    <React.Fragment>
      <h3>List Order</h3>
     
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Ngày order</TableCell>
            <TableCell>Tên khách hàng</TableCell>
            <TableCell>email khách hàng</TableCell>
            <TableCell>Trạng thái</TableCell>
          
            <TableCell align="right">Tổng order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataListOrder.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>{order.order_at}</TableCell>
              <TableCell>{order.user_name}</TableCell>
              <TableCell>{order.user_email}</TableCell>
              <TableCell>{order.status}</TableCell>
              
              <TableCell align="right">{`${order.total_price.toLocaleString()}VND`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#">
        See more orders
      </Link>
    </React.Fragment>
  );
}
