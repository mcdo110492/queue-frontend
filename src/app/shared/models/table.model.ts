export interface TableColumn {
  name: string;
  label: string;
  isBtn: boolean;
  cell?: Function;
  btnRefId?: number | string;
  btnColor?: string;
}
