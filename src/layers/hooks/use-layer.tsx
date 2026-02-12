import {
	type ReactNode,
	use,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { useStore } from 'zustand';
import type { Any } from '@/utils/types/common';
import { LayersContext } from '../components/layers';
import type { LayerProps, LayerTag } from '../types/common';

export function useLayer<TProps extends Record<string, Any>>({
	type,
	target,
	props,
}: Omit<LayerTag, 'id'> & { props: LayerProps<TProps> }) {
	const store = use(LayersContext);
	if (!store) throw new Error('useLayer must be used within Layers component.');
	const initialRender = useRef(true);

	const id = useId();
	const ll: any = null;

	useLayoutEffect(() => {
		if (!initialRender) {
			ll.update();
		}
	}, [...Object.values(props)]);

	// return {
	// 	active: isFirstLayer && (active || active === undefined),
	// 	Outer: ({ children }) => <>{children}</>,
	// 	Inner: ({ children }) => <>{children}</>,
	// 	mergedProps,
	// 	mergedChildren,
	// } as
	// 	| {
	// 			active: true;
	// 			Outer: Wrapper;
	// 			Inner: Wrapper;
	// 			mergedProps: TProps;
	// 			mergedChildren: ReactNode;
	// 	  }
	// 	| {
	// 			active: false;
	// 			Outer: undefined;
	// 			Inner: undefined;
	// 			mergedProps: undefined;
	// 			mergedChildren: undefined;
	// 	  };
}
