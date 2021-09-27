import React from 'react'
import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const BasicTable = ({ rows, heads }) => {
  return (
    <TableContainer>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {heads.map(head => (
              <TableCell
                style={{ textTransform: 'uppercase' }}
                key={head}
                align='center'
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.rater}>
              <TableCell align='center'>{row.rater}</TableCell>
              <TableCell align='center'>{row.amount}</TableCell>
              <TableCell align='center'>{row.average}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

BasicTable.propTypes = {
  rows: PropTypes.array,
  heads: PropTypes.array
}

export default BasicTable
