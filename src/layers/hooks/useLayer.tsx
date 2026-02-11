import { type ReactNode, use, useId, useLayoutEffect, useState } from 'react';
import { useStore } from 'zustand';
import type { Wrapper } from '@/utils/types/common';
import { LayersContext } from '../components/layers';
import type { LayerState, LayerStateProps } from '../types/common';
import type { LayerNode } from '../utils/LayerList';

export function useLayer<TProps extends LayerStateProps>({
	type,
	target,
	merge,
	props,
}: {
	type: string;
	target?: string;
} & Omit<LayerState<TProps>, 'id'>) {
	const id = useId();
	const store = use(LayersContext);
	if (!store) throw new Error('useLayer must be used within Layers component.');

	const isFirstLayer = useStore(store, (state) =>
		state.isFirstLayer({ type, target, id }),
	);

	const [mergedLayers, setMergedLayers] = useState<LayerNode | null>(null);
	const {
		active,
		inner,
		outer,
		children: mergedChildren,
		...mergedProps
	} = mergedLayers?.value.props ?? {};

	if (type === 'table') console.log(id, target, active, isFirstLayer);

	const addLayer = useStore(store, (state) => state.addLayer);
	const removeLayer = useStore(store, (state) => state.removeLayer);
	const mergeLayers = useStore(store, (state) => state.mergeLayers);

	useLayoutEffect(() => {
		addLayer({ type, target, id, props, merge });
		return () => {
			if (type === 'table-cell') removeLayer({ type, target, id });
		};
	}, [addLayer, removeLayer, type, target, id, props, merge]);

	useLayoutEffect(() => {
		if (isFirstLayer) {
			setMergedLayers(mergeLayers({ type, target }));
		} else {
			setMergedLayers(null);
		}
	}, [mergeLayers, isFirstLayer, type, target]);

	return {
		active: isFirstLayer && (active || active === undefined),
		Outer: ({ children }) => <>{children}</>,
		Inner: ({ children }) => <>{children}</>,
		mergedProps,
		mergedChildren,
	} as
		| {
				active: true;
				Outer: Wrapper;
				Inner: Wrapper;
				mergedProps: TProps;
				mergedChildren: ReactNode;
		  }
		| {
				active: false;
				Outer: undefined;
				Inner: undefined;
				mergedProps: undefined;
				mergedChildren: undefined;
		  };
}
