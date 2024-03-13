import {ref} from "vue";

export const isMobile = ref<number>(0);
window.addEventListener('resize', () => {isMobile.value = window.innerWidth;});
window.addEventListener('pageshow', () => {isMobile.value = window.innerWidth;});