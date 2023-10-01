import { GridColDef } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import { ICurrency } from '../../types';
import Table from '../Table/Table';

interface IProps {
  rows: ICurrency[];
}

const columns: GridColDef[] = [
  {
    field: 'symbol',
    headerName: 'Name',
    width: 120,
    renderCell({ value }) {
      const id = value.toLowerCase();
      return <Link href={`/details/${id}`}>{value}</Link>;
    },
  },
  {
    field: 'lastPrice',
    headerName: 'Last ',
    width: 200,
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
    field: 'dailyChange',
    headerName: 'Change',
    width: 200,
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
    field: 'dailyChangePercentage',
    headerName: 'Change Percentage',
    width: 220,
    align: 'right',
    headerAlign: 'right',
    valueFormatter({ value }) {
      return new Intl.NumberFormat('default', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      }).format(value);
    },
  },
  {
    field: 'dailyHigh',
    headerName: 'High',
    width: 200,
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
    width: 200,
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

const HighlightTable = ({ rows }: IProps) => {
  return <Table rows={rows} columns={columns} />;
};

export default HighlightTable;
