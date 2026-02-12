import type { Any } from '@/utils/types/common';
import type { LayerProps, LayerTag } from '../types/common';
import { LayerNode } from './layer-node';

export class LayerList<TProps extends Record<string, Any>> {
	#head: LayerNode<TProps> | null = null;
	#tail: LayerNode<TProps> | null = null;
	#nodes: Map<LayerTag['id'], LayerNode<TProps>> = new Map();
	#length: number = 0;
	#mergedLayers: LayerNode<TProps> | null = null;

	add({ id, props }: { id: string; props: LayerProps<TProps> }) {
		const layerNode = new LayerNode({ id, props });
		if (this.#head === null || this.#tail === null) {
			this.#head = layerNode;
			this.#tail = layerNode;
		} else {
			this.#tail.next = layerNode;
			this.#tail = layerNode;
		}

		this.#mergedLayers = null;
		this.#nodes.set(id, layerNode);
		this.#length++;
	}

	update({ id, props }: { id: string; props: LayerProps<TProps> }) {
		this.#nodes.get(id)?.update(props);
	}

	remove(id: string) {
		const layerNode = this.#nodes.get(id);
		if (!layerNode) return null;

		if (layerNode === this.#head) this.#head = layerNode.next;
		if (layerNode === this.#tail) this.#tail = layerNode.prev;
		if (layerNode.prev !== null) layerNode.prev.next = layerNode.next;
		if (layerNode.next !== null) layerNode.next.prev = layerNode.prev;

		this.#mergedLayers = null;
		this.#nodes.delete(id);
		this.#length--;
		return layerNode;
	}

	mergeLayers() {
		if (this.#mergedLayers || !this.#head) return this.#mergedLayers;
		return this.#head.mergeToEnd();
	}

	get first() {
		return this.#head;
	}

	get last() {
		return this.#tail;
	}

	get length() {
		return this.#length;
	}
}
