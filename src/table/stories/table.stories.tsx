import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTable } from '../hooks/use-table';

const meta = {
	title: 'Table/useTable',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {},
	render: () => {
		const data = [
			{ first: 'Robert', last: 'Hernandez' },
			{ first: 'Mimi', last: 'Hernandez' },
		];
		const Table = useTable({
			data,
			tableCtx: { columns: ['first', 'last'] },
		});
		return <Table />;
	},
} satisfies Meta<typeof useTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const OverrideDefaultCell: Story = {
	render: () => {
		const data = [
			{ first: 'Robert', last: 'Hernandez', monkey: 'yes' },
			{ first: 'Mimi', last: 'Hernandez', monkey: 'no' },
		];
		const columns = ['first', 'last', 'monkey'];
		const columnOrder = ['first', 'monkey', 'last'];
		const Table = useTable({
			data,
			tableCtx: { columns, columnOrder },
		});
		return (
			<Table>
				<Table.Body>
					<Table.Row>
						<Table.Cell target="monkey" className="text-blue-500">
							perhaps
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		);
	},
};
