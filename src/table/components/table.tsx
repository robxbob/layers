import type { ReactNode } from 'react';

export type TableProps = {
	children?: ReactNode;
};

export function Table({ children }: TableProps) {
	return <table>{children}</table>;
}
