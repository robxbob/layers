import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { withProfiler } from '@/../.storybook/decorators/profiler';
import type { Any } from '@/utils/types/common';
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
	decorators: [withProfiler],
	render: () => {
		const [count, setCount] = useState(0);
		// biome-ignore lint/correctness/useExhaustiveDependencies: sds
		const data = useMemo(
			() =>
				Array.from(Array(1), () => ({
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
				})),
			[count],
		);

		const columns = ['firstName'];
		const columnOrder = ['firstName'];
		const Table = useTable({
			data,
			tableCtx: { columns, columnOrder },
		});
		return (
			<>
				<button
					type="button"
					onClick={() => {
						setCount(count + 1);
					}}
				>
					press
				</button>
				<Table>
					{/* <Table.Body>
						<Table.Row>
							<Table.Cell target="monkey" className="text-blue-500">
								perhaps
							</Table.Cell>
						</Table.Row>
					</Table.Body> */}
				</Table>
			</>
		);
	},
};

export const StandardTable: Story = {
	decorators: [withProfiler],
	render: () => {
		const [count, setCount] = useState(0);
		// biome-ignore lint/correctness/useExhaustiveDependencies: sds
		const data = useMemo(
			() =>
				Array.from(Array(1), () => ({
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
				})),
			[count],
		);

		const columnOrder = ['firstName'];
		return (
			<>
				<button
					type="button"
					onClick={() => {
						setCount(count + 1);
					}}
				>
					press
				</button>
				<table>
					<tbody>
						{data.map((d, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: dsa
							<tr key={i}>
								{columnOrder.map((column) => {
									return <td key={column}>{d[column]}</td>;
								})}
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	},
};
