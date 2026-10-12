export type ModalType = "success" | "error" | "warning" | null;

export interface Modal {
  type: ModalType;
  status: boolean;
  text: string;
}
