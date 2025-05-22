import { Label } from 'radix-ui';

interface LabelSampleProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

const LabelSample = ({ children, className, htmlFor }: LabelSampleProps) => {
  return (
    <Label.Root className={`text-sm font-medium text-red-700 ${className}`} htmlFor={htmlFor}>
      {children}
    </Label.Root>
  );
};

export default LabelSample;
