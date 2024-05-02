import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FocusEvent, forwardRef } from 'react';

type Props = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
};

export const InputForm = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const nameCapitalized = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={props.name}>{nameCapitalized}</Label>
      <Input
        {...props}
        ref={ref}
        type={props.type}
        id={props.name}
        placeholder={nameCapitalized}
        onBlur={props.onBlur}
      />
    </div>
  );
});

InputForm.displayName = 'InputForm';
