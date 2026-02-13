import {
	type ReactNode,
	use,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { type StoreApi, useStore } from 'zustand';
import type { Any, Wrapper } from '@/utils/types/common';
import { LayersContext, type LayersStoreState } from '../components/layers';
import type { LayerProps, LayerTag } from '../types/common';

export function useLayer<TProps extends Record<string, Any>>({
	type,
	target,
	props,
}: Omit<LayerTag, 'id'> & { props: LayerProps<TProps> }) {
	const store = use(LayersContext) as StoreApi<LayersStoreState<TProps>> | null;
	if (!store) throw new Error('useLayer must be used within Layers component.');
	const id = useId();
	const addLayer = useStore(store, (state) => state.addLayer);

	// Initial Render
	const initialRender = useRef(true);
	useLayoutEffect(() => {
		console.log('adding layer', type, target, id);
		addLayer({ type, target, id, props });
	}, []);
	const mergedLayer = useStore(store, (state) =>
		state.getMergedLayer({ type, target, id }),
	);
	const shouldRender =
		!!mergedLayer &&
		(mergedLayer.props.active || mergedLayer.props.active === undefined);
	const {
		active,
		outer,
		inner,
		merge,
		children: mergedChildren,
		...mergedProps
	} = mergedLayer?.props ?? ({} as Record<string, Any>);

	// useLayoutEffect(() => {
	// 	if (!initialRender) {
	// 		// TODO: remove
	// 	}
	// }, [...Object.values(props)]);

	useLayoutEffect(() => {
		initialRender.current = false;
		console.log('done with:', type, target, id, shouldRender);
		return () => {
			console.log('removeing...', type, target, id, shouldRender);
		};
	}, []);

	return {
		shouldRender,
		Outer: ({ children }) => <>{children}</>,
		Inner: ({ children }) => <>{children}</>,
		mergedProps,
		mergedChildren,
	} as
		| {
				shouldRender: true;
				Outer: Wrapper;
				Inner: Wrapper;
				mergedProps: TProps;
				mergedChildren: ReactNode;
		  }
		| {
				shouldRender: false;
				Outer: undefined;
				Inner: undefined;
				mergedProps: undefined;
				mergedChildren: undefined;
		  };
}
