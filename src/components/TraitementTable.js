import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Traitement from './Traitement';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState,useEffect } from 'react';
import jsonData1 from "../Schema.json"
import MyModal from './Traitement';
import "./TraitementTable.css"
const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  const columns= [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];




  /* const handleTableDropdownChange = async (event) => {
    const selectedTableName = event.target.value;
    const tableData = jsonData[selectedTableName];
    setSelectedTable(tableData);
  };
*/
const TraitementTable = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(JSON.parse(event.target.value));
  };

  {/* const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };
  */}
  {/* const tableOptions = selectedFile
    ? Object.keys(selectedFile).map((tableName) => (
        <option  key={tableName} value={tableName}>
          {tableName}
        </option>
      ))
    : null; */}
  const fileOptions = (
    <>
      <option disabled selected>
        -- Select a Treatement --
      </option>
      <option value={JSON.stringify(jsonData1)}>Reporting 01</option>
    </>
  );


  return (
    <>
    <div className='box'>
      <select onChange={handleFileChange}>
        {fileOptions}
      </select>
      </div>
      <Traitement jsonData={selectedFile ? selectedFile : []}/>
      <DataGrid rows={rows} columns={columns}/>
    </>
  );
};
  export default TraitementTable;