import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ColumnDef, PaginationState, SortingState, UnstyledTable } from 'unstyled-table';
import { Person, fetchData } from '../lib/makeData';

const FullyControlled = () => {
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
            meta: { filter: '' },
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
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const fetchDataOptions = {
    ...pagination,
  };

  const dataQuery = useQuery(
    ['data', fetchDataOptions, sorting],
    () => fetchData(fetchDataOptions),
    {
      keepPreviousData: true,
    }
  );

  const defaultData = React.useMemo(() => [], []);

  return (
    <>
      <UnstyledTable
        columns={columns}
        data={dataQuery.data?.rows ?? defaultData}
        state={{ pagination, sorting }}
        manualPagination
        manualSorting
        setPagination={setPagination}
        setSorting={setSorting}
        pageCount={dataQuery.data?.pageCount}
      />
      {dataQuery.isLoading ? 'loading...' : ''}
    </>
  );
};

export default FullyControlled;
