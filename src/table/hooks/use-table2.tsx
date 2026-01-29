/** biome-ignore-all lint/suspicious/noExplicitAny: test */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: test  */
import { Table } from '../components/table';
import { TableBody } from '../components/table-body';
import { TableCell } from '../components/table-cell';
import { TableRow } from '../components/table-row';

export const SubTableComponents = {
	Body: TableBody,
	Row: TableRow,
	Cell: TableCell,
};

export function BaseDataLayer2({ Table, tableCtx, data }: any) {
	return (
		<Table>
			<Table.Body>
				{data?.map((d: any, i: any) => (
					<Table.Row key={`table-row-${d.id ?? i}`}>
						{tableCtx.columnOrder.map((column: any) => (
							<Table.Cell key={`table-cell-${column}`}>{d[column]}</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

export function useTable2({ data, tableCtx, Layers }: any) {
	const TableLayout = () => {
		const tt = Object.assign(Table, SubTableComponents);
		return (
			<>
				{Layers?.map((Layer: any, i: any) => (
					<Layer
						key={`table-layer-${i}`}
						Table={tt}
						data={data}
						tableCtx={tableCtx}
					/>
				))}
			</>
		);
	};
	return Object.assign(TableLayout, SubTableComponents);
}
