import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/use-layer';
import type { LayerComponentProps } from '@/layers/types/common';

export function TableCell({
	target,
	merge,
	...props
}: LayerComponentProps<ComponentPropsWithRef<'td'>>) {
	const { shouldRender, Outer, Inner, mergedProps, mergedChildren } = useLayer({
		type: 'table-cell',
		target,
		props: {
			merge: {
				children: (o, n) => {
					return n === undefined ? o : n;
				},
				...merge,
			},
			...props,
		},
	});

	return shouldRender ? (
		<Layers>
			<Outer>
				<td {...mergedProps}>
					<Inner>{mergedChildren}</Inner>
				</td>
			</Outer>
		</Layers>
	) : null;
}
