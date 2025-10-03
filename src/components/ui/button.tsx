import type { JSX } from 'solid-js';

export default function Button(
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      class="rounded-sm bg-amber-300 p-2 text-black enabled:hover:bg-amber-200 enabled:active:bg-amber-400 disabled:opacity-75"
      {...props}
    >
      {props.children}
    </button>
  );
}
