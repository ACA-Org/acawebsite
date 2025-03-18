export const ArrowRight = (props: React.HTMLAttributes<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            {...props}
        >
            <path
                d="M10 18.5L1.5 10M1.5 10L10 1.5M1.5 10L20.5 10"
                stroke="#808080"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
