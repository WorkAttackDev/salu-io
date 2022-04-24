import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React from "react";
import { MyLabel } from "../../../../shared/models/MyLabel";
import FadeTransition from "../../../core/components/FadeTransition";
import useTask from "../../../task/hooks/useTask";
import useLabel from "../../hooks/useLabel";
import LabelForm from "./LabelForm";

type Props = {
  onClose: () => void;
};

const LabelManager = ({ onClose }: Props) => {
  return (
    <div className='space-y-8'>
      <LabelListActions />
      <LabelForm onClose={onClose} />
    </div>
  );
};

export default LabelManager;

// * Helper components

type Action = {
  name: string;
  Icon: (props: any) => JSX.Element;
  className: string;
  onClick?: (label: MyLabel) => void;
};

function LabelListActions() {
  const { currTask } = useTask();
  const {
    labels,
    handleRemoveLabel,
    handleAddOrCreateLabel,
    handleDeleteLabel,
    loading,
    editLabel,
    setEditLabel,
  } = useLabel();

  const taskLabels = currTask?.labels || [];

  const labelActions: Record<string, Action> = {
    add: {
      name: "Adicionar",
      Icon: PlusIcon,
      className: "hover:text-brand",
      onClick: (label) =>
        currTask &&
        handleAddOrCreateLabel({
          color: label.color,
          name: label.name,
          projectOrTaskId: currTask?.id,
          type: "Task",
          id: label.id,
        }),
    },
    remove: {
      name: "Remover",
      Icon: MinusIcon,
      className: `hover:text-brand`,
      onClick: (label) =>
        currTask && handleRemoveLabel({ id: label.id, taskId: currTask.id }),
    },
    edit: {
      name: "Editar",
      Icon: PencilIcon,
      className: "hover:text-brand",
      onClick: (label) => setEditLabel(label),
    },
    delete: {
      name: "Apagar",
      Icon: TrashIcon,
      className: "hover:text-red-600",
      onClick: (label) => handleDeleteLabel({ id: label.id }),
    },
  };

  return loading ? (
    <RefreshIcon className='w-6 h-6 flex-shrink-0 animate-spin duration-200' />
  ) : (
    <FadeTransition show={!loading}>
      <ul className='space-y-2 max-h-[50vh] overflow-y-auto pr-4 pb-2'>
        {labels.map((v, i) => (
          <LabelItem
            label={v}
            labelActions={labelActions}
            taskLabels={taskLabels}
            key={v.name}
          />
        ))}
      </ul>
    </FadeTransition>
  );
}

const LabelItem = ({
  taskLabels,
  label,
  labelActions,
}: {
  taskLabels: MyLabel[];
  label: MyLabel;
  labelActions: Record<string, Action>;
  // isLoading: boolean;
}) => {
  const alreadyAdded = (label: MyLabel) =>
    taskLabels.some((taskLabel) => taskLabel.id === label.id);

  const actionButtonBuilder = ({
    label,
    action,
  }: {
    action: Action;
    label: MyLabel;
  }) => {
    const added = alreadyAdded(label);

    return added && action.name === "Adicionar" ? null : !added &&
      action.name === "Remover" ? null : (
      <button
        key={action.name}
        title={action.name}
        onClick={() => action.onClick?.(label)}
      >
        <action.Icon
          className={`w-6 h-6 flex-shrink-0 duration-100 ${action.className}`}
        />
      </button>
    );
  };

  return (
    <li className='flex justify-between items-center'>
      <span className='flex items-center space-x-4'>
        <i
          className={`flex-shrink-0 w-5 h-5 rounded-full border border-brand-gray`}
          style={{ backgroundColor: label.color }}
        ></i>
        <p className='text-xl'>{label.name}</p>
      </span>
      <span className='flex items-center space-x-4'>
        {Object.values(labelActions).map((action) =>
          actionButtonBuilder({ label: label, action })
        )}
      </span>
    </li>
  );
};
