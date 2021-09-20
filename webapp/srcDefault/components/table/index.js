import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

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
