import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addUpload, updateUpload } from '@/store';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { fetcher } from '@/utils';
import {
  Button,
  Card,
  TextField,
  Form,
  Checkbox,
  FileField,
  List,
  FormFields,
} from '@/components';
import { useState } from 'react';
import { useToast } from '../Toast';

const errorMessage = (fieldError) => {
  return fieldError?.message;
};

const validateFileList = (value: FileList) => {
  if (!value.length) {
    return 'You gotta upload at least one file...';
  }
  return value.length === 1 || 'You can only upload one file at a time.';
};

type UploadFields = {
  fileList: FileList;
  name: string;
  description: string;
  canDownload: boolean;
  // filamentType: string;
  // infill: number | null;
  // printTemp: number;
  // resolution: number;
  // supportType: string;
  // supportLocation: string;
  // license: string;
};

const requiredMessage = 'This field is required';

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-column-gap: var(--spacing-loosest);
  @media only screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  @media only screen and (max-width: 750px) {
    display: none;
  }
  flex-grow: 1;
  flex-basis: 250px;
  align-self: start;
  position: sticky;
  top: var(--spacing-loosest);
  margin-right: var(--spacing-loosest);
`;

const Content = styled.article`
  flex-basis: 0;
  flex-grow: 999;
  min-width: 40%;
