'use client';

import { useForm } from 'react-hook-form';
import Input from '@/shared/components/core/input';

interface FormData {
  phone: string;
}

export default function InputSection() {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  return (
    <section className="border-b pb-8">
      <h2 className="text-2xl font-semibold mb-6">Input</h2>

      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-sm font-medium mb-3">Types</h3>
          <div className="space-y-3">
            <Input label="Text" type="text" placeholder="Text input" />
            <Input label="Email" type="email" placeholder="email@example.com" />
            <Input label="URL" type="url" placeholder="https://..." />
            <Input label="Password" type="password" placeholder="••••••••" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Error (React Hook Form)</h3>
          <Input
            label="Phone"
            placeholder="01012345678"
            {...register('phone', {
              validate: (value) => /^\d+$/.test(value) || 'Only numbers allowed',
            })}
            error={errors.phone}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Disabled</h3>
          <Input label="Disabled" disabled placeholder="Cannot edit" />
        </div>
      </div>
    </section>
  );
}
