import { GridColDef } from '@mui/x-data-grid';
import { ICurrency } from '../../types';
import Table from '../Table/Table';

interface IProps {
  rows: ICurrency[];
}

const columns: GridColDef[] = [
  {
    field: 'symbol',
    headerName: 'Name',
    width: 230,
  },
  {
    field: 'lastPrice',
    headerName: 'Last ',
    width: 250,
    align: 'right',
    headerAlign: 'right',
    valueFormatter({ value }) {
      return new Intl.NumberFormat('default', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      }).format(value);
    },
  },
  {
    field: 'dailyHigh',
    headerName: 'High',
    width: 320,
    align: 'right',
    headerAlign: 'right',
    valueFormatter({ value }) {
      return new Intl.NumberFormat('default', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      }).format(value);
    },
  },
  {
    field: 'dailyLow',
    headerName: 'Low',
    width: 320,
    align: 'right',
    headerAlign: 'right',
    valueFormatter({ value }) {
      return new Intl.NumberFormat('default', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      }).format(value);
    },
  },
];

const DetailsTable = ({ rows }: IProps) => {
  return <Table rows={rows} columns={columns} />;
};

export default DetailsTable;
