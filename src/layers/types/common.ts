import type { Any, Wrapper } from '@/utils/types/common';

export type LayerTag = {
	type: string;
	target?: string;
};

export type MergeFn<TPropType = Any> = (
	oldVal: TPropType,
	newVal: TPropType,
) => TPropType;

export type LayerProps = {
	active?: boolean;
	outer?: Wrapper[];
	inner?: Wrapper[];
};

export type LayerStateProps = Record<string, Any> & LayerProps;

export type LayerState<TProps extends LayerStateProps = LayerStateProps> = {
	id: string;
	props?: TProps;
	merge?: {
		[K in keyof NoInfer<TProps>]?: MergeFn<NoInfer<TProps>[K]>;
	};
};

export type LayerComponentProps<
	TProps extends Record<string, Any>,
	TLayerStateProps = TProps & LayerProps,
> = {
	target?: string;
	merge?: {
		[K in keyof NoInfer<TLayerStateProps>]?: MergeFn<
			NoInfer<TLayerStateProps>[K]
		>;
	};
} & NoInfer<TLayerStateProps>;
