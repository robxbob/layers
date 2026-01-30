import type { ComponentType } from 'react';
import type { Ctx, Data } from '@/utils/types/common';
import type { Table } from '../components/table';
import type { TableBody } from '../components/table-body';
import type { TableCell } from '../components/table-cell';
import type { TableRow } from '../components/table-row';

export type TableComponents = typeof Table & {
	Body: typeof TableBody;
	Row: typeof TableRow;
	Cell: typeof TableCell;
};

export type TableLayerProps<TData extends Data, TTableCtx extends Ctx> = {
	Table: TableComponents;
	tableCtx: TTableCtx;
	data: TData[];
};

export type TableLayer<
	TData extends Data,
	TTableCtx extends Ctx,
> = ComponentType<TableLayerProps<TData, TTableCtx>>;
