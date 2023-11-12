import { CustomComponentProps } from '../customtypes';
import { useTable } from '../hooks';

export function TableEmpty<T = undefined>({ children, renderer: Renderer }: Omit<CustomComponentProps<T>, 'instance'>) {
  const table = useTable();
  const [headerGroup] = table.getHeaderGroups();
  if (!headerGroup) return null;

  const length = headerGroup.headers.reduce((acc, header) => acc + header.colSpan, 0);

  return Renderer ? (
    <Renderer>{children}</Renderer>
  ) : (
    <tr>
      <td
        colSpan={length}
        style={{
          textAlign: 'center',
          padding: '2rem',
          fontSize: '1.2rem',
        }}
      >
        <i>{children}</i>
      </td>
    </tr>
  );
}
