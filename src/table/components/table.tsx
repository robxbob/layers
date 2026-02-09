import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';

export function Table({ children, ...props }: ComponentPropsWithRef<'table'>) {
	return (
		<table {...props}>
			<Layers>{children}</Layers>
		</table>
	);
}
