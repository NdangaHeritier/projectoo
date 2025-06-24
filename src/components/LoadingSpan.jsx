export const LoadingSpan = ({ text = "Wait for the Magic .." }) => {
    return (
        <section className="p-10 flex flex-col items-center justify-center gap-5 bg-transparent mx-auto mt-16">
            <div className="flex flex-col items-center h-20 w-20 animate-spin p-5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500">
                <div className="w-full h-full rounded-2xl animate-ping bg-white dark:bg-gray-900"></div>
            </div>
            <h2 className="text-3xl text-center font-bold text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text">{text}</h2>
        </section>
    );
}