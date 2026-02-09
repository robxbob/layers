import type { ComponentPropsWithRef } from 'react';
import { Layers } from '@/layers/components/layers';
import { useLayer } from '@/layers/hooks/useLayer';
import type { LayerProps } from '@/layers/types/common';

export function TableRow({
	target,
	merge,
	...props
}: LayerProps<ComponentPropsWithRef<'tr'>>) {
	const { active, Outer, Inner } = useLayer({
		type: 'table-row',
		target,
		merge,
		props,
	});

	return active ? (
		<Layers>
			<Outer>
				<tr>
					<Inner>{props?.children}</Inner>
				</tr>
			</Outer>
		</Layers>
	) : null;
}
