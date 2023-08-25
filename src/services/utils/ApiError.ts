import { ApiErrorItem } from '../api-interface';

export default class ApiError extends Error {
  errors: Array<ApiErrorItem>;

  constructor(errors: Array<ApiErrorItem>) {
    super('ApiError');
    this.errors = errors;
  }

  includeDetail(detail: string) {
    return !!this.errors.find((error: ApiErrorItem) => (error.detail.includes(detail)));
  }
}
