import type { JSX } from 'solid-js';

export default function Button(
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      class="m-2 bg-blue-400 p-2 text-white enabled:hover:bg-blue-300 enabled:active:bg-blue-500 disabled:opacity-75"
      {...props}
    >
      {props.children}
    </button>
  );
}
