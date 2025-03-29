import MenuItem, { MenuItemProps } from "@/slices/MenuItem";

export const NavMenu = ({
  data,
}: {
  data: {
    slices: MenuItemProps[];
  };
}) => {
  const { slices } = data;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <div className="relative flex gap-4">
        {slices.map((i, index) => (
          <MenuItem key={index} {...i} />
        ))}
      </div>
    </div>
  );
};
