import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/useLayer';
import type { LayerProps } from '@/layers/types/common';

export function TableCell({
	target,
	merge,
	...props
}: LayerProps<ComponentPropsWithRef<'td'>>) {
	const { active, Outer, Inner } = useLayer({
		type: 'table-cell',
		target,
		merge,
		props,
	});

	return active ? (
		<Layers>
			<Outer>
				<td>
					<Inner>{props?.children}</Inner>
				</td>
			</Outer>
		</Layers>
	) : null;
}
