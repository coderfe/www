type ButtonProps = {
  render: () => JSX.Element;
  onClick?: () => void;
  title?: string;
};

export function Button(props: any) {
  const { render, onClick, ...rest } = props;
  return (
    <button
      className="flex items-center justify-center size-12 text-lg md:size-10 md:text-base outline-accent hover:opacity-100 focus:opacity-100 focus:outline-none rounded-xl border border-zinc-400/20 backdrop-blur-lg dark:border-zinc-500/30 dark:text-zinc-200 bg-zinc-50/80 shadow-lg dark:bg-slate-950/80 transition-all duration-500 ease-in-out"
      onClick={onClick}
      {...rest}
    >
      {render()}
    </button>
  );
}
