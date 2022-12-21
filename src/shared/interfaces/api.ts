export interface MutationProps<T> {
  onError?: (errMsg: any) => void;
  onSuccess: (response: T) => void;
}
