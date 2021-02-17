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
} from '@/components';
import { fileSize } from '@/utils';

const validateFileList = (value: FileList) =>
  value.length > 0 || 'You gotta upload at least one file.';

type UploadFields = {
  name: string;
  description: string;
  canDownload: boolean;
  files: FileList;
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
  } = useForm<UploadFields>();

  const fileList = watch('files');
  const fileOptions = fileListToOptions(fileList);

  const onSubmit = (data) => console.log(data);

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
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                error={errors.files?.message}
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
                id="name"
                name="name"
                label="Name"
                ref={register({ required: true })}
                fullWidth
                error={errors.name && requiredMessage}
              />

              <TextField
                id="description"
                name="description"
                label="Description"
                multiline={5}
                fullWidth
                ref={register({ required: true })}
                error={errors.description && requiredMessage}
              />

              <TextField
                id="description"
                name="description"
                label="Description"
                multiline={5}
                fullWidth
                ref={register({ required: true })}
                error={errors.description && requiredMessage}
              />

              <TextField
                id="description"
                name="description"
                label="Description"
                multiline={5}
                fullWidth
                ref={register({ required: true })}
                error={errors.description && requiredMessage}
              />

              <TextField
                id="description"
                name="description"
                label="Description"
                multiline={5}
                fullWidth
                ref={register({ required: true })}
                error={errors.description && requiredMessage}
              />

              <TextField
                id="description"
                name="description"
                label="Description"
                multiline={5}
                fullWidth
                ref={register({ required: true })}
                error={errors.description && requiredMessage}
              />

              <Heading level={2} id="optionalFields">
                Optional Fields
              </Heading>

              <Checkbox
                id="optionalFields"
                name="canDownload"
                label="Allow download"
                ref={register}
              />

              <Button type="submit">Create Model</Button>
            </FormFields>
          </Form>
        </Content>
      </Main>
    </Layout>
  );
}
