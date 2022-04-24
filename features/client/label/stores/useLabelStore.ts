import create from "zustand";
import { MyLabel } from "../../../shared/models/MyLabel";

type LabelStore = {
  labels: MyLabel[];
  editLabel?: MyLabel;
  setEditLabel: (task?: MyLabel) => void;
  setLabels: (labels: MyLabel[]) => void;
};

const useLabelStore = create<LabelStore>((set) => ({
  editLabel: undefined,
  labels: [],
  setEditLabel: (label) => set({ editLabel: label }),
  setLabels: (labels) => set({ labels }),
}));

export default useLabelStore;
