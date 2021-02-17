type FormProps = {
  children: any;
  onSubmit: () => void;
};

export default function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}
