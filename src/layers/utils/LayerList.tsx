import { Fragment, type ReactNode } from 'react';
import type { Wrapper } from '@/utils/types/common';
import type { LayerState, LayerStateProps, MergeFn } from '../types/common';

const defaultMergeFn: MergeFn = (o, n) => (n === undefined ? o : n);
const wrapperMergeFn: MergeFn<Wrapper[]> = (o, n) => [...o, ...n];
const childrenMergeFn: MergeFn<ReactNode> = (o, n) => [
	<Fragment key={`merged-child-${crypto.randomUUID()}`}>{o}</Fragment>,
	<Fragment key={`merged-child-${crypto.randomUUID()}`}>{n}</Fragment>,
];

export class LayerNode<TProps extends LayerStateProps = LayerStateProps> {
	value: LayerState<TProps>;

	prev: LayerNode | null = null;
	next: LayerNode | null = null;

	constructor(layerNode: LayerNode<TProps>);
	constructor(state: LayerState<TProps>);
	constructor(stateOrNode: LayerState<TProps> | LayerNode<TProps>) {
		this.value =
			stateOrNode instanceof LayerNode ? stateOrNode.value : stateOrNode;
	}

	merge(layerNode: LayerNode<TProps>) {
		const mergedProps: LayerStateProps = {};
		const mergeFns = Object.assign(
			{
				outer: wrapperMergeFn,
				inner: wrapperMergeFn,
				children: childrenMergeFn,
			},
			layerNode.value.merge,
		);
		const propNames = new Set([
			...Object.keys(this.value.props ?? {}),
			...Object.keys(layerNode.value.props ?? {}),
			...Object.keys(layerNode.value.merge ?? {}),
		]).keys();

		propNames.forEach((key) => {
			const oldVal = this.value.props?.[key];
			const newVal = layerNode.value.props?.[key];
			const mergeFn =
				mergeFns[key] !== undefined ? mergeFns[key] : defaultMergeFn;
			mergedProps[key] = mergeFn(oldVal, newVal);
		});
		this.value.props = mergedProps as TProps;
		this.value.merge = layerNode.value.merge;
	}
}

export class LayerList<TProps extends LayerStateProps = LayerStateProps> {
	#head: LayerNode | null = null;
	#tail: LayerNode | null = null;
	#nodes: Map<string, LayerNode> = new Map();

	add(p: LayerState<TProps>) {
		const layerNode = new LayerNode(p);
		if (this.#head === null || this.#tail === null) {
			this.#head = layerNode;
			this.#tail = layerNode;
		} else {
			this.#tail.next = layerNode;
			this.#tail = layerNode;
		}
		this.#nodes.set(p.id, layerNode);
	}

	remove(id: string) {
		const layerNode = this.#nodes.get(id);
		if (!layerNode) return undefined;

		if (layerNode === this.#head) this.#head = layerNode.next;
		if (layerNode === this.#tail) this.#tail = layerNode.prev;
		if (layerNode.prev !== null) layerNode.prev.next = layerNode.next;
		if (layerNode.next !== null) layerNode.next.prev = layerNode.prev;

		this.#nodes.delete(id);
		return layerNode;
	}

	peek() {
		return this.#tail;
	}

	mergeAll() {
		if (this.#head === null) return undefined;

		const mergedLayerNode = new LayerNode({ id: this.#head.value.id });
		let curr: LayerNode | null = this.#head;
		while (curr) {
			mergedLayerNode.merge(curr);
			curr = curr.next;
		}
		return mergedLayerNode;
	}
}
