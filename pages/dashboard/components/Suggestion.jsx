function Suggestion({ children, title }) {
    return (
        <div className="mx-auto flex flex-col gap-5 justify-around  shadow-md rounded-xl p-3 hover:text-black hover:bg-gray-100">
            <h1 className="font-bold text-4xl">{title}</h1>
            <div className="flex flex-row pb-6">{children}</div>
        </div>
    );
}

export default Suggestion
