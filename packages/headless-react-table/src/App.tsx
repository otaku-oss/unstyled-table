import { useState } from 'react';
import { PaginationComponent, Table } from './lib';
import { makeData, type Person } from './lib/makeData';
import type { ColumnDef } from '@tanstack/react-table';

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
                            // Since rows are flattened by default,
                            // we can use the row.depth property
                            // and paddingLeft to visually indicate the depth
                            // of the row
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
];

function App() {
    const [data] = useState(() => makeData(40));
    return (
        <main>
            <Table
                columns={columns}
                data={data}
                renders={{
                    table: ({ children }) => (
                        <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                            <caption>Caption</caption>
                            {children}
                        </table>
                    ),
                    headerRow: ({ children }) => <tr style={{ border: '1px solid black' }}>{children}</tr>,
                    headerCell: ({ children, props }) => (
                        <th {...props} style={{ border: '1px solid black' }}>
                            {children}
                        </th>
                    ),
                    bodyCell: ({ children, props }) => (
                        <td {...props} style={{ border: '1px solid black' }}>
                            {children}
                        </td>
                    ),
                    filterInput: ({ props }) => <input {...props} style={{ background: 'red', color: 'white' }} />,
                }}
            ></Table>
        </main>
    );
}

export default App;
