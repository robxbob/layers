import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/use-layer';
import type { LayerComponentProps } from '@/layers/types/common';

export function TableRow({
	target,
	...props
}: LayerComponentProps<ComponentPropsWithRef<'tr'>>) {
	const { shouldRender, Outer, Inner, mergedProps, mergedChildren } = useLayer({
		type: 'table-row',
		target,
		props,
	});

	return shouldRender ? (
		<Layers>
			<Outer>
				<tr {...mergedProps}>
					<Inner>{mergedChildren}</Inner>
				</tr>
			</Outer>
		</Layers>
	) : null;
}
