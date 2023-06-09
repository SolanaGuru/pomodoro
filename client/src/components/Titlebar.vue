<template>
  <nav class="Titlebar">
    <h1 class="Title">Pomodoro</h1>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.Title {
  color: var(--color-short-round);
  font-size: 2.5rem;
  font-weight: 200;
  padding-top: 18px;
}

.Titlebar {
  letter-spacing: 0.05em;
  margin-bottom: 18px;
  position: relative;
  text-align: center;
  height: 50px;
  -webkit-app-region: drag;
}

.Icon-wrapper--titlebar {
  -webkit-app-region: no-drag;
  &:hover .Menu-line {
    background-color: var(--color-accent);
  }
  &:hover .Icon--close line {
    stroke: var(--color-focus-round);
  }
  &:hover .Icon--minimize line {
    stroke: var(--color-accent);
  }
}
</style>
