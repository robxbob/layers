import type { ComponentType } from 'react';

type HOC = (WrappedComponent: ComponentType) => ComponentType;
function useLayer(opts: {
	target: string;
	outerHOCs: HOC[];
	innerHOCs: HOC[];
}) {}
