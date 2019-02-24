export interface CustomMatTableModel {
  name: string;
  label: string;
  isBtn: boolean;
  cell?: Function;
  btnRefId?: number | string;
  btnColor?: string;
}
