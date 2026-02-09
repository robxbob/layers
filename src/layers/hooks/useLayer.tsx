import { use, useId, useLayoutEffect } from 'react';
import { useStore } from 'zustand';
import type { Wrapper } from '@/utils/types/common';
import { LayersContext } from '../components/layers';
import type { LayerState, LayerStateProps } from '../types/common';

export function useLayer<TProps extends LayerStateProps>({
	type,
	target = '',
	merge,
	props,
}: {
	type: string;
	target?: string;
} & Omit<LayerState<TProps>, 'id'>) {
	const layerKey = `${type}-${target}`;
	const id = useId();
	const store = use(LayersContext);
	if (!store) throw new Error('useLayer must be used within Layers component.');
	const active = useStore(
		store,
		(state) => state.layers.get(layerKey)?.peek()?.value.id === id,
	);
	const addLayer = useStore(store, (state) => state.addLayer);
	const removeLayer = useStore(store, (state) => state.removeLayer);
	console.log(layerKey, id, active);

	useLayoutEffect(() => {
		addLayer({ layerKey, id, props, merge });
		return () => {
			removeLayer({ layerKey, id });
		};
	}, [addLayer, removeLayer, layerKey, id, props, merge]);

	return {
		active,
		Outer: ({ children }) => <>{children}</>,
		Inner: ({ children }) => <>{children}</>,
	} as
		| { active: true; Outer: Wrapper; Inner: Wrapper }
		| { active: false; Outer: undefined; Inner: undefined };
}
