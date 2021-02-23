import Head from 'next/head';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Button,
  Heading,
  TextField,
  Layout,
  Form,
  Checkbox,
  FileField,
  ChoiceList,
  FormFields,
  Steps,
  VisuallyHidden,
  Select,
} from '@/components';
import { fetcher, fileSize } from '@/utils';
import { useState } from 'react';

const errorMessage = (fieldError) => {
  return fieldError?.message;
};

const validateFileList = (value: FileList) =>
  value.length > 0 || 'You gotta upload at least one file.';

type UploadFields = {
  files: FileList;
  name: string;
  description: string;
  canDownload: boolean;
  filamentType: string;
  infill: number | null;
  printTemp: number;
  resolution: number;
  supportType: string;
  supportLocation: string;
  license: string;
};

const requiredMessage = 'This field is required';

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
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

const fileListToOptions = (fileList: FileList | undefined) => {
  if (!fileList) return [];
  const fileArray = Array.from(fileList);
  return fileArray.map((file) => {
    const { name, size } = file;
    return {
      label: `${name} - ${fileSize(size)}`,
      value: name,
    };
  });
};

export default function Upload() {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    setError,
    clearErrors,
  } = useForm<UploadFields>({
    defaultValues: {
      supportType: 'NONE',
    },
  });

  const [it, setIt] = useState([]);

  const fileList = watch('files');
  const fileOptions = fileListToOptions(fileList);

  const onSubmit = async (data) => {
    console.log({ data });
    const { files: fileList, primaryFile, ...createModelDto } = data;
    const files: File[] = Array.from(fileList);

    const parsedDto = Object.entries(createModelDto).reduce((acc, pair) => {
      console.log({ acc, pair });
      const [key, value] = pair;
      if (
        ['filamentType', 'license'].includes(key) &&
        typeof value === 'string' &&
        !value.length
      ) {
        acc[key] = null;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    const createModelResponse = await fetcher.post('/models', parsedDto);
    console.log({ createModelResponse });
    const { id, uploadToken } = createModelResponse.data;

    const createFilesDto = {
      files: files.map(({ name, size }) => ({
        name,
        size,
        isPrimary: name === primaryFile,
      })),
    };
    const createFilesResponse = await fetcher.post(
      `/models/${id}/files`,
      createFilesDto,
      {
        headers: {
          Authorization: `Bearer ${uploadToken}`,
        },
      },
    );
    console.log({ createFilesResponse });
    const { data: registeredFiles } = createFilesResponse;
    await Promise.all(
      registeredFiles.map(({ name, contentType, postPolicy }) => {
        const { url, fields } = postPolicy;
        const file = files.find((f) => f.name === name);

        const formData = new FormData();
        formData.append('Content-Type', contentType);

        Object.entries(fields).forEach(([k, v]: [string, any]) => {
          formData.append(k, v);
        });
        formData.append('file', file);
        return fetcher.post(url, formData, {
          onUploadProgress: function (progressEvent) {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded / total) * 100);
            console.log(`Progress: ${progress}%`);
          },
        });
      }),
    );
  };

  return (
    <Layout>
      <Head>
        <title>Thingdrop | Upload</title>
      </Head>
      <Heading level={1}>Upload a model</Heading>
      <Main>
        <Sidebar>
          <Steps
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
          />
        </Sidebar>
        <Content>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <VisuallyHidden>
              <Heading level={2} id="uploadModels">
                Upload Models
              </Heading>
            </VisuallyHidden>
            <FormFields>
              <FileField
                id="upload"
                name="files"
                onChange={(files) => {
                  clearErrors('files');
                  setValue('files', files, { shouldValidate: true });
                }}
                onError={(error) => setError('files', error)}
                label="Upload files"
                ref={register({ validate: validateFileList })}
                multiple
                error={errorMessage(errors.files)}
              />
              {!!fileOptions.length && (
                <ChoiceList
                  name="primaryFile"
                  label="Primary File"
                  options={fileOptions}
                  ref={register}
                />
              )}
              <Heading level={2} id="basicInfo">
                Basic Information
              </Heading>

              <TextField
                minLength={4}
                maxLength={20}
                showCharacterCount
                defaultValue="hi"
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
              <TextField
                id="description"
                name="description"
                label="Description"
                showCharacterCount
                multiline
                fullWidth
                ref={register({ required: requiredMessage })}
                error={errorMessage(errors.description)}
              />
              <Heading level={2} id="optionalFields">
                Optional Fields
              </Heading>

              <Checkbox
                id="allowDownload"
                name="canDownload"
                label="Allow download"
                ref={register}
                defaultChecked={true}
              />

              <Select
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
              />

              <ChoiceList
                name="prim"
                label="Prim"
                defaultChecked={['MIT']}
                // selected={it}
                // onChange={(e) => {
                //   console.log(e.target.value);
                //   setIt([e.target.value]);
                // }}
                options={[
                  { label: 'BSD', value: 'BSD' },
                  { label: 'MIT', value: 'MIT' },
                  { label: 'Unlicensed', value: 'UNLICENSED' },
                ]}
              />

              <Button type="submit">Create Model</Button>
            </FormFields>
          </Form>
        </Content>
      </Main>
    </Layout>
  );
}
