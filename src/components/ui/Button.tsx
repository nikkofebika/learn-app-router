type Props = {

}
export default function Button({ children, type = "button", className, onclick }: { children: React.ReactNode, type?: "button" | "submit", className?: string, onclick?: () => void }) {
    return (
        <button
            onClick={onclick}
            type={type}
            className={`rounded-md px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${className}`}
        >
            {children}
        </button>
    )
}
