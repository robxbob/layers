import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTable } from '../hooks/use-table';

// import { Table } from '../components/table';
// import {
// 	BaseDataLayer2,
// 	SubTableComponents,
// 	useTable2,
// } from '../hooks/use-table2';

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
			tableCtx: { columnOrder: ['first', 'last'] },
		});
		return <Table />;
	},
} satisfies Meta<typeof useTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
