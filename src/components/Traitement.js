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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [valueValue, setValueValue] = useState("");
  const [value, setValue] = useState("");
  const [columnValue, setColumnValue] = useState("");
  const [operatorValue, setOperatorValue] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [operatorOptions, setOperatorOptions] = useState([
    { value: "=", label: "=" },
    { value: "!=", label: "!=" },
    { value: "LIKE", label: "LIKE" },
    { value: "NOT LIKE", label: "NOT LIKE" },
  ]);

  const [selectedOperator, setSelectedOperator] = useState(null);
  
 
    useEffect(() => {
      // Déterminez le type de la colonne sélectionnée
      const selectedColumnType = selectedColumn
        ? jsonData[selectedTable].find(
            (column) => column[0] === selectedColumn
          )[1]
        : null;
      console.log('selectedColumnType:', selectedColumnType);
      
      // Afficher les opérateurs de filtrage appropriés pour ce type de colonne
      if (selectedColumnType === "VARCHAR2") {
        setOperatorOptions([
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
          { value: "LIKE", label: "LIKE" },
          { value: "NOT LIKE", label: "NOT LIKE" },
        ]);
      } else if (selectedColumnType === "NUMBER") {
        setOperatorOptions([
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
          { value: "<", label: "<" },
          { value: "<=", label: "<=" },
          { value: ">", label: ">" },
          { value: ">=", label: ">=" },
        ]);
      } else if (selectedColumnType === "DATE") {
        setOperatorOptions([
          { value: "=", label: "=" },
          { value: "!=", label: "!=" },
          { value: "<", label: "<" },
          { value: "<=", label: "<=" },
          { value: ">", label: ">" },
          { value: ">=", label: ">=" },
          { value: "BETWEEN", label: "BETWEEN" },
        ]);
      }
    }, [selectedColumn]);
    
    
    const handleOperatorSelect = (event) => {
      console.log('selectedOperator:', event.target.value);
      setSelectedOperator(event.target.value);
    };
  const handleClearClick = (index) => {
    const newFilterList = [...filterList];
    newFilterList.splice(index, 1);
    setFilterList(newFilterList);
  };

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const keys = Object.keys(jsonData);


  const handleAddClick = () => {
    const newFilter = (
      <Box sx={{ flexGrow: 1, marginTop: 1 }}>
         <Grid container spacing={1}>
          <Grid item xs={4}>          
        {/*pour les colonnes(à filtrer) de la table choisis */}
          <Autocomplete
                id="selected-column-select"
                options={jsonData[selectedTable].map((column) => column[0])}
                getOptionLabel={(option) => option}
                sx={{ width: '100%', marginTop: 5, marginBottom: 4 }}
                renderInput={(params) => (
                  <TextField {...params} label="Selected columns" />
                )}
                onChange={(e)=>{
                   
                  
                  setSelectedColumn(e.target.innerText);
                  
                }}
              />
            </Grid>
        {/* pour la liste des opérateurs */}
        <Grid item xs={4}>
          
                <FormControl sx={{ marginTop: 5, marginBottom: 4 }}>
                  <InputLabel id="operator-select-label">Operator</InputLabel>
                  <Select
                    labelId="operator-select-label"
                    id="operator-select"
                    value={selectedOperator || ''}
                    onChange={handleOperatorSelect}
                  >
                    {operatorOptions.map(({value , label})=>{
                      <MenuItem key={value} value={label} >
                      {label}
                      </MenuItem>
                    })}
                  </Select>
                </FormControl>
            </Grid>

          
          <Grid item xs={4}>
            <FormControl style={{width:'90px', alignItems:'center'}} variant="standard">
              <TextField id="standard-basic" label="Value" variant="standard" />
            </FormControl>
            </Grid>
          <Grid>
            <IconButton onClick={() => handleClearClick(filterList.length)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          </Grid>
          
          </Box>
    );

    setFilterList([...filterList, newFilter]);
    setColumnValue("");
    setOperatorValue("");
    setValueValue("");
  };

  const handleTableSelect = (event, value) => {
    setSelectedTable(value);
    setSelectedColumns([]);
  };

  const handleColumnSelect = (event, value) => {
    setSelectedColumns(value);
  };


  return (
    <div>
      <Button onClick={handleOpen} style={{ left: "90%" }}>
        Add Table
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} style={{ left: "90%" }}>
            <CloseIcon />
          </IconButton>

          <Form.Label className="labelName" htmlFor="basic-url">
            Customize your table
          </Form.Label>
          <Autocomplete
            onChange={handleTableSelect}
            options={keys}
            id="combo-box-demo"
            sx={{ width: 300, marginTop: 5, marginBottom: 4 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a table" />
            )}
            value={selectedTable}
          />


          {selectedTable && (
            <Autocomplete
              multiple
              id="column-select"
              options={jsonData[selectedTable].map((column) => column[0])}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Select a column" />
              )}
              sx={{ width: 300, marginTop: 5, marginBottom: 4 }}
              onChange={handleColumnSelect}
            />
          )}

          
          
         {selectedColumns && 
            <div>
                      {filterList.map((filter, index) => (
                        <div key={index}>{filter}</div>
                      ))}
            <Button onClick={handleAddClick}>Add Filter</Button>
            </div>
            }
            
            
            
          <Button>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}
