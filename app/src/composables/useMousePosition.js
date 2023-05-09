import { ref, onMounted, onUnmounted } from 'vue';
import { throttle } from 'lodash';

export default function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = throttle((event) => {
    x.value = event.clientX;
    y.value = event.clientY;

    // Call your backend API here to send the mouse position data
    // and generate the heatmap
  }, 100);

  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition);
  });

  return { x, y };
}
