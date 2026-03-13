'use client';

import { Button } from '@/components/ui/button';

export function HelloButton() {
  return <Button onClick={() => alert('Hello!')}>Hello</Button>;
}
