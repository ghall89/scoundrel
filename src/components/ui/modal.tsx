import { Show, createSignal, type JSX } from 'solid-js';

import Button from './button';

interface ModalProps {
  label: string;
  children: JSX.Element;
}

export default function Modal(props: ModalProps) {
  const [open, setOpen] = createSignal(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>{props.label}</Button>
      <Show when={open()}>
        <div
          class="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50"
          on:click={handleClose}
        >
          <div
            on:click={(e) => e.stopPropagation()}
            class="max-h-2/3 w-1/2 rounded-sm bg-white p-4 text-slate-800 shadow"
          >
            <div class="max-h-full overflow-hidden">{props.children}</div>
          </div>
        </div>
      </Show>
    </>
  );
}
