import { GenericAbortSignal } from 'axios';

export type RepositoryParams<T = object> = T & {
  config?: {
    abortSignal?: GenericAbortSignal,
  },
};
