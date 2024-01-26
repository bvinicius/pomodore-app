import PomoSessionPipVue from '@/primary/components/organisms/PomoSessionPip.vue';
import { usePictureInPicture } from '@/primary/infrastructure/composables/pictureInPicture';

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
        isActive() ? closeMiniature() : openMiniature();
    };

    return {
        openMiniature,
        closeMiniature,
        toggleMiniature,
        isMiniatureOpen: isActive,
        isMiniatureAvailable: isSupported
    };
};
