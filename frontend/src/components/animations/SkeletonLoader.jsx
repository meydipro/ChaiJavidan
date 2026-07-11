const SkeletonLoader = ({ className = '', variant = 'rect', count = 1 }) => {
  const baseClass = 'skeleton rounded-2xl';

  const variants = {
    rect: 'h-48 w-full',
    card: 'h-72 w-full',
    circle: 'h-12 w-12 rounded-full',
    text: 'h-4 w-3/4',
    title: 'h-6 w-1/2',
  };

  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={`${baseClass} ${variants[variant]} ${className}`}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
