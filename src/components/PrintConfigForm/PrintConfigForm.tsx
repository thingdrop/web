import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormFields, Select, TextField } from '@/components';

const errorMessage = (fieldError) => {
  return fieldError?.message;
};

type PrintConfigFields = {
  filamentType?: string;
  infill?: number;
  printTemp?: number;
  resolution?: number;
  supportType?: string;
  supportLocation?: string;
  buildPlateAdhesion?: string;
  notes?: string;
};

export default function PrintConfigForm(props): ReactElement {
  const { printConfig } = props;
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<PrintConfigFields>({
    defaultValues: {
      ...printConfig,
    },
  });

  const onSubmit = async (data: PrintConfigFields) => {
    console.log({ data });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormFields>
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
      </FormFields>
    </Form>
  );
}
