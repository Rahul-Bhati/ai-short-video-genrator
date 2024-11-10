import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomLoading from './CustomLoading';

const ImagePage = () => {
    const [models, setModels] = useState([]);
    const [selectModel, setSelectModel] = useState("flux");
    const [width, setWidth] = useState(1024);
    const [height, setHeight] = useState(1024);
    const textRef = useRef();

    const [imgGen, setImgGen] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);

    const genImage = async () => {
        // setPrompt(textRef.current.value);

        setImgGen(true);
        try {
            const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(textRef.current.value)}?seed=${Math.random()}&width=${width}&height=${height}&nologo=True&model=${selectModel}`;

            // console.log(imageURL)

            const response = await fetch(imageURL);

            setImgUrl(response.url);
            // console.log(response.url)
        } catch (error) {
            console.log("Error", error)
        }
        setImgGen(false);
    };

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const res = await axios.get("https://image.pollinations.ai/models");
                setModels(res.data);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };
        fetchModels();
    }, []);

    return (
        <div className='flex flex-col gap-6'>
            <div className="relative">
                <Input
                    ref={textRef}
                    placeholder="Describe what you want to create"
                    className="w-full py-6 pr-24 text-lg bg-white rounded-full shadow-lg"
                />
                <Button className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-purple-700 hover:bg-purple-800 text-white" onClick={genImage}>
                    Go
                </Button>
            </div>
            <div className='flex gap-5 flex-wrap'>
                <div className="relative">
                    <label>Image Model</label>
                    <Select onValueChange={(value) => setSelectModel(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {models.map((model, index) => (
                                <SelectItem value={model} key={index}>{model}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <label>Width</label>
                    <Select onValueChange={(value) => setWidth(Number(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Width" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='512'>512</SelectItem>
                            <SelectItem value='768'>768</SelectItem>
                            <SelectItem value='1024'>1024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <label>Height</label>
                    <Select onValueChange={(value) => setHeight(Number(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Height" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='512'>512</SelectItem>
                            <SelectItem value='768'>768</SelectItem>
                            <SelectItem value='1024'>1024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* {imgGen && <GenImage prompt={prompt} height={height} width={width} selectModel={selectModel} />} */}

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4 rounded">
                <p className="text-yellow-700">
                    <span className="font-bold">Note:</span> The generated images are not saved in the database. If you want to keep them, please download them to your device.
                </p>
            </div>
            <CustomLoading loading={imgGen} />
            {/* <div className='w-[1000px] h-[700px] object-cover'> */}

            {imgUrl !== null && <img src={imgUrl} alt='generated-image' className='w-[100%]' />}
            {/* </div> */}
        </div>
    );
};

export default ImagePage;
