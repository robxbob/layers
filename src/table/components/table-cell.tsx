import type { ReactNode } from 'react';

export type TableCellProps = {
	children?: ReactNode;
};

export function TableCell({ children }: TableCellProps) {
	return <td>{children}</td>;
}
