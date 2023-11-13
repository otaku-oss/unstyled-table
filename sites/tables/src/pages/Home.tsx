import { useState } from 'react';
import { Table, type ColumnDef } from 'unstyled-table';
import { makeData, type Person } from '../lib/makeData';
import { HeaderCell } from '../components/header-cell';

const columns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            {getValue<string>()}
          </div>
        ),
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
            meta: { filter: 'range' },
          },

          {
            accessorKey: 'active',
            header: 'Active',
            footer: (props) => props.column.id,
            meta: { filter: 'boolean' },
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
            meta: { filter: 'select', options: ['relationship', 'complicated', 'single'] },
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
];

function HomePage() {
  const [data] = useState(() => makeData(35));
  return (
    <div style={{ display: 'grid', placeItems: 'center', padding: '20px' }}>
      <Table columns={columns} data={data} components={{ headerCell: HeaderCell }}></Table>
    </div>
  );
}

export default HomePage;
