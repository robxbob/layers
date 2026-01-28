import type { ReactNode } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: Use `Any` when `any` is necessary
type Any = any;
type Ctx = Record<string, Any>;
type Data = Record<string, Any>;
type ExtractTableCtx<TTableLayer extends TableLayer<Any>> =
	TTableLayer extends TableLayer<infer C> ? C : never;

type TableLayerProps<TTableCtx extends Ctx> = { tableCtx: TTableCtx };
type TableLayer<TTableCtx extends Ctx> = (
	p: TableLayerProps<TTableCtx>,
) => ReactNode;

function useTable<
	TData extends Data,
	TTableLayer extends TableLayer<Any>,
	TTableCtx extends ExtractTableCtx<NoInfer<TTableLayer>> & Ctx,
>(opts: {
	data: TData[];
	layers?: TTableLayer[];
	tableCtx?: TTableCtx;
}): NoInfer<TTableCtx> {
	opts;
	return {} as TTableCtx;
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
		layers: [
			Layer1,
			Layer2,
			(p: { tableCtx: { foo: 'bar' } }) => {
				p;
				return null;
			},
		],
		tableCtx: { hello: '', foo: 'bar', monkey: 'my' },
	});
	return Table;
}
