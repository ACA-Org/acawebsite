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
        <div className="flex gap-4">
            {slices.map((i, index) => (
                <MenuItem key={index} {...i} />
            ))}
        </div>
    );
};
