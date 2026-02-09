import { createContext, type ReactNode } from 'react';
import { createStore, type StoreApi } from 'zustand';
import type { LayerState } from '../types/common';
import { LayerList } from '../utils/LayerList';

type LayersStoreState = {
	layers: Map<string, LayerList>;
	addLayer: (p: { layerKey: string } & LayerState) => void;
	removeLayer: (p: { layerKey: string; id: string }) => void;
};

export const LayersContext = createContext<
	StoreApi<LayersStoreState> | undefined
>(undefined);

export function Layers({ children }: { children: ReactNode }) {
	const layersStore = createStore<LayersStoreState>()((set) => ({
		layers: new Map(),
		addLayer: ({ layerKey, ...layerState }) =>
			set((state) => {
				const layerList = state.layers.get(layerKey) ?? new LayerList();
				layerList.add(layerState);
				if (!state.layers.has(layerKey)) state.layers.set(layerKey, layerList);
				return {};
			}),
		removeLayer: ({ layerKey, id }) =>
			set((state) => {
				state.layers.get(layerKey)?.remove(id);
				return {};
			}),
	}));

	return <LayersContext value={layersStore}>{children}</LayersContext>;
}
