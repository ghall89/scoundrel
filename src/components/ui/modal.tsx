import { Show, type JSX } from 'solid-js';

interface ModalProps {
  open: () => boolean;
  setOpen: (p: boolean) => boolean;
  children: JSX.Element;
}

export default function Modal(props: ModalProps) {
  return (
    <Show when={props.open()}>
      <div class="h-screen w-screen bg-black/10">
        <div class="bg-white p-8">{props.children}</div>
      </div>
    </Show>
  );
}
