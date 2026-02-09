import type { Data } from '@/utils/types/common';
import type { TableLayerProps } from '../types/common';

export function BaseDataLayer<TData extends Data>({
	Table,
	tableCtx,
	data,
}: TableLayerProps<TData, { columnOrder: (keyof TData | (string & {}))[] }>) {
	return (
		<Table>
			<Table.Body target="base">
				{data?.map((d, i) => {
					const target = d.id ?? i;
					return (
						<Table.Row key={`table-row-${target}`} target={target}>
							{tableCtx.columnOrder.map((column) => (
								<Table.Cell
									key={`table-cell-${String(column)}`}
									target={String(column)}
								>
									{d[column]}
								</Table.Cell>
							))}
							<Table.Cell target="first">Override</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
}
