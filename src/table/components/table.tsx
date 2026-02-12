import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/use-layer';
import type { LayerComponentProps } from '@/layers/types/common';

export function Table({
	target,
	merge,
	...props
}: LayerComponentProps<ComponentPropsWithRef<'table'>>) {
	const { active, Outer, Inner, mergedProps, mergedChildren } = useLayer({
		type: 'table',
		target,
		merge,
		props,
	});

	return active ? (
		<Layers>
			<Outer>
				<table {...mergedProps}>
					<Inner>{mergedChildren}</Inner>
				</table>
			</Outer>
		</Layers>
	) : null;
}
