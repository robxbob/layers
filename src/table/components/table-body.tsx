import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/use-layer';
import type { LayerComponentProps } from '@/layers/types/common';

export function TableBody({
	target,
	...props
}: LayerComponentProps<ComponentPropsWithRef<'tbody'>>) {
	const { shouldRender, Outer, Inner, mergedProps, mergedChildren } = useLayer({
		type: 'table-body',
		target,
		props,
	});

	return shouldRender ? (
		<Layers>
			<Outer>
				<tbody {...mergedProps}>
					<Inner>{mergedChildren}</Inner>
				</tbody>
			</Outer>
		</Layers>
	) : null;
}
