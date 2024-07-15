import { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import InputGroupButton from 'rsuite/lib/InputGroup/InputGroupButton';

const EditableInput = ({
  initialvalue,
  onSave,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Input is empty',
  ...inputPorps
}) => {
  const [input, setInput] = useState(initialvalue);
  const [isEditable, setisEditable] = useState(false);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setisEditable(state => !state);
    setInput(initialvalue);
  }, [initialvalue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      Alert.info('Empty field', 4000);
    }
    if (trimmed !== initialvalue) {
      await onSave(trimmed);
    }
    setisEditable(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputPorps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={!isEditable ? 'edit2' : 'close'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon={'check'} />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
