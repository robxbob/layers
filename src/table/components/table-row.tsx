import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/use-layer';
import type { LayerComponentProps } from '@/layers/types/common';

export function TableRow({
	target,
	merge,
	...props
}: LayerComponentProps<ComponentPropsWithRef<'tr'>>) {
	const { active, Outer, Inner, mergedProps, mergedChildren } = useLayer({
		type: 'table-row',
		target,
		merge,
		props,
	});

	return active ? (
		<Layers>
			<Outer>
				<tr {...mergedProps}>
					<Inner>{mergedChildren}</Inner>
				</tr>
			</Outer>
		</Layers>
	) : null;
}