`;

const createFormData = (fileMeta, file) => {
  const { contentType, postPolicy } = fileMeta;
  const { fields } = postPolicy;
  const formData = new FormData();
  formData.append('Content-Type', contentType);

  Object.entries(fields).forEach(([key, value]: [string, any]) => {
    formData.append(key, value);
  });
  formData.append('file', file);
  return formData;
};

export default function UploadForm() {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<UploadFields>();

  const fileList = watch('fileList');
  const file = fileList?.length === 1 ? fileList?.item(0) : null;

  const [isSubmitting, setSubmitting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: UploadFields) => {
    setSubmitting(true);
    const { fileList, ...model } = data;
    const file = fileList.item(0);
    const fileDto = { name: file.name, size: file.size };

    const createModelResponse = await fetcher.post('/models', model);

    const { id, uploadToken } = createModelResponse.data;
    const createFilesResponse = await fetcher.post(
      `/models/${id}/file`,
      fileDto,
      {
        headers: {
          Authorization: `Bearer ${uploadToken}`,
        },
      },
    );

    const { data: registeredFile } = createFilesResponse;
    dispatch(addUpload({ id: registeredFile.id }));

    const formData = createFormData(registeredFile, file);
    const { url } = registeredFile.postPolicy;

    router.push(`/${id}`);

    try {
      await fetcher.post(url, formData, {
        onUploadProgress: debounce((progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded / total) * 100);

          dispatch(updateUpload({ id: registeredFile.id, progress }));

          if (progress === 100) {
            addToast({ content: 'Upload complete!', duration: 5000 });
          }
        }, 100),
      });
    } catch (error) {
      dispatch(updateUpload({ id: registeredFile.id, error }));
    }
  };

  return (
    <Main>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* <Heading level={1} id="uploadModels">
            Upload a Model
          </Heading> */}
          <FormFields>
            <TextField
              minLength={4}
              maxLength={20}
              showCharacterCount
              defaultValue="hilll"
              id="name"
              name="name"
              label="Name"
              ref={register({
                required: requiredMessage,
                minLength: {
                  value: 4,
                  message: 'Name must be at least 4 characters.',
                },
                maxLength: {
                  value: 20,
                  message: 'Name can only be 20 characters long.',
                },
              })}
              error={errorMessage(errors.name)}
            />

            <FileField
              id="upload"
              name="fileList"
              file={file}
              onChange={(fileList) => {
                clearErrors('fileList');
                setValue('fileList', fileList, {
                  shouldValidate: true,
                });
              }}
              onError={(error) => setError('fileList', error)}
              label="Upload files"
              ref={register({ validate: validateFileList })}
              error={errorMessage(errors.fileList)}
            />
            {/* <Heading level={2} id="basicInfo">
              Basic Information
            </Heading> */}

            <TextField
              id="description"
              name="description"
              label="Description"
              defaultValue="temp description"
              showCharacterCount
              multiline
              fullWidth
              ref={register({ required: requiredMessage })}
              error={errorMessage(errors.description)}
            />
            {/* <Heading level={2} id="optionalFields">
              Optional Fields
            </Heading> */}

            <Checkbox
              id="allowDownload"
              name="canDownload"
              label="Allow this model to be publicly listed."
              ref={register}
              defaultChecked={true}
            />

            {/* <Select
              name="filamentType"
              label="Filament Type"
              id="filamentType"
              defaultValue={undefined}
              options={[
                { label: 'ABS', value: 'ABS' },
                { label: 'PLA', value: 'PLA' },
                { label: 'SLA', value: 'SLA' },
                { label: 'Other', value: 'OTHER' },
              ]}
              ref={register}
            />

            <TextField
              id="infill"
              name="infill"
              label="Infill (%)"
              type="number"
              min={0}
              max={100}
              suffix="%"
              ref={register({
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'Value cannot be negative.',
                },
                max: {
                  value: 100,
                  message: 'Value cannot be greater than 100%',
                },
              })}
              error={errorMessage(errors.infill)}
            />
            <TextField
              id="printTemperature"
              name="printTemp"
              label="Print Temperature"
              type="number"
              suffix="℉"
              min={0}
              max={1000}
              ref={register({
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'Value cannot be negative.',
                },
                max: {
                  value: 1000,
                  message: 'Value cannot be greater than 1000',
                },
              })}
              error={errorMessage(errors.printTemp)}
            />

            <TextField
              id="resolution"
              name="resolution"
              label="Resolution"
              type="number"
              suffix="mm"
              min={0}
              max={2}
              ref={register({
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'Value cannot be negative.',
                },
                max: {
                  value: 2,
                  message: 'Value cannot be greater than 1000',
                },
              })}
              error={errorMessage(errors.resolution)}
            />

            <FormFields.Group label="Supports" inline>
              <Select
                name="supportType"
                label="Support Type"
                id="supportType"
                defaultValue="NONE"
                options={[
                  { label: 'None', value: 'NONE' },
                  { label: 'Lines', value: 'LINES' },
                  { label: 'Grid', value: 'GRID' },
                  {
                    label: 'Triangles',
                    value: 'TRIANGLES',
                  },
                  { label: 'Concentric', value: 'CONCENTRIC' },
                  { label: 'Zigzag', value: 'ZIGZAG' },
                  { label: 'Cross', value: 'CROSS' },
                  { label: 'Gyroid', value: 'GYROID' },
                ]}
                ref={register}
              />
              {watch('supportType') !== 'NONE' && (
                <Select
                  name="supports"
                  label="Support Location"
                  id="supports"
                  options={[
                    { label: 'None', value: 'NONE' },
                    { label: 'Everywhere', value: 'EVERYWHERE' },
                    {
                      label: 'Touching Buildplate',
                      value: 'TOUCHING_BUILDPLATE',
                    },
                  ]}
                  ref={register}
                />
              )}
            </FormFields.Group>

            <Select
              name="license"
              label="License"
              id="license"
              options={[
                { label: 'BSD', value: 'BSD' },
                { label: 'MIT', value: 'MIT' },
                { label: 'Unlicensed', value: 'UNLICENSED' },
              ]}
              ref={register}
            /> */}

            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Create Model
            </Button>
          </FormFields>
        </Form>
      </Content>
      <Sidebar>
        <Card style={{ marginTop: '25px' }}>
          <List>
            <List.Item>Upload a model!</List.Item>
            <List.Item>Support file types: .stl, .obj, .ply, .glb</List.Item>
            <List.Item>
              Publicly listed models will show up in search.
            </List.Item>
          </List>
        </Card>
        {/* <Steps
          steps={[
            { label: 'Upload Models', id: 'uploadModels' },
            {
              label: 'Basic Information',
              id: 'basicInfo',
            },
            {
              label: 'Optional Fields',
              id: 'optionalFields',
            },
          ]}
        /> */}
      </Sidebar>
    </Main>
  );
}
