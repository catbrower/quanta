export interface IWindow {
  id: string,
  name: string,
  state: string,
  type: string
}

export interface IEditorWindow<T> extends IWindow {
  data: T,
  editData: T
}