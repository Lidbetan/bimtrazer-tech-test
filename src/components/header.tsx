export default function Header() {
    return (
        <header>
            <div className="w-11/12 flex flex-col gap-2 mx-auto py-4">
                <h1 className="text-4xl font-bold text-center text-wrap mt-5">
                    Hello{" "}
                    <span className="drop-shadow-lg text-transparent bg-gradient-to-r from-amber-600 to-red-500 bg-clip-text">
                        User
                    </span>
                </h1>
                <h2 className="text-gray-500 text-2xl text-center">
                    Here you can manage your tasks
                </h2>
            </div>
        </header>
    );
}
