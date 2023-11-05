import { Spinner } from "@nextui-org/react"

function Loader() {
    return (
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
            <Spinner size="lg" />
        </div>
    );
}

export default Loader