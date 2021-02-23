type FormProps = {
  children: any;
  onSubmit: (event: any) => void;
  noValidate?: boolean;
};

export default function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}
