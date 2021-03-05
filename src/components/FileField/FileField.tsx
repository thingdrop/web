import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Label from '../Label';
import { CloudUploadOutline as UploadIcon } from '@styled-icons/evaicons-outline';
import { Cube as FileIcon } from '@styled-icons/boxicons-regular';
import InlineError from '../InlineError';
import { getFileSize, getFileType } from '@/utils';
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
  z-index: 10;
  width: 100%;
  text-align: center;
  position: sticky;
  padding: calc(var(--spacing-loosest) * 4) var(--spacing-loosest);
  border: var(--border-medium) solid
    ${(p) => (p.error ? 'var(--color-error)' : 'var(--color-secondary)')};
  border-radius: var(--border-radius-medium);
  transition: background var(--timing-fast), box-shadow var(--timing-fast);
  * {
    pointer-events: none;
  }
  &.drag {
    background: var(--color-primary);
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
  }
  :hover {
    background: var(--color-background-secondary);
  }
  :focus-within {
    background: var(--color-background-secondary);
  }
`;

const uploadMessage = 'Drag and drop a file, or click to upload.';

type FileFieldProps = {
  label: string;
  name: string;
  file: any;
  id: string;
  multiple?: boolean;
  onClick?: () => void;
  onChange: (files: any[]) => void;
  onError: (error: any) => void;
  error?: string;
};

function FileField(props: FileFieldProps, ref: any) {
  const [isDragging, setDragging] = useState(false);

  const { name, id, multiple, error, onChange, onError, file } = props;

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
          message: `The .${getFileType(file.name)} file type is not supported.`,
        });
        return;
      }
    }
    onChange(files);
  };

  const validateFile = (file) => {
    const validTypes = ['stl', 'obj', 'glb'];
    const extension = getFileType(file.name);
    return validTypes.includes(extension.toLowerCase());
  };

  const toggleDrag = (e) => {
    silenceEvent(e);
    setDragging(!isDragging);
  };

  return (
    <Label id={labelId} htmlFor={id} style={{ display: 'block' }}>
      <div style={{ position: 'relative' }}>
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
          {file && !isDragging ? (
            <div>
              <FileIcon size={48} />
              <p>
                {file.name.toLowerCase()} ({getFileSize(file.size)})
              </p>
            </div>
          ) : (
            <div>
              <UploadIcon size={48} />
              <p>{uploadMessage}</p>
            </div>
          )}
        </UploadArea>
        {error && <FieldError message={error} />}
      </div>
    </Label>
  );
}

export default forwardRef(FileField);
