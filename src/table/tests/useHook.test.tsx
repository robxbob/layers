import { useTable } from '../hooks/use-table';

const data = [{ first: 'R', last: 'H' }];
const Layer1 = (p: { tableCtx: { hello: string } }) => {
	p;
	return null;
};
const Layer2 = (p: { tableCtx: { world?: string } }) => {
	p;
	return null;
};

function Demo() {
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
		//@ts-expect-error
		tableCtx: { foo: 'bar', monkey: 'my' },
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
