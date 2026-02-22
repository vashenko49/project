import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export function ToBoolean(options?: { required?: boolean }) {
  const decorators = [
    Transform(({ value }) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      return value;
    }),
  ];

  if (options?.required) {
    decorators.push(IsBoolean());
  } else {
    decorators.push(IsOptional(), IsBoolean());
  }

  return applyDecorators(...decorators);
}
