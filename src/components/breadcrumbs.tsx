import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
    path: string;
}

export function Breadcrumbs({ path }: BreadcrumbsProps) {
    // Remove trailing slash and split the path
    const segments = path.replace(/\/$/, "").split("/").filter(Boolean);

    // Create the breadcrumb items with proper links
    const items = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        return {
            href,
            label,
        };
    });

    return (
        <nav aria-label="Breadcrumb" className="py-2">
            <ol className="flex items-center space-x-2">
                <li className="flex gap-2">
                    <Link
                        href="/"
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span className="body-sm">Home</span>
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </li>
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center space-x-2">
                        <Link
                            href={item.href}
                            className={`body-sm hover:text-foreground transition-colors ${
                                index === items.length - 1
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground"
                            }`}
                        >
                            {item.label}
                        </Link>
                        {index + 1 !== items.length && (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
