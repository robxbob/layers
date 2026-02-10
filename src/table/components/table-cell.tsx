import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/useLayer';
import type { LayerComponentProps } from '@/layers/types/common';

export function TableCell({
	target,
	merge = {
		children: (o, n) => {
			console.log(o, n);
			return n === undefined ? o : n;
		},
	},
	...props
}: LayerComponentProps<ComponentPropsWithRef<'td'>>) {
	const { active, Outer, Inner, mergedProps, mergedChildren } = useLayer({
		type: 'table-cell',
		target,
		merge,
		props,
	});

	return active ? (
		<Layers>
			<Outer>
				<td {...mergedProps}>
					<Inner>{mergedChildren}</Inner>
				</td>
			</Outer>
		</Layers>
	) : null;
}
