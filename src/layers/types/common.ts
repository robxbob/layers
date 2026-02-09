import type { Any, Wrapper } from '@/utils/types/common';

export type LayerTag = {
	type: string;
	target?: string;
};

export type MergeFn<TPropType = Any> = (
	oldVal: TPropType,
	newVal: TPropType,
) => TPropType;

export type LayerStateProps = Record<string, Any> & {
	outer?: Wrapper[];
	inner?: Wrapper[];
};

export type LayerState<TProps extends LayerStateProps = LayerStateProps> = {
	id: string;
	props?: TProps;
	merge?: {
		[K in keyof NoInfer<TProps>]?: MergeFn<NoInfer<TProps>[K]>;
	};
};

export type LayerProps<
	TProps extends Record<string, Any>,
	TLayerProps = TProps & { outer?: Wrapper[]; inner?: Wrapper[] },
> = {
	target?: string;
	merge?: {
		[K in keyof NoInfer<TLayerProps>]?: MergeFn<NoInfer<TLayerProps>[K]>;
	};
} & NoInfer<TLayerProps>;
