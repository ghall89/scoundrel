import { Show, createSignal, type JSX } from 'solid-js';

import { Icon } from 'solid-heroicons';
import { xMark } from 'solid-heroicons/outline';

import Button from './button';

interface ModalProps {
  label: string;
  children: JSX.Element;
}

export default function Modal(props: ModalProps) {
  const [open, setOpen] = createSignal(false);

  const handleOpen = () => {
    console.log('Opening');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>{props.label}</Button>
      <Show when={open()}>
        <div class="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50">
          <div class="max-h-2/3 w-1/2 bg-white p-4">
            <div>
              <button onClick={handleClose}>
                <Icon class="size-8 text-red-500" path={xMark} />
                <span class="sr-only">Close</span>
              </button>
            </div>
            <div class="max-h-full overflow-hidden">{props.children}</div>
          </div>
        </div>
      </Show>
    </>
  );
}
