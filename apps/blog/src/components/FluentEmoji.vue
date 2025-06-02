<script setup lang="ts">
function emojiToUnicode(emoji: string) {
  return [...emoji].map(char => char?.codePointAt(0)?.toString(16)).join("-");
}

const genEmojiUrl = (emoji: string) => {
  return (
    "https://registry.npmmirror.com/@lobehub/fluent-emoji-3d/1.1.0/files/" +
    `assets/${emojiToUnicode(emoji)}.webp`
  );
};
import { ref } from "vue";

const props = defineProps<{
  emoji: string;
}>();

const loadingFail = ref(false);
const emojiUrl = genEmojiUrl(props.emoji);

function loadFail() {
  loadingFail.value = true;
}
</script>
<template>
  <img
    v-if="!loadingFail"
    :src="emojiUrl"
    :alt="emoji"
    class="inline h-[1em]"
    @error.once="loadFail"
  />
  <a v-else>{{ emoji }}</a>
</template>
