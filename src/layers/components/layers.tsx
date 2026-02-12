import { createContext, type ReactNode, useRef, useState } from 'react';
import { createStore, type StoreApi } from 'zustand';
import type { Any } from '@/utils/types/common';
import type { LayerState, LayerTag } from '../types/common';
import { LayerList, type LayerNode } from '../utils/layer-list';

type LayersStoreState<
	TProps extends Record<string, Any> = Record<string, Any>,
> = {
	layers: Map<LayerTag['type'], Map<LayerTag['target'], LayerList<TProps>>>;
	addLayer: (p: LayerTag & LayerState) => void;
	removeLayer: (p: { id: string } & LayerTag) => void;
	mergeLayers: (p: LayerTag) => LayerNode | null;
	isFirstLayer: (p: LayerTag & { id: string }) => boolean;
};

export const LayersContext = createContext<StoreApi<LayersStoreState> | null>(
	null,
);

export function Layers({ children }: { children: ReactNode }) {
	const layerStore = useRef<StoreApi<LayersStoreState> | null>(null);
	if (layerStore.current === null) {
		layerStore.current = createStore<LayersStoreState>()((set, get) => ({
			layers: new Map(),
			addLayer: ({ type, target, ...layerState }) =>
				set((state) => {
					const layerMap = state.layers.get(type) ?? new Map();
					if (!state.layers.has(type)) state.layers.set(type, layerMap);

					if (
						target !== '' ||
						layerMap.size === 0 ||
						(layerMap.size === 1 && layerMap.has(''))
					) {
						const layerList = layerMap.get(target) ?? new LayerList();
						if (!state.layers.has(target)) layerMap.set(target, layerList);
						layerList.add(layerState);
					} else {
						layerMap.entries().forEach(([layerTarget, layerList]) => {
							if (layerTarget !== '') {
								layerList.add(layerState);
							}
						});
					}

					return {};
				}),
			removeLayer: ({ type, target, id }) =>
				set((state) => {
					if (!target) {
						const layerMap = state.layers.get(type);
						layerMap?.entries()?.forEach(([layerTarget, layerList]) => {
							layerList.remove(id);
							if (!layerList.first()) layerMap.delete(layerTarget);
						});
					} else {
						state.layers.get(type)?.get(target)?.remove(id);
					}
					return {};
				}),
			mergeLayers: ({ type, target }) => {
				if (target) {
					const layerMap = get().layers.get(type);
					if (!layerMap) return null;

					const mergedDefaultLayer = layerMap.get('')?.mergeAll();
					let mergedLayer = layerMap.get(target)?.first();

					if (!mergedLayer) return null;

					if (mergedDefaultLayer) {
						mergedDefaultLayer.next = mergedLayer;
						mergedLayer = mergedDefaultLayer;
					}
					return mergedLayer.mergeAll();
				}
				return null;
			},
			isFirstLayer: ({ type, target, id }) => {
				if (!target) return false;
				const firstLayer = get().layers.get(type)?.get(target)?.first() ?? null;
				return firstLayer === null || firstLayer?.value?.id === id;
			},
		}));
	}

	return <LayersContext value={layerStore.current}>{children}</LayersContext>;
}
