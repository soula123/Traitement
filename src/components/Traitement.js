import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./Traitement.css";
import { useEffect } from "react";
import {
  IconButton,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Checkbox,
  TextField,
  Autocomplete,
  Modal,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Traitement({ jsonData }) {
  const [open, setOpen] = React.useState(false);
  const [selectedTable, setSelectedTable] = React.useState("");
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [operators, setOperators] = React.useState([]);
  const [selectedOperator, setSelectedOperator] = React.useState("");

  // Function to get the column types for the selected table
  const getColumnTypes = (tableName) => {
    const tableColumns = jsonData[tableName];
    const columnTypes = {};
    tableColumns.forEach((column) => {
      columnTypes[column[0]] = column[1];
    });
    return columnTypes;
  };

  // Function to update operators based on the selected column
  const updateOperators = (selectedColumn) => {
    const columnTypes = getColumnTypes(selectedTable);
    const columnType = columnTypes[selectedColumn];
    let newOperators = [];

    switch (columnType) {
      case "VARCHAR2":
        newOperators = ["=", "<>", "LIKE", "NOT LIKE"];
        break;
      case "NUMBER":
        newOperators = ["=", "<>", ">", ">=", "<", "<=", "BETWEEN", "NOT BETWEEN"];
        break;
      case "DATE":
        newOperators = ["=", "<>", ">", ">=", "<", "<=", "BETWEEN", "NOT BETWEEN"];
        break;
      default:
        newOperators = ["=", "<>"];
    }

    setOperators(newOperators);
    setSelectedOperator(newOperators[0]);
  };

  // Function to handle changes in the table select dropdown
  const handleTableChange = (event) => {
    const newTable = event.target.value;
    setSelectedTable(newTable);
    setSelectedColumns([]);
    setSelectedFilters([]);
  };

  // Function to handle changes in the column select dropdown
  const handleColumnChange = (event) => {
    const newColumns = event.target.value;
    setSelectedColumns(newColumns);
    setSelectedFilters([]);
    setSelectedOperator("");
    updateOperators(newColumns[0]);
  };

  // Function to handle changes in the operator select dropdown
  const handleOperatorChange = (event) => {
    setSelectedOperator(event.target.value);
  };

  // Function to handle changes in the filter textfield
  const handleFilterChange = (event, index) => {
    const newFilters = [...selectedFilters];
    newFilters[index] = event.target.value;
    setSelectedFilters(newFilters);
  };

  // Function to add a new filter
  const addFilter = () => {
    setSelectedFilters([...selectedFilters, ""]);
  };

  // Function to remove a filter
  const removeFilter = (index) => {
    const newFilters = [...selectedFilters];
    newFilters.splice(index, 1);
    setSelectedFilters(newFilters);
  };
 // Function to handle submitting the form
const handleSubmit = () => {
  console.log("Selected Table: ", selectedTable);
  console.log("Selected Columns: ", selectedColumns);
  console.log("Selected Filters: ", selectedFilters);
  console.log("Selected Operator: ", selectedOperator);
  setOpen(false);
  };
  
  return (
  <>
  <Button variant="contained" onClick={() => setOpen(true)}>
  Open Modal
  </Button>
  

  
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Table</InputLabel>
              <Select
                value={selectedTable}
                label="Table"
                onChange={handleTableChange}
              >
                {Object.keys(jsonData).map((tableName, index) => (
                  <MenuItem key={index} value={tableName}>
                    {tableName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Columns</InputLabel>
              <Select
                multiple
                value={selectedColumns}
                label="Columns"
                onChange={handleColumnChange}
              >
                {selectedTable &&
                  jsonData[selectedTable].map((column, index) => (
                    <MenuItem key={index} value={column[0]}>
                      {column[0]}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {selectedColumns.map((column, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Column</InputLabel>
                    <Select
                      value={column}
                      label="Column"
                      disabled
                    >
                      <MenuItem value={column}>{column}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={selectedOperator}
                      label="Operator"
                      onChange={handleOperatorChange}
                    >
                      {operators.map((operator, index) => (
                        <MenuItem key={index} value={operator}>
                          {operator}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Filter"
                    value={selectedFilters[index]}
                    onChange={(event) => handleFilterChange(event, index)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeFilter(index)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={addFilter}>
                  Add Filter
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  </>
  
  );
  }