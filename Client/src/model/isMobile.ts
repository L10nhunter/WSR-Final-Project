import {ref} from "vue";

export const isMobile = ref<boolean>(true);
window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024;
});