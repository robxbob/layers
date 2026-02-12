import type { ReactNode } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { cn } from '@/utils/functions/cn';
import type { Any, Wrapper } from '@/utils/types/common';
import type { LayerProps, MergeFn } from '../types/common';

const defaultMergeFn: MergeFn = (o, n) => (n === undefined ? o : n);
const mergeMergeFn: MergeFn = (o, n) => ({ ...o, ...n });
const activeMergeFn: MergeFn = (o, n) => (o ?? true) && (n ?? true);
const wrapperMergeFn: MergeFn<Wrapper[]> = (o, n) => [...o, ...n];
const childrenMergeFn: MergeFn<ReactNode> = (o, n) =>
	o && n
		? [
				<Fragment key={`merged-child-${crypto.randomUUID()}`}>{o}</Fragment>,
				<Fragment key={`merged-child-${crypto.randomUUID()}`}>{n}</Fragment>,
			]
		: !o
			? n
			: o;
const classNameMergeFn: MergeFn<string> = cn;

export class LayerNode<TProps extends Record<string, Any>> {
	#id: string;
	#props: LayerProps<TProps>;
	prev: LayerNode<TProps> | null = null;
	next: LayerNode<TProps> | null = null;

	constructor({ id, props }: { id: string; props: LayerProps<TProps> }) {
		this.#id = id;
		this.#props = props; // To satisfy TS error: '#props' has no initializer
		this.update(props);
	}

	update(props: LayerProps<TProps>) {
		this.#props = props;
		this.#props.merge = {
			active: activeMergeFn,
			outer: wrapperMergeFn,
			inner: wrapperMergeFn,
			children: childrenMergeFn,
			className: classNameMergeFn,
			...props.merge,
		} as LayerProps<TProps>['merge'];
	}

	merge(layerNode: LayerNode<TProps>) {
		const mergedProps: Record<string, Any> = {};
		const mergeFns = {
			...this.#props.merge,
			...layerNode.#props.merge,
		};
		const propNames = new Set([
			...Object.keys(this.#props),
			...Object.keys(layerNode.#props),
			...Object.keys(mergeFns),
		]).keys();

		propNames.forEach((key) => {
			const oldVal = this.#props?.[key];
			const newVal = layerNode.#props?.[key];
			const mergeFn =
				key === 'merge'
					? mergeMergeFn
					: mergeFns[key] !== undefined
						? mergeFns[key]
						: defaultMergeFn;
			mergedProps[key] = mergeFn(oldVal, newVal);
		});

		return new LayerNode({ id: this.#id, props: mergedProps });
	}

	mergeToEnd() {
		let mergedLayerNode = new LayerNode({ id: this.#id, props: {} });
		let curr: LayerNode<TProps> | null = this;
		while (curr) {
			mergedLayerNode = mergedLayerNode.merge(curr);
			curr = curr.next;
		}
		return mergedLayerNode;
	}
}
