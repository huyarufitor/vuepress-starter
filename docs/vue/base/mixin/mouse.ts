import { ref, onMounted, onUnmounted } from "vue";
interface eventNum {
  x: any; //x坐标
  y: any; //y坐标
}

export function useMouse(): eventNum {
  const x = ref(0);
  const y = ref(0);
  function update(event: MouseEvent) {
    x.value = event.pageX as any;
    y.value = event.pageY as any;
  }
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));
  return { x, y };
}
