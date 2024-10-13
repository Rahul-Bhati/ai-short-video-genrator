import { useMemo } from 'react';

const usePollinationsImageHook = (prompt, options) => {
    const { width = 1024, height = 1024, model = 'flux', seed = 42, nologo = true, enhance = false } = options;

    const imageUrl = useMemo(() => {
        const params = new URLSearchParams({ width, height, model, seed, nologo, enhance });
        return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?${params.toString()}`;
    }, [prompt, width, height, model, seed, nologo, enhance]);

    return imageUrl;
};

export default usePollinationsImageHook;