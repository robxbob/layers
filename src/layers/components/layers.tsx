import { createContext, type ReactNode, useRef } from 'react';
import { createStore, type StoreApi } from 'zustand';
import type { Any } from '@/utils/types/common';
import type { LayerProps, LayerTag } from '../types/common';
import { LayerList } from '../utils/layer-list';
import type { LayerNode } from '../utils/layer-node';

export type LayersStoreState<
	TProps extends Record<string, Any> = Record<string, Any>,
> = {
	layerMap: Map<LayerTag['type'], Map<LayerTag['target'], LayerList<TProps>>>;
	addLayer: (p: LayerTag & { props: LayerProps<TProps> }) => void;
	removeLayer: (p: { id: string } & LayerTag) => void;
	getMergedLayer: (p: LayerTag) => LayerNode<TProps> | null;
};

export const LayersContext = createContext<StoreApi<LayersStoreState> | null>(
	null,
);

export function Layers({ children }: { children: ReactNode }) {
	const layerStore = useRef<StoreApi<LayersStoreState> | null>(null);
	if (layerStore.current === null) {
		layerStore.current = createStore<LayersStoreState>()((set, get) => ({
			layerMap: new Map(),
			addLayer: ({ type, target, id, props }) =>
				set((state) => {
					// Maintains a working map of type based layerLists
					const layers =
						state.layerMap.get(type) ??
						new Map<LayerTag['target'], LayerList<Record<string, Any>>>();
					if (!state.layerMap.has(type)) state.layerMap.set(type, layers);

					// If new layer is a default layer and there exists a non-default
					// layer, the new layer will be added to all non-default layer
					// list; otherwise, add the new layer to the correspondant
					// layerlist.
					if (!target && layers.keys().some((t) => t !== target)) {
						layers.entries().forEach(([layerTarget, layerList]) => {
							if (layerTarget !== target) {
								layerList.add({ id, props });
							}
						});
					} else {
						// Maintains a working layerList
						const layerList = layers.get(target) ?? new LayerList();
						if (!layers.has(target)) layers.set(target, layerList);

						layerList.add({ id, props });
					}
					return {};
				}),
			removeLayer: ({ type, target, id }) =>
				set((state) => {
					type;
					target;
					id;
					// if (!target) {
					// 	const layerMap = state.layers.get(type);
					// 	layerMap?.entries()?.forEach(([layerTarget, layerList]) => {
					// 		layerList.remove(id);
					// 		if (!layerList.first()) layerMap.delete(layerTarget);
					// 	});
					// } else {
					// 	state.layers.get(type)?.get(target)?.remove(id);
					// }
					return {};
				}),
			getMergedLayer: ({ type, target, id }: LayerTag) => {
				const mergedLayer =
					get().layerMap.get(type)?.get(target)?.getMergedLayer() ?? null;
				return mergedLayer?.id !== id ? null : mergedLayer;
			},
		}));
	}

	return <LayersContext value={layerStore.current}>{children}</LayersContext>;
}
