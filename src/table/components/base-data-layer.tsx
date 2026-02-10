import type { Data } from '@/utils/types/common';
import type { TableLayerProps } from '../types/common';

export function BaseDataLayer<TData extends Data>({
	Table,
	data,
	tableCtx: { columns, columnOrder = columns },
}: TableLayerProps<
	TData,
	{
		columns: (keyof TData | (string & {}))[];
		columnOrder?: (keyof TData | (string & {}))[];
	}
>) {
	return (
		<Table target="base">
			<Table.Body target="base">
				{data?.map((d, i) => {
					const target = `${d.id ?? i}`;
					return (
						<Table.Row key={`table-row-${target}`} target={target}>
							{columnOrder.map((column) => (
								<Table.Cell
									key={`table-cell-order-${String(column)}`}
									target={String(column)}
								>
									{d[column]}
								</Table.Cell>
							))}
							{columns
								.filter((column) => !columnOrder.includes(column))
								.map((column) => (
									<Table.Cell
										key={`table-cell-column-${String(column)}`}
										target={String(column)}
										active={false}
									/>
								))}
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
}
