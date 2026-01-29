import { useState } from 'react';
import { BaseDataLayer2, useTable2 } from './table/hooks/use-table2';

function App() {
	const data = [{ first: 'Robert', last: 'Hernandez' }];
	const Table = useTable2({
		data,
		tableCtx: { columnOrder: ['first', 'last'] },
		Layer: BaseDataLayer2,
	});
	return (
		<>
			<div>hello</div>
			<Table />
		</>
	);
}

export default App;
