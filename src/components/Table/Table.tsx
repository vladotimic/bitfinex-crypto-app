import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { styled } from '@mui/material';

const CustomTable = styled(DataGrid)(() => ({
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '1rem',
    fontWeight: 700,
  },
}));

const Table = (props: DataGridProps) => {
  return (
    <CustomTable
      {...props}
      disableRowSelectionOnClick
      hideFooter
      hideFooterPagination
    />
  );
};

export default Table;
