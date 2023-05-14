# Unstyled Table

An unstyled react table component built on top of @tanstack/react-table v8

## Installation

```bash
npm install --save unstyled-table
#or
yarn add unstyled-table
#or
pnpm add unstyled-table
```

## Get started

```javascript
//react component
import { useState } from 'react';
import { Table } from 'unstyled-table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

export default function YourTable() {
  const [data, setData] = useState([
    { name: 'Touha', email: 'touha@example.com' },
    { name: 'Sadman', email: 'sadman@example.com' },
    { name: 'Otaku Dev', email: 'otakudev@example.com' },
  ]);

  return <Table columns={columns} data={data} />;
}
```

## Customization

```javascript
import { useState } from 'react';
import { Table } from 'unstyled-table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

export default function YourTable() {
  const [data, setData] = useState([
    { name: 'Touha', email: 'touha@example.com' },
    { name: 'Sadman', email: 'sadman@example.com' },
    { name: 'Otaku Dev', email: 'otakudev@example.com' },
  ]);

  return (
    <Table
      columns={columns}
      data={data}
      renders={{
        table: ({ children }) => (
          <div className="table-wrapper">
            <table className="table-class">{children}</table>
          </div>
        ),
      }}
    />
  );
}
```
