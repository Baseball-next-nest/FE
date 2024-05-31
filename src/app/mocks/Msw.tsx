'use client';

import { useEffect, useState } from 'react';

export default function Msw() {
  const [mswReady, setMswReady] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const init = async () => {
      const initMsw = await import('./index').then(res => res.initMsw);
      await initMsw();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  return <></>;
}
