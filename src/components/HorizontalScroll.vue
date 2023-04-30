<template>
  <div class="horizontal-scroll">
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<style>
.horizontal-scroll {
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  justify-content: center;
  width: 100%;
  position: relative;
}

.content {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.horizontal-scroll::-webkit-scrollbar {
  height: 10px;
}

.horizontal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.horizontal-scroll::-webkit-scrollbar-thumb {
  background-color: #c4c4c4;
  border-radius: 10px;
  border: none;
}

.horizontal-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #a6a6a6;
}

/* Custom scrollbar dots */
.horizontal-scroll::after {
  content: "...";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 30px;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  background-color: white;
  z-index: 1;
}
</style>
