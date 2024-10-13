import { storage } from "@/config/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { prompt } = await req.json();

        function generateRandomNumber() {
            return Math.floor(Math.random() * 100000000) + 1;
        }

        const randomSeed = generateRandomNumber();

        const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${randomSeed}&width=1024&height=1280&nologo=True`;

        // const imageURL = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?seed=${randomSeed}&width=1024&height=1280&nologo=True`;

        // const output = await axios.get("https://image.pollinations.ai/prompt/"+prompt+"?seed=${randomSeed}&width=1024&height=1280");

        const response = await fetch(imageURL);

        // console.log("response" + response, JSON.stringify(response));

        // save data to firebase


        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const base64Img = "data:image/png;base64," + await convertImage(imageURL);
        const fileName = "ai-short-video-files/" + Date.now() + ".png";

        // console.log(base64Img, fileName);

        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Img, 'data_url');

        const downloadurl = await getDownloadURL(storageRef);

        // console.log(downloadurl);

        return NextResponse.json({ success: true, result: downloadurl });
    } catch (error) {
        return NextResponse.json({ 'error': error });
    }
}

const convertImage = async (imagurl) => {
    try {
        const res = await axios.get(imagurl, { responseType: "arraybuffer" });
        const base64Image = Buffer.from(res.data).toString("base64");

        return base64Image;
    } catch (error) {
        console.log("error", error);
    }
}