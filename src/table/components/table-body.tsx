import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/useLayer';
import type { LayerComponentProps } from '@/layers/types/common';

export function TableBody({
	target,
	merge,
	...props
}: LayerComponentProps<ComponentPropsWithRef<'tbody'>>) {
	const { active, Outer, Inner, mergedProps, mergedChildren } = useLayer({
		type: 'table-body',
		target,
		merge,
		props,
	});

	return active ? (
		<Layers>
			<Outer>
				<tbody {...mergedProps}>
					<Inner>{mergedChildren}</Inner>
				</tbody>
			</Outer>
		</Layers>
	) : null;
}
