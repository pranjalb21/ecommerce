function CartBadge({ count }: { count: number }) {
  return (
    <span className="bg-red-500 rounded-full p-1 text-xs text-white w-5 h-5 absolute -top-2 -right-2 flex items-center justify-center">
      {count}
    </span>
  );
}

export default CartBadge;
