import * as React from 'react';
import { useEffect, useState, useContext} from 'react';
import { axiosInstance } from '../../../config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Context } from '../../../context/Context';
import { Link } from "react-router-dom";


export default function Allproductbyuser() {
  
  const [products, setproducts] = useState([])
  const user = useContext(Context);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axiosInstance.get("/products/" + user.user.username)
      setproducts(res.data)
    }
    fetchProduct();
  },[])

  const handleDelete = (id) => {
    const res = axiosInstance.delete("/products/" + id);
    window.location.reload();
    
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Desciption</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products.map((userProduct) => (
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{userProduct.title}</TableCell>
              <TableCell>{userProduct.productDesc}</TableCell>
              <TableCell>{userProduct.price}</TableCell>
              <TableCell>
                <Link to={userProduct._id}><EditIcon/></Link>
                <Link to="" onClick={() => handleDelete(userProduct._id)}><DeleteIcon/></Link>
              </TableCell>
            </TableRow>
           ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}