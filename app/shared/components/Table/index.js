import React from 'react';
import { TableTest } from './styles';

const TableCustom = ({ data, columns, isLoading }) => (
  <TableTest
    dataSource={data}
    columns={columns}
    loading={isLoading}
    pagination={false}
  />
);

export default TableCustom;
