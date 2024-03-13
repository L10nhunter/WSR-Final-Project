import {ref} from "vue";

export const isMobile = ref<boolean>();
window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024;
});