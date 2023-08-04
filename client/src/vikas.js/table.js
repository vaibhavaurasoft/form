import React, { useState ,useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import api from "../api/api"
import { Link } from "react-router-dom";

import {
  MenuItem,
  IconButton,
  Stack,
  Typography,
  TablePagination,
} from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(50, 0, 48, 0.8)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    color: "white",
    "&:hover": {
      color: "rgba(50, 0, 48, 0.4)",
    },
  },
  "&:hover": {
    backgroundColor: "rgba(50, 0, 48, 0.3)",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function createData(name, steps, bank, entry, protein) {
  return { name, steps, bank, entry, protein };
}
const rows = [
  createData("1", 159, "HDFC", 24, "Action 1"),
  // createData("2", 237, "SBI", 37, "Action 2"),
  // createData("3", 262, "Axis", 24, "Action 3"),
  // createData("4", 305, "BOI", 67, "Action 4"),
  // createData("5", 356, "Kenra", 49, "Action 5"),
  // createData("6", 358, "Narmada ", 49, "Action 5"),
];
const Forms = () => {
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5);
    const [savedForms, setSavedForms] = useState([]);

    useEffect(() => {
      const fetchSavedForms = async () => {
        try {
          const response = await api.get("/bankformlayout");
          if (response.status === 200) {
            const data = response.data.data;
            setSavedForms(data);
          } else {
            console.error("Failed to fetch saved forms");
          }
        } catch (error) {
          console.error("Error fetching saved forms:", error);
        }
      };

      fetchSavedForms();
    }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const [open, setOpen] = useState(null);
  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <h3 className="demo">hello im here</h3>
        <Typography variant="h4" gutterBottom>
          Forms
        </Typography>
        <Link to="/add-bank-From">
          <Button variant="contained">New User</Button>
        </Link>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell align="right">Steps</StyledTableCell>
              <StyledTableCell align="right">Form Name</StyledTableCell>
              <StyledTableCell align="right">Total Entry</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.steps}</StyledTableCell>
                {/* {savedForms.map((layout) => (
                  <StyledTableCell align="right" key={layout._id}>
                    {layout.bankId}?(
                    <Link to={`/all-forms/${layout._id}`}>
                      {layout.bankId.bankname}
                    </Link>
                    ):("N/A")
                  </StyledTableCell>
                ))} */}
                {savedForms.map((layout) => (
                  <StyledTableCell key={layout._id}>
                    {/* <td>{layout.name}</td> */}
                    {layout.bankId ? (
                      <Link to={`/all-forms/${layout._id}`}>
                        {layout.bankId.bankname}
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="right">{row.entry}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleOpenMenu}
                  ></IconButton>
                  <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: {
                        p: 1,
                        width: 140,
                        "& .MuiMenuItem-root": {
                          px: 1,
                          typography: "body2",
                          borderRadius: 0.75,
                        },
                      },
                    }}
                  >
                    <MenuItem>Edit</MenuItem>
                    <MenuItem sx={{ color: "error.main" }}>Delete</MenuItem>
                  </Popover>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Forms;
