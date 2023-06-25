import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ColumnDef, PaginationComponent, PaginationState, Table } from 'unstyled-table';
import { Person, fetchData } from '../lib/makeData';

const ServersidePagination = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'firstName',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.lastName,
            id: 'lastName',
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: (props) => props.column.id,
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
              },
              {
                accessorKey: 'status',
                header: 'Status',
                footer: (props) => props.column.id,
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: (props) => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    ...pagination,
  };

  const dataQuery = useQuery(['data', fetchDataOptions], () => fetchData(fetchDataOptions), { keepPreviousData: true });

  const defaultData = React.useMemo(() => [], []);

  return (
    <Table
      columns={columns}
      data={dataQuery.data?.rows ?? defaultData}
      state={{ pagination }}
      manualPagination
      setPagination={setPagination}
      pageCount={dataQuery.data?.pageCount}
      renders={{
        paginationBar: ({ tableInstance }) => (
          <PaginationComponent
            tableInstance={tableInstance}
            btn={({ props, children }) => (
              <button {...props} style={{ color: 'red' }}>
                {children}
              </button>
            )}
          />
        ),
      }}
    />
  );
};

export default ServersidePagination;
