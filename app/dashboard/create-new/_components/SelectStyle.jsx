import Image from 'next/image'
import React from 'react'

const SelectStyle = ({ onUserSelect }) => {
    const styleOptions = [
        {
            name: "Realistic",
            image: "/real.png"
        },
        {
            name: "Cartoon",
            image: "/cartoon.png"
        },
        {
            name: "Comic",
            image: "/comic.png"
        },
        {
            name: "Water Color",
            image: "/watercolor.png"
        },
        {
            name: "GTA ",
            image: "/gta.png"
        }
    ]

    const [selectedOption, setSelectedOption] = React.useState("");

    return (
        <div className='mt-7'>
            <h2 className="font-bold text-2xl text-primary">Style</h2>
            <p className="text-gray-500">select your video style</p>
            <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5'>
                {styleOptions.map((style, index) => (
                    <div key={index} className={`relative rounded-xl hover:scale-105 transition-all cursor-pointer ${selectedOption === style.name && 'border-4 border-primary'}`}>
                        <Image className='h-48 object-cover rounded-lg w-full' src={style.image} width={100} height={100} alt={style.name}
                            onClick={() => {
                                setSelectedOption(style.name)
                                onUserSelect('imageStyle', style.name)
                            }} />
                        <h2 className='absolute bg-black bottom-0 w-full text-white text-center rounded-b-lg py-2'>{style.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectStyle