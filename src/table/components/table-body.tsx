import type { ReactNode } from 'react';

export type TableBodyProps = {
	children?: ReactNode;
};

export function TableBody({ children }: TableBodyProps) {
	return <tbody>{children}</tbody>;
}
