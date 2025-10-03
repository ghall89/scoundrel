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
      <Button on:click={handleOpen}>{props.label}</Button>
      <Show when={open()}>
        <div
          class="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50"
          on:click={handleClose}
        >
          <div
            class="rounded-sm bg-white shadow max-md:m-5"
            on:click={(e) => e.stopPropagation()}
          >
            <div class="relative">
              <div class="max-h-[75vh] max-w-lg overflow-scroll p-4 text-slate-800 md:max-h-80">
                {props.children}
              </div>
              <div class="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white to-transparent" />
            </div>
            <div class="p-4">
              <Button on:click={handleClose}>Close</Button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
