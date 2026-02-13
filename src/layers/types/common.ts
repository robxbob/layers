import type { ReactNode } from 'react';
import type { Any, Wrapper } from '@/utils/types/common';

export type MergeFn<TPropType = Any> = (
	oldVal: TPropType,
	newVal: TPropType,
) => TPropType;

export type LayerTag = {
	type: string;
	target?: string;
	id: string;
};

export type BaseLayerProps = {
	active?: boolean;
	outer?: Wrapper[];
	inner?: Wrapper[];
	merge?: unknown;
};

export type LayerProps<
	TProps extends {
		[K in keyof TProps]: K extends keyof BaseLayerProps ? never : TProps[K];
	},
> = TProps &
	BaseLayerProps & {
		merge?: {
			[K in keyof (NoInfer<TProps> & Omit<BaseLayerProps, 'merge'>)]?: MergeFn<
				(NoInfer<TProps> & BaseLayerProps)[K]
			>;
		};
	};

export type LayerComponentProps<TProps extends Record<string, Any>> =
	LayerProps<TProps> & Pick<LayerTag, 'target'>;
