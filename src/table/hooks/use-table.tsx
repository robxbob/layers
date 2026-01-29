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

export function useTable<
	TData extends Data,
	TTableCtx extends ExtractTableCtx<NoInfer<TTableLayer>> & Ctx,
	TTableLayer extends TableLayer<TData, Any> = typeof BaseDataLayer,
>({
	data,
	tableCtx,
	Layers = [BaseDataLayer as TTableLayer],
}: {
	data?: TData[];
	tableCtx?: TTableCtx;
	Layers?: TTableLayer[];
}): TableComponents {
	const SubTableComponents = {
		Body: TableBody,
		Row: TableRow,
		Cell: TableCell,
	};
	const LayeredTable = () => {
		const TableComponents = Object.assign(Table, SubTableComponents);
		return (
			<>
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
			</>
		);
	};

	return Object.assign(LayeredTable, SubTableComponents);
}
