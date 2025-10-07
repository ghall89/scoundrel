import { Show, createSignal, type JSX } from 'solid-js';

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
      <button
        class="btn"
        on:click={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={open()}
      >
        {props.label}
      </button>
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
              <button class="btn" on:click={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
