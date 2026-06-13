import OffersLeftMenu from "../../components/OffersLeftMenu"

export default function Offers() {
    return(
        <div className="w-full flex flex-col gap-6">
            <div className="flex gap-6 w-full items-start justify-center">
                <OffersLeftMenu />
            </div>
        </div>
    )
}