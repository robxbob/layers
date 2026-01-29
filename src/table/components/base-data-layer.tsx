import type { Data } from '@/utils/types/common';
import type { TableLayerProps } from '../types/common';

export function BaseDataLayer<TData extends Data>({
	Table,
	tableCtx,
	data,
}: TableLayerProps<TData, { columnOrder: string[] & (keyof TData)[] }>) {
	return (
		<Table>
			<Table.Body>
				{data?.map((d, i) => (
					<Table.Row key={`table-row-${d.id ?? i}`}>
						{tableCtx.columnOrder.map((column) => (
							<Table.Cell key={`table-cell-${column}`}>{d[column]}</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}
