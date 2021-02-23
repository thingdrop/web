import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Label from '../Label';
import { CloudUploadOutline as UploadIcon } from '@styled-icons/evaicons-outline';
import InlineError from '../InlineError';
import { fileType } from '@/utils';
import { outline } from '@/constants';

const HiddenInput = styled.input`
  top: 0;
`;

const FieldError = styled(InlineError)`
  margin-top: 0.5em;
`;

const UploadArea = styled.div`
  :focus-within {
    ${outline}
  }
  width: 100%;
  text-align: center;
  position: relative;
  padding: calc(var(--spacing-loosest) * 4) var(--spacing-loosest);
  border: var(--border-medium) solid
    ${(p) => (p.error ? 'var(--color-error)' : 'var(--color-secondary)')};
  border-radius: var(--border-radius-medium);
  transition: background var(--timing-fast);
  * {
    pointer-events: none;
  }
  &.drag {
    background: var(--color-primary);
  }
  :hover {
    background: var(--color-background-secondary);
  }
  :focus-within {
    background: var(--color-background-secondary);
  }
`;

const uploadMessage = 'Drag and drop one or more files, or click to upload.';

type FileFieldProps = {
  label: string;
  name: string;
  id: string;
  multiple?: boolean;
  onClick?: () => void;
  onChange: (files: any[]) => void;
  onError: (error: any) => void;
  error?: string;
};

function FileField(props: FileFieldProps, ref: any) {
  const [isDragging, setDragging] = useState(false);

  const { name, id, multiple, error, onChange, onError } = props;

  const labelId = `${id}-label`;

  const silenceEvent = (e) => {
    e.preventDefault();
  };

  const handleFileDrop = (e) => {
    silenceEvent(e);
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleChange = (e) => {
    const { files } = e.target;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validateFile(file)) {
        onError({
          type: 'manual',
          message: `The .${fileType(file.name)} file type is not supported.`,
        });
        return;
      }
    }
    onChange(files);
  };

  const validateFile = (file) => {
    const validTypes = ['stl', 'obj', 'glb'];
    const extension = fileType(file.name);
    return validTypes.includes(extension);
  };

  const toggleDrag = (e) => {
    silenceEvent(e);
    setDragging(!isDragging);
  };

  return (
    <Label id={labelId} htmlFor={id} style={{ display: 'block' }}>
      <UploadArea
        onDragOver={silenceEvent}
        onDragEnter={toggleDrag}
        onDragLeave={toggleDrag}
        onDrop={handleFileDrop}
        error={error}
        className={isDragging ? 'drag' : null}
      >
        <HiddenInput
          className="sr-only"
          id={id}
          aria-labelledby={labelId}
          name={name}
          type="file"
          multiple={multiple}
          onChange={handleChange}
          ref={ref}
        />
        <div>
          <UploadIcon size={48} />
          <p>{uploadMessage}</p>
        </div>
      </UploadArea>
      {error && <FieldError message={error} />}
    </Label>
  );
}

export default forwardRef(FileField);
