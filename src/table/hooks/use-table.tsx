import type { FC, ReactNode } from 'react';
import { Table } from '../components/table';
import { TableBody } from '../components/table-body';
import { TableCell } from '../components/table-cell';
import { TableRow } from '../components/table-row';

// biome-ignore lint/suspicious/noExplicitAny: Use `Any` when `any` is necessary
type Any = any;
type Ctx = Record<string, Any>;
type Data = Record<string, Any>;

type TableComponents = typeof Table & {
	Body: typeof TableBody;
	Row: typeof TableRow;
	Cell: typeof TableCell;
};

type TableLayerProps<TData extends Data, TTableCtx extends Ctx> = {
	Table: TableComponents;
	tableCtx: TTableCtx;
	data: TData[];
};
type TableLayer<TData extends Data, TTableCtx extends Ctx> = FC<
	TableLayerProps<TData, TTableCtx>
>;
type ExtractTableCtx<TTableLayer extends TableLayer<Any, Any>> =
	TTableLayer extends TableLayer<Any, infer C> ? C : never;

export function useTable<
	TData extends Data,
	TTableLayer extends TableLayer<TData, Any>,
	TTableCtx extends ExtractTableCtx<NoInfer<TTableLayer>> & Ctx,
>({
	data,
	Layers,
	tableCtx,
}: {
	data?: TData[];
	Layers?: TTableLayer[];
	tableCtx?: TTableCtx;
}): TableComponents {
	const LayeredTable = () => {
		const TableComponents = Object.assign(Table, SubTableComponents);
		return (
			<>
				{(Layers ?? [BaseDataLayer]).map((Layer: Any, i) => {
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

const SubTableComponents = {
	Body: TableBody,
	Row: TableRow,
	Cell: TableCell,
};

function BaseDataLayer<TData extends Data>({
	Table,
	tableCtx,
	data,
}: TableLayerProps<TData, { columnOrder: string[] & (keyof TData)[] }>) {
	return (
		<Table>
			<Table.Body>
				{data.map((d, i) => (
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

//********************************* */
const data = [{ first: 'R', last: 'H' }];
const Layer1 = (p: { tableCtx: { hello: string } }) => {
	p;
	return null;
};
const Layer2 = (p: { tableCtx: { world?: string } }) => {
	p;
	return null;
};

export function Demo() {
	const Table = useTable({
		data,
		Layers: [
			Layer1,
			Layer2,
			(p: { tableCtx: { foo: 'bar' } }) => {
				p;
				return null;
			},
		],
		tableCtx: { hello: '', foo: 'bar', monkey: 'my' },
	});
	return (
		<Table>
			<Table.Body>
				<Table.Row>
					<Table.Cell></Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
}
