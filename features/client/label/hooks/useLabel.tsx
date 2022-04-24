import { useEffect } from "react";
import {
  addOrCreateLabelValidate,
  AddOrCreateLabelValidationParams,
} from "../../../shared/lib/validation/label/addOrCreateLabel";
import {
  deleteLabelValidate,
  DeleteLabelValidationParams,
} from "../../../shared/lib/validation/label/deleteLabel";
import {
  editLabelValidate,
  EditLabelValidationParams,
} from "../../../shared/lib/validation/label/editLabel";
import {
  removeLabelValidate,
  RemoveLabelValidationParams,
} from "../../../shared/lib/validation/label/removeLabel";
import { MyLabel } from "../../../shared/models/MyLabel";
import useApi from "../../core/hooks/use_api";
import { useErrorStore } from "../../core/stores/errorStore";
import useProject from "../../project/hooks/useProject";
import useTask from "../../task/hooks/useTask";
import { addOrCreateLabelClient } from "../clientApi/addOrCreateLabel";
import { deleteLabelClient } from "../clientApi/deleteLabel";
import { editLabelClient } from "../clientApi/editLabel";
import { getLabelsCLient } from "../clientApi/getLabels";
import { removeLabelClient } from "../clientApi/removeLabel";
import useLabelStore from "../stores/useLabelStore";

// import { Container } from './styles';

const useLabel = () => {
  const { request, loading } = useApi();
  const { handleError } = useErrorStore();
  const { localGetProjectById } = useProject();

  const { setEditLabel, editLabel, labels, setLabels } = useLabelStore();

  const { setCurrTask, currTask } = useTask();

  const handleAddOrCreateLabel = async (
    data: AddOrCreateLabelValidationParams
  ) => {
    try {
      const validData = addOrCreateLabelValidate(data);

      const newLabel = await request<typeof addOrCreateLabelClient>(
        addOrCreateLabelClient(validData)
      );

      if (!newLabel) return;

      !data.id && setLabels(labels.concat(newLabel));
      currTask &&
        setCurrTask({
          ...currTask,
          labels: currTask.labels?.concat(newLabel),
        });

      currTask && localGetProjectById(currTask.projectId + "");

      return newLabel;
    } catch (err) {
      handleError(err);
    }
  };
  const handleEditLabel = async (data: EditLabelValidationParams) => {
    try {
      const validData = editLabelValidate(data);

      const editedLabel = await request<typeof editLabelClient>(
        editLabelClient(validData)
      );

      if (!editedLabel) return;

      const replaceEditedLabel = (labels: MyLabel[], editedLabel: MyLabel) =>
        labels.map((label) =>
          label.id === editedLabel.id ? editedLabel : label
        );

      setLabels(replaceEditedLabel(labels, editedLabel));

      currTask?.labels &&
        setCurrTask({
          ...currTask,
          labels: replaceEditedLabel(currTask.labels, editedLabel),
        });

      currTask && localGetProjectById(currTask.projectId + "");

      return editedLabel;
    } catch (err) {
      handleError(err);
    }
  };

  const handleRemoveLabel = async (data: RemoveLabelValidationParams) => {
    try {
      const validData = removeLabelValidate(data);

      const wasRemoved = await request<typeof removeLabelClient>(
        removeLabelClient(validData)
      );

      if (!wasRemoved) return;

      currTask &&
        setCurrTask({
          ...currTask,
          labels: currTask.labels?.filter((label) => label.id !== data.id),
        });
      currTask && localGetProjectById(currTask.projectId + "");

      return wasRemoved;
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteLabel = async (data: DeleteLabelValidationParams) => {
    try {
      const validData = deleteLabelValidate(data);

      const wasDeleted = await request<typeof deleteLabelClient>(
        deleteLabelClient(validData)
      );

      if (!wasDeleted) return;

      setLabels(labels.filter((label) => label.id !== data.id));

      currTask &&
        setCurrTask({
          ...currTask,
          labels: currTask.labels?.filter((label) => label.id !== data.id),
        });
      currTask && localGetProjectById(currTask.projectId + "");

      return wasDeleted;
    } catch (err) {
      handleError(err);
    }
  };

  const handleGetLabels = async () =>
    request<typeof getLabelsCLient>(getLabelsCLient());

  useEffect(() => {
    handleGetLabels().then((labels) => setLabels(labels || []));
  }, []);

  return {
    handleAddOrCreateLabel,
    handleGetLabels,
    handleRemoveLabel,
    handleDeleteLabel,
    handleEditLabel,
    setEditLabel,
    editLabel,
    loading,
    labels,
  };
};

export default useLabel;
