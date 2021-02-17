type FormProps = {
  children: any;
  onSubmit: (event: any) => void;
};

export default function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}
