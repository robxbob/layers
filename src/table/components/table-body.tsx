import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/useLayer';
import type { LayerProps } from '@/layers/types/common';

export function TableBody({
	target,
	merge,
	...props
}: LayerProps<ComponentPropsWithRef<'tbody'>>) {
	const { active, Outer, Inner } = useLayer({
		type: 'table-body',
		target,
		merge,
		props,
	});

	return active ? (
		<Layers>
			<Outer>
				<tbody>
					<Inner>{props?.children}</Inner>
				</tbody>
			</Outer>
		</Layers>
	) : null;
}
