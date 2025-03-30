import MenuItem, { MenuItemProps } from "@/slices/MenuItem";
import { NavigationMenuList } from "@/components/ui/navigation-menu";

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
      <NavigationMenuList className="relative flex gap-4">
        {slices.map((i) => (
          <MenuItem key={i.id} {...i} />
        ))}
      </NavigationMenuList>
    </div>
  );
};
