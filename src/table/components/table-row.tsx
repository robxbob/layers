import type { ReactNode } from 'react';

export type TableRowProps = {
	children?: ReactNode;
};

export function TableRow({ children }: TableRowProps) {
	return <tr>{children}</tr>;
}
