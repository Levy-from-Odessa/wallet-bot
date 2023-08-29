import { IBaseModel } from "../../constants/general";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlgin: 'center' 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IProps<T> {
  cols: {name: string, value: string | ((item: T) => string ) }[];
  data: T[];
}

function UITable<T extends IBaseModel>(props: IProps<T>) {
  const {cols, data} = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} >
        <TableHead>
          <TableRow>
            {cols.map(({name}) => {
                return <StyledTableCell key={name}>{name}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((item) => {
          return (
          <StyledTableRow>
            {cols.map(({value, name}) => {
                return <StyledTableCell key={item.id +''+ name}>
                  {(typeof value === "string" ? item[value] : value(item))?.toString()}
                </StyledTableCell>;
            })}
          </StyledTableRow>)
        })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UITable;
