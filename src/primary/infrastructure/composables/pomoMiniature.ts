import PomoSessionPipVue from '@/primary/components/organisms/PomoSessionPip.vue';
import { usePictureInPicture } from './pictureInPicture';

export const usePomoMiniature = () => {
    const {
        startPictureInPicture,
        closePictureInPicture,
        isActive,
        isSupported
    } = usePictureInPicture();

    const openMiniature = () => {
        startPictureInPicture(PomoSessionPipVue);
    };

    const closeMiniature = () => {
        closePictureInPicture();
    };

    const toggleMiniature = () => {
        if (isActive.value) closeMiniature();
        else openMiniature();
    };

    return {
        openMiniature,
        closeMiniature,
        toggleMiniature,
        isMiniatureOpen: isActive,
        isMiniatureAvailable: isSupported
    };
};
