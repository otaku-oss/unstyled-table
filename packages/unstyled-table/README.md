# Unstyled Table

An unstyled react table component built on top of @tanstack/react-table v8. ([Read Documentation](https://unstyled-table.vercel.app/))

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
import { UnstyledTable } from 'unstyled-table';

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
    <UnstyledTable
      columns={columns}
      data={data}
      components={{
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

[Read the documentation](https://unstyled-table.vercel.app/) For in depth guide.

# Roadmap

- [ ] Virtualized rows
- [ ] Virtualized rows with infinite scroll
