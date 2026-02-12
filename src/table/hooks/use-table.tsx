import {
	type ComponentProps,
	useCallback,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';
import { Layers as LayerMap } from '@/layers/components/layers';
import type { Any, Ctx, Data } from '@/utils/types/common';
import { BaseDataLayer } from '../components/base-data-layer';
import { Table } from '../components/table';
import { TableBody } from '../components/table-body';
import { TableCell } from '../components/table-cell';
import { TableRow } from '../components/table-row';
import type { TableComponents, TableLayer } from '../types/common';

type ExtractTableCtx<TTableLayer extends TableLayer<Any, Any>> = [
	TTableLayer,
] extends [TableLayer<Any, infer C>]
	? C
	: Ctx;

type ContainsRequiredField<T> = Partial<T> extends T ? false : true;

export function useTable<
	TData extends Data,
	TTableCtx extends ExtractTableCtx<NoInfer<TTableLayer>> & Ctx,
	TTableLayer extends TableLayer<TData, Any> = typeof BaseDataLayer<TData>,
>({
	data,
	tableCtx,
	Layers = [BaseDataLayer as TTableLayer],
}: {
	data?: TData[];
	Layers?: TTableLayer[];
} & (ContainsRequiredField<ExtractTableCtx<NoInfer<TTableLayer>>> extends true
	? { tableCtx: TTableCtx }
	: { tableCtx?: TTableCtx })): TableComponents {
	const SubTableComponents = useMemo(
		() => ({
			Body: TableBody,
			Row: TableRow,
			Cell: TableCell,
		}),
		[],
	);
	return useMemo(() => {
		const LayeredTable = (p: ComponentProps<typeof Table>) => {
			const TableComponents = Object.assign(Table, SubTableComponents);
			return (
				<LayerMap>
					{Layers?.map((Layer: Any, i) => {
						return (
							<Layer
								// biome-ignore lint/suspicious/noArrayIndexKey: Order will be maintained
								key={`table-layer-${i}`}
								Table={TableComponents}
								data={data}
								tableCtx={tableCtx}
							/>
						);
					})}
					<Table key="extensions" {...p} />
				</LayerMap>
			);
		};
		return Object.assign(LayeredTable, SubTableComponents);
	}, [Layers, tableCtx, SubTableComponents, data]);
}

function LayeredTable() {}
