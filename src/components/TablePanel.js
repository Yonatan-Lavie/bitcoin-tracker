import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';

const TablePanel = ({ data }) => {
  if (!data) {
    return;
  }
  const attr = Object.keys(data[0]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {attr.map((item) => (
              <TableCell key={item + '-tableCell'}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow>
              {attr.map((name) => (
                <TableCell>{item[name]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePanel;
